'use client'
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button"
import { X, GitPullRequestCreate, Loader2, CircleCheckBig } from "lucide-react"
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/app/components/ui/dialog"
import ErrorMessage from "../error message/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { clearLeaveMessage, setLeaveError, setLeaveSuccess } from "@/app/redux/slices/leaveSlice";
import { setUserDetails } from "@/app/redux/slices/userSlice";

const leaveTypes = ['','Casual Leave', 'Earned Leave', 'Sick Leave', 'Paternity Leave'];

const RequestForm = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.leaveSlice.leaveError);
  const successMessage = useSelector((state) => state.leaveSlice.leaveSuccess);
  const loginForm = useForm();
  const { register, handleSubmit, formState: { errors, isSubmitting }} = loginForm;
  const router = useRouter();
  
  const onSubmit = async(data) => {
    try{
      const response = await fetch('api/leave', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
      })
      const result = await response.json();
      console.log(result.user)
      if(response.ok){
        dispatch(setLeaveSuccess(result.message));
        dispatch(setLeaveError(null));
        dispatch(setUserDetails(result.user));
        router.refresh();
      }
      else{
        dispatch(setLeaveError(result.message));
        dispatch(setLeaveSuccess(null));
      }
    }
    
    catch(error){
      console.log(error);
    }
  }

  const clearMessage = () => {
    dispatch(clearLeaveMessage());
  }
  
  return (
    <div className="bg-blue-500 ">
      <Dialog >
        <DialogTrigger asChild>
          <Button className="text-white" onClick={clearMessage} ><GitPullRequestCreate /> Request Leave</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <div className="flex items-center justify-between ">
              <DialogTitle>Request Leave</DialogTitle>
              <DialogClose >
                <button className="p-0 text-blue-500 " >
                  <X />
                </button>
              </DialogClose>
            </div>
          </DialogHeader>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full px-0 ">
            { errorMessage && 
              <ErrorMessage message={errorMessage} />
            }
            
            {
               successMessage && 
               <>
                 <p className='resSuccess'><CircleCheckBig />{successMessage}</p>
               </>
            }
            
            <label htmlFor="type">Type</label>
            <select className="leaveInputs" type="text" id="type"  {...register("leaveType", { required: true})} disabled={isSubmitting}>
            { leaveTypes.map((leaveType, index) => (
              <option key={index} value={leaveType} className="capitalize ">{leaveType}</option>
            ))}
            </select>
            {errors.type && <p className='error'>* Type is required.</p>}

            <label htmlFor="startDate">Start Date</label>
            <input type="date" className="leaveInputs" id="startDate"  {...register("startDate", { required: true})} disabled={isSubmitting}/>
            {errors.startDate && <p className='error'>* Start date is required.</p>}

            <label htmlFor="endDate">End Date</label>
            <input type="date" className="leaveInputs" id="endDate"  {...register("endDate", { required: true})} disabled={isSubmitting}/>
            {errors.endDate && <p className='error'>* End date is required.</p>}

            <label htmlFor="reason">Reason</label>
            <textarea rows={3} className="leaveInputs" type="text" id="reason" placeholder="Enter your reason" {...register("reason", { required: true})} disabled={isSubmitting} />
            {errors.reason && <p className='error'>* Reason is required.</p>}
            
            <button disabled={isSubmitting}>{ isSubmitting ? <Loader2 /> : 'Submit' }</button>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default RequestForm              