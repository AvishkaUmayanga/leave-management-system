'use client'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const PercentageCircle = ({totalLeaves, remainingLeaves}) => {
  const remainLeave = 5;
  return (
    <div >
       <CircularProgressbar value={remainingLeaves} maxValue={totalLeaves} text={`${remainingLeaves}/${totalLeaves}`} className='h-20 font-bold max-sm:h-14' styles={{path: {stroke: 'blue'}}} />
    </div>
  )
}

export default PercentageCircle
