import userModel from "@/app/models/userModel";
import { connectDB } from "@/app/utils/connect";
import { NextResponse } from "next/server";

export async function DELETE(req){
    try{
        await connectDB();
        const {userId} = await req.json();
        const deleteUser = await userModel.findByIdAndDelete({_id: userId});

        if(deleteUser){
            return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
        }
    }
    catch(error){
        return NextResponse.json({message: 'Server error'}, {status: 500});
    }
}