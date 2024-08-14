'use client'

import { SquareCheckBig } from "lucide-react";
import { useRouter } from "next/navigation";

const ApproveLeave = ({leaveId}) => {
  const router = useRouter();
  
  const approveLeave = async() => {
    const response = await fetch('http://localhost:3000/api/approve',
        {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({leaveId})
        }
    )
    console.log(response)
    if(response.ok){
        router.refresh();
    }
  };
  
  return (
    <button onClick={approveLeave}>
      <SquareCheckBig className="text-green-400 "  />
    </button>
    
  )
}

export default ApproveLeave