import userModel from "@/app/models/userModel";
import { connectDB } from "@/app/utils/connect";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { sendEmail } from "@/app/utils/mailer";

export async function POST(req){
    try{
        await connectDB();
        const {userName, email, employeeId, password} = await req.json();

        const existingEmail = await userModel.findOne({email});
        if(existingEmail){
            return NextResponse.json({message: 'email already exists.'}, { status: 403})    
        }
        const existingempId = await userModel.findOne({employeeId});
        if(existingempId){
            return NextResponse.json({message: 'employee ID already exists.'}, { status: 403})    
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            userName, 
            email, 
            employeeId, 
            password:hashedPassword
        });
        const savedUser = await newUser.save();
        console.log(savedUser)
       
        //send verification email
        // await sendEmail({email, emailType: 'VERIFY', userId: savedUser._id});
        return NextResponse.json({message: 'signup successfull', success: true, savedUser}, {status: 201});
    }
    catch(error){
        console.log('error while register', error);
        return NextResponse.json({message: 'Server error'}, {status: 500});
    }
}