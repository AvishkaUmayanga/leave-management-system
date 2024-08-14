'use client'

import { SquareX } from "lucide-react";
import { useRouter } from "next/navigation";

const RejectLeave = ({leaveId}) => {
  const router = useRouter();

  const rejectLeave = async() => {
    const response = await fetch(`${process.env.DOMAIN}/api/reject`,
      {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({leaveId})
      }
    )
    if(response.ok){
      router.refresh();
    }
  };
  
  return (
    <button onClick={rejectLeave}>
      <SquareX className="text-red-400 " />
    </button>
  )
}

export default RejectLeave