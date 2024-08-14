import UserDashboard from "@/app/components/user dashboard/UserDashboard"

const Dashboard = () => {
  return (
    <div className="flex flex-col w-full gap-8 ml-32 max-md:ml-20 max-lg:ml-24">
      <UserDashboard />
    </div>
  )
}

export default Dashboard
