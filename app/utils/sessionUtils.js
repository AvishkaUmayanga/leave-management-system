import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const getSessionOrReject = async(req) => {
  console.log('request is',req)
    const session = await getServerSession({req, ...authOptions});
      if(!session){
        console.log('session error')
        throw new Error('Not authenticated');
      }
      return session;
}