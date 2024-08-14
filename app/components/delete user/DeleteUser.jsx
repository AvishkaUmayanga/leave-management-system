'use client'
import { CircleX } from "lucide-react";
import { useRouter } from "next/navigation";

const DeleteUser = ({userId}) => {
  const router = useRouter();
  
  const deleteUser = async() =>{
    const response = await fetch('http://localhost:3000/api/delete_user',
        {
            method: 'DELETE',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({userId})
        }
    )
    if(response.ok){
        router.refresh();
    }
  }
  return (
    <div>
      <CircleX className="text-red-500 " onClick={deleteUser}/>
    </div>
  )
}

export default DeleteUser
