import React from 'react'
import PercentageCircle from './PercentageCircle'
import { Dot } from 'lucide-react'

const LeavePregressCard = ({details}) => {
  return (
    <>
    {details?.map(data => (
    <div key={data._id} className="flex items-center justify-center px-2 py-5 text-sm bg-white lg:gap-6 rounded-xl 2xl:py-8">
      <PercentageCircle totalLeaves={data.totalLeaves} remainingLeaves={data.remainingLeaves}/>
      <div className="">
        <h4 className='font-medium '>{data.leaveType}</h4>
        <div className="flex">
          <Dot />
          <p>Remaining - {data.remainingLeaves}</p>
        </div>
        <div className="flex">
          <Dot />
          <p>Used - {data.usedLeaves}</p>
        </div>
        <div className="flex">
          <Dot />
          <p>Total - {data.totalLeaves}</p>
        </div>
      </div>
    </div>
    ))}
    </>
  )
}

export default LeavePregressCard
