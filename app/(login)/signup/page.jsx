'use client'
import ErrorMessage from '@/app/components/error message/ErrorMessage';
import { setSignupErrors } from '@/app/redux/slices/userSlice';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const SignupPage = () => {
  const signupForm = useForm();
  const { register, watch, handleSubmit, formState: { errors, isSubmitting },} = signupForm;
  const passwordValue = watch('password')
  const dispatch = useDispatch();
  const signupErrors = useSelector((state) => state.userSlice.signupErrors)

  const router = useRouter();
  
  const onSubmit = async(data) => {
    try{
      const response = await fetch('api/signup/',
        {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(data),
          credentials: 'include'
        }
      );
      if(response.ok){
        dispatch(setSignupErrors(null));
        router.push('/login');
      }
      else{
        const errorData = await response.json();
        dispatch(setSignupErrors(errorData.message));
      }
    }
    catch(error){
      console.log('Something went wrong.')
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="shadow-md ">
        <h2 className="mb-3 text-2xl text-center">Signup</h2>
        { signupErrors && 
          <ErrorMessage message={signupErrors}/>
        }
        
        <label htmlFor="userName">User Name</label>
        <input type="text" id="userName" {...register("userName", { required: true })} disabled={isSubmitting} />
        {errors.userName && <p className='error'>* User name is required.</p>}
       
        <label htmlFor="email">Email</label>
        <input type="text" id="email" {...register("email", {
            required: '* email is required.',
            pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Invalid email address'
            }
        })} disabled={isSubmitting} />
        {errors.email && <p className='error'>{errors.email.message}</p>}
        
        <label htmlFor="employeeId">Employee ID</label>
        <input type="text" id="employeeId" {...register("employeeId", {required: true})} disabled={isSubmitting} />
        {errors.employeeId && <p className='error'>* employeeId is required.</p>}
        
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register("password", {
            required: '* Password is required.',
            pattern: {
                value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{"':;?/>.<,])/,
                message: 'Use at least 8 characters, one uppercase letter, one lowercase letter, one number, and one symbol in your password'
            }
        })} disabled={isSubmitting} />
        {errors.password && <p className='error'>{errors.password.message}</p>}
        
        <label htmlFor="confirmPassword">Comfirm Password</label>
        <input type="password" id="confirmPassword" {...register("confirmPassword", {
            required: '* Confirm Password is required.',
            validate: value => value === passwordValue || 'Passwords do not match'
        })}  disabled={isSubmitting}/>
        {errors.confirmPassword && <p className='error'>{errors.confirmPassword.message}</p>}

        <button disabled={isSubmitting}>{ isSubmitting ? <Loader2 /> : 'Signup' }</button>

        <p>Already have an account? <Link href='/login' className='font-medium text-blue-700'>Login</Link></p>
      </form>
    </main>
  )
}

export default SignupPage
