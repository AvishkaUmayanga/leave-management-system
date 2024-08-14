import leaveModel from "@/app/models/leaveModel";
import { connectDB } from "@/app/utils/connect";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectDB();
        const allLeaves = await leaveModel.find({}).sort({createdAt: -1});
        if(!allLeaves){
            return NextResponse.json({message: 'No records'}, {status: 500});
        }
        return NextResponse.json({allLeaves}, {status: 200});
    }
    catch(error){
        return NextResponse.json({message: 'Server error'}, {status: 500});
    }
}