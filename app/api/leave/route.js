import leaveModel from "@/app/models/leaveModel";
import { connectDB } from "@/app/utils/connect"
import { NextResponse } from "next/server";
import { getDataFromToken } from "@/app/utils/getDataFromToken";
import userModel from "@/app/models/userModel";

export async function POST(req){
    try{
        await connectDB();
        const userId = await getDataFromToken(req);
        
        const {leaveType, startDate, endDate, reason} = await req.json();
        
        const existingLeave = await leaveModel.findOne({startDate, userId});
        if(existingLeave){
            return NextResponse.json({message: 'already request a leave in that day'}, {status: 403});
        }
        

        const user = await userModel.findById({_id: userId});
        if(user){
          const userLeave = user.leaves.find(leave => leave.leaveType === leaveType);

          if(userLeave){
            if(userLeave.remainingLeaves === 0){
              return NextResponse.json({message: `You can't request a leave`}, {status: 403});
            }
            userLeave.usedLeaves += 1;
            userLeave.remainingLeaves -= 1;
            await user.save();
          }
        }
        console.log('employeeId: ',user.employeeId)
        await leaveModel.create({leaveType, startDate, endDate, reason, userId, employeeId: user.employeeId});
        return NextResponse.json({message: 'Request submitted successfully', user}, {status: 201});
    }
    catch(error){
        console.log('get leave request error ', error);
        return NextResponse.json({message: 'Server error'}, {status: 500})
    }
}
export async function GET(req) {
    try {
      await connectDB();
      const userId = await getDataFromToken(req);
  
      const userLeaves = await leaveModel.find({userId});
      return NextResponse.json(userLeaves, { status: 200 });
    } catch (error) {
      console.log('get leave error', error);
      return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
  }