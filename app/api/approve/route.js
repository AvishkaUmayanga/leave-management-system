import leaveModel from "@/app/models/leaveModel";
import { connectDB } from "@/app/utils/connect";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        await connectDB();
        const {leaveId} = await req.json();
        const leave = await leaveModel.findOne({_id: leaveId});
        if(leave){
            leave.status = true;
            await leave.save();
            return NextResponse.json({message: 'Update successfull'}, {status: 200});
        }
    }
    catch(error){
        return NextResponse.json({message: 'Server error'}, {status: 500});
    }
}