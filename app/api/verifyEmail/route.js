import userModel from "@/app/models/userModel";
import { NextResponse } from "next/server";

const { connectDB } = require("@/app/utils/connect");

connectDB();

export async function POST(req){
    try{
        const {token} = await req.json();
        console.log(token);

        const user = await userModel.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});

        if(!user){
            return NextResponse.json({message: 'Invalid token'}, {status: 400});
        }
        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();
        return NextResponse.json({message: 'Email verified successfully', success: true}, {status: 200});
    }
    catch(error){
        console.log(error.message)
        return NextResponse.json({message: 'Server error'}, {status: 500});   
    }
}