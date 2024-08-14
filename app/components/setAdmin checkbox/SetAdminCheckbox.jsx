"use client"

import { useState } from "react"

export  function SetAdmin({user}) {
  const [isAdmin, setIsAdmin] = useState(user.admin);
  
  const changeState = async() => {
    const response = await fetch('/api/admin', 
      {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({userId: user._id})
      }
    )
    if(response.ok){
      setIsAdmin(!isAdmin);
    }
  };
  
  return (
    <>
      <input type="checkbox" id="admin"  checked={isAdmin} onClick={changeState} className="w-4 h-4"  />
    </>
  )
}
