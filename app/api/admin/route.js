import userModel from "@/app/models/userModel";
import { connectDB } from "@/app/utils/connect";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        await connectDB();
        const {userId} = await req.json();
        const user = await userModel.findOne({_id: userId});
        if(user){
            user.admin = !user.admin;
            await user.save();
            return NextResponse.json({admin: user.admin}, {status: 201});
        }
    }
    catch(error){
        return NextResponse.json({message: 'Server error'}, {status: 500});
    }
}