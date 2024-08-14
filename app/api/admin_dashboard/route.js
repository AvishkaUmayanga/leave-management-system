import leaveModel from "@/app/models/leaveModel";
import userModel from "@/app/models/userModel";
import { connectDB } from "@/app/utils/connect";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        await connectDB();
        const users = await userModel.countDocuments({});

        const pendingLeaves = await leaveModel.countDocuments({status: 'pending'});
        const approvedLeaves = await leaveModel.countDocuments({status: 'true'}); 
        const rejectedLeaves = await leaveModel.countDocuments({status: 'false'}); 
        return NextResponse.json([{name: 'Users',count: users}, {name: 'Pending',count: pendingLeaves}, {name: 'Approved',count: approvedLeaves}, {name: 'Rejected',count: rejectedLeaves}], {status: 200});
    }
    catch(error){
        return NextResponse.json({message: 'Server error'}, {status: 500});
    }
}