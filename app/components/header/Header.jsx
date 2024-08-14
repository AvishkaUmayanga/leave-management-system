'use client'
import { useEffect, useState } from "react"
import NotificationsMenu from "./notifications/NotificationsMenu"

const Header = () => {
  const [userEmail, setUserEmail] = useState('nothing');
  const [isAdmin, setIsAdmin] = useState(true);
  const firstLetter = userEmail[0];
  const getUserEmail = async() => {
    const response = await fetch('api/me',
      {
        method: "POST",
        headers: {
          "Content-Type" : "Application/json"
        }
      }
    )
    
    if(response.ok){
      const data = await response.json();
      setUserEmail(data.data.email);
      setIsAdmin(data.data.admin)
    }
  }
  
  useEffect(()=>{
    getUserEmail();
  },[])
 
  return (
    <div className="sticky top-0 flex items-center justify-between w-full px-8 py-3 bg-white rounded-xl">
      <div className="flex items-center gap-3 ">
        <div className="flex items-center justify-center text-xl text-white uppercase bg-blue-400 border rounded-full min-h-11 min-w-11">
        {firstLetter}
        </div>
        <div>
          <h4>{isAdmin ? 'Admin' : 'User'}</h4>
          <p>{userEmail}</p>
        </div>
      </div>
      <NotificationsMenu />
    </div>
  )
}

export default Header
