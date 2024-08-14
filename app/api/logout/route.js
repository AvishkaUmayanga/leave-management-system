import { NextResponse } from "next/server";

export async function GET (req){
    try{
        const response = NextResponse.json({message: 'Logout Successfull'}, {status: 200});
        response.cookies.set('token', '', {httpOnly: true, expires: new Date(0)});

        return response;
    }
    catch(error){
        console.log(error);
        return NextResponse.json({message: 'Server error'}, {status: 500});
    }
}