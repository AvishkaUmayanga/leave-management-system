import LeaveGrid from "../leave grid/LeaveGrid"
import RequestForm from "../request form/RequestForm"
import TimeCard from "../time card/TimeCard"


const UserDashboard = () => {
  return (
    <>
      <div  className="flex justify-end ">
        <RequestForm />
      </div>
      <div className="flex gap-10 max-lg:flex-col max-lg:gap-5">
        <TimeCard />
        <LeaveGrid />
      </div>
    </>
  )
}

export default UserDashboard
