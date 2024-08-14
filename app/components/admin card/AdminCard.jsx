import { Users, CircleDashed, CircleCheckBig, CircleX } from "lucide-react"

const getDashboardData = async() => {
  const response = await fetch('http://localhost:3000/api/admin_dashboard',
    {
      next: {
        revalidate: 0
    }
    }
  )
  return response.json();
}

const AdminCard = async() => {
  const dashboardData = await getDashboardData();
  console.log(dashboardData);
  return (
    <>
    {dashboardData.map((data,index) => (
    <div key={index} className="flex flex-col px-2 py-5 text-sm bg-white rounded-xl 2xl:py-8">
       {data.name === 'Users' ?<Users  className="w-10 h-10 clear-start"/> : data.name === 'Pending' ? <CircleDashed className="w-10 h-10 clear-start"/> : data.name === 'Approved' ? <CircleCheckBig className="w-10 h-10 clear-start"/> : <CircleX className="w-10 h-10 clear-start"/>}
       <div className="flex flex-col items-center gap-6 ">
         <h4 className='text-xl '>{data.name}</h4>
         <p className="text-2xl font-medium">{data.count}</p>
       </div>
    </div>
    ))}
    </>
  )
}

export default AdminCard
