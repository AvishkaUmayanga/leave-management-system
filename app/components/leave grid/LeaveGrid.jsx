'use client'
import { useSelector } from "react-redux"
import AdminCard from "../admin card/AdminCard"
import LeavePregressCard from "./LeaveProgressCard"

const LeaveGrid = () => {
  const isAdmin = useSelector((state)=> state.userSlice.userDetails.admin);
  const leaveDetails = useSelector((state) => state.userSlice.userDetails.leaves);
  
  
  return (
    <div className='grid w-full grid-cols-3 gap-10 max-xl:grid-cols-2 max-md:grid-cols-1 max-lg:gap-5'>
      { !isAdmin ? (
        <LeavePregressCard details={leaveDetails}/>
      ) : (<><AdminCard />
        </>) }
    </div>
  )
}

export default LeaveGrid
