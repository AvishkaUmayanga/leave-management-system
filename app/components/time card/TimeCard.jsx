'use client'
import dayjs from "dayjs";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat);

const TimeCard = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [isDayTime, setIsDayTime] = useState(true);
    const [currentDate, setCurrentDate] = useState('');
  
    const getCurrentTime = () => {
      return dayjs().format('h:mm:ss A');
    };
  
    const getCurrentDate = () => {
      return dayjs().format('Do MMMM YYYY');
    };
  
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(getCurrentTime());
        setIsDayTime(dayjs().hour() >= 6 && dayjs().hour() < 18);
        setCurrentDate(getCurrentDate());
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 py-16 bg-white min-w-[280px] rounded-xl items-center max-xsm:min-w-[200px] ">
        <div className="flex items-center gap-3 text-xl text-gray-500 ">
            {isDayTime ? <SunIcon className="h-14 w-14"/> : <MoonIcon className="w-10 h-10"/>}
            {currentTime}
        </div>
        <div className="text-xl ">
            <h2>Today:</h2>
            {currentDate}
        </div>
      </div>
    </div>
  )
}

export default TimeCard
