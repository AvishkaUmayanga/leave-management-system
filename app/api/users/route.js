import userModel from "@/app/models/userModel";
import { connectDB } from "@/app/utils/connect";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectDB();
        const allUsers = await userModel.find({}).sort({createdAt: -1});
        if(!allUsers){
            return NextResponse.json({message: 'No records'}, {status: 500});
        }
        return NextResponse.json({allUsers}, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: 'Server error'}, {status: 500});
    }
}