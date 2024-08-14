import userModel from "@/app/models/userModel";
import { connectDB } from "@/app/utils/connect";
import { getDataFromToken } from "@/app/utils/getDataFromToken";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        await connectDB();
        const userId = await getDataFromToken(req);
        const user = await userModel.findOne({_id: userId}).select("-password");
        return NextResponse.json({message: 'user found', data: user})
    }
    catch(error){
        console.log( error);
        return NextResponse.json({message: 'Server error'}, {status: 500});
    }
}