import ApproveLeave from "@/app/components/approve leave/ApproveLeave";
import RejectLeave from "@/app/components/reject leave/RejectLeave";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

const getLeaves = async() => {
  try{
    const response = await fetch(`${process.env.DOMAIN}/api/leaves`)
    const data = await response.json();
    return data.allLeaves;
  }
  catch(error){
    return null;
  }
}

const Requests = async() => {
  const requsts = await getLeaves();
  
  const formatDate = (date) => {
    return date.split('T')[0];
  }
  return (
    <div className="flex flex-col w-full gap-8 ml-32 overflow-x-scroll max-md:ml-20 max-lg:ml-24">
      <Table className="overflow-y-scroll bg-white rounded-xl min-w-fit">
        <TableHeader>
          <TableRow className="font-bold bg-gray-50">
          <TableHead className="font-bold">EmployeeID</TableHead>
            <TableHead className="font-bold">Start Date</TableHead>
            <TableHead className="font-bold min-w-22">End Date</TableHead>
            <TableHead className="font-bold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requsts && requsts.lenght > 0 ? (requsts.map((request) => (
            <TableRow key={request._id}>
              <TableCell className="font-medium">{request.employeeId}</TableCell>
              <TableCell className="font-medium">{formatDate(request.startDate)}</TableCell>
              <TableCell className="font-medium">{formatDate(request.endDate)}</TableCell>
              <TableCell className="font-medium"><p className={`
                  ${request.status === 'true' ? 'bg-green-500' : 
                  request.status === 'false' ? 'bg-red-500' : 
                  'bg-gray-500'} px-1 text-white  border rounded w-fit`}>
                    {request.status === 'true' ? 'Approved' :
                      request.status === 'false' ? 'Rejected' :
                      'Pending'
                    }
                </p></TableCell>
              <TableCell className="flex gap-5 font-medium">
                <ApproveLeave leaveId={request._id}/>
                <RejectLeave leaveId={request._id}/>
              </TableCell>
            </TableRow>
          ))) : (<div> No data</div>)}
        </TableBody>
      </Table>
    </div>
  )
}

export default Requests
