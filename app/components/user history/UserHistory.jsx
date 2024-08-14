'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

const UserHistory = () => {
  const [leaves, setLeaves] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserLeaves = async () => {
      try {
        const response = await fetch('/api/leave', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });

        if (!response.ok) {
          throw new Error('Failed to fetch leaves');
        }

        const data = await response.json();
        setLeaves(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getUserLeaves();
  }, []);

  const formatDate = (date) => {
    return date.split('T')[0];
  }

  return (
    <div>
      <Table clasName="overflow-y-scroll bg-white  rounded-xl min-w-fit">
        <TableHeader>
          <TableRow className="font-bold bg-gray-50 ">
            <TableHead>Type</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaves.map((leave) => (
            <TableRow key={leave._id}>
              <TableCell>{leave.leaveType}</TableCell>
              <TableCell>{formatDate(leave.startDate)}</TableCell>
              <TableCell>{formatDate(leave.endDate)}</TableCell>
              <TableCell>
                <p className={`
                  ${leave.status === 'true' ? 'bg-green-500' : 
                  leave.status === 'false' ? 'bg-red-500' : 
                  'bg-gray-500'} px-1 text-white  border rounded w-fit`}>
                    {leave.status === 'true' ? 'Approved' :
                      leave.status === 'false' ? 'Rejected' :
                      'Pending'
                    }
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserHistory;
