import DeleteUser from "@/app/components/delete user/DeleteUser";
import { SetAdmin } from "@/app/components/setAdmin checkbox/SetAdminCheckbox";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/app/components/ui/table";

  const getUsers = async() => {
    const response = await fetch('http://localhost:3000/api/users', {
      next: {
          revalidate: 0
      }
    });
    const data = await response.json();
    return data.allUsers;
  };

const UsersPage = async() => {
  const users = await getUsers();
  
  return (
    <div className="flex flex-col w-full gap-8 ml-32 overflow-x-scroll max-md:ml-20 max-lg:ml-24">
      <Table className="overflow-y-scroll bg-white rounded-xl min-w-fit">
         <TableHeader>
           <TableRow className="font-bold bg-gray-50 ">
             <TableHead className="font-bold">Username</TableHead>
             <TableHead className="font-bold">EmployeeId</TableHead>
             <TableHead className="font-bold">Email</TableHead>
             <TableHead className="font-bold">Admin</TableHead>
             <TableHead className="font-bold">Delete user</TableHead>
           </TableRow>
         </TableHeader>
         <TableBody>
           {users.map(user => (
             <TableRow key={user._id} >
               <TableCell className="font-medium">{user.userName}</TableCell>
               <TableCell className="font-medium">{user.employeeId}</TableCell>
               <TableCell className="font-medium">{user.email}</TableCell>
               <TableCell className="font-medium"><SetAdmin user={user}/></TableCell>
               <TableCell><DeleteUser userId={user._id}/></TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
    </div>
  )
}

export default UsersPage
