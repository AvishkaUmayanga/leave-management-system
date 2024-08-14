'use client'
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import ErrorMessage from '@/app/components/error message/ErrorMessage';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginError, setUserDetails } from '@/app/redux/slices/userSlice';


const LoginPage = () => {
  const loginForm = useForm();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isSubmitting }} = loginForm;
  const loginError = useSelector((state) => state.userSlice.loginError)
  
  const router = useRouter();
  
  const onSubmit = async(data) => {
    try{
      const response = await fetch('api/login/',
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
        const userDataResponse = await fetch('api/me/',
          {
            method: 'POST',
            headers: {
              "Content-Type" : "application/json"
            },
            credentials: 'include'
          }
        )

        if(userDataResponse.ok){
          const userDetails = await userDataResponse.json();
          dispatch(setLoginError(null)); 
          dispatch(setUserDetails(userDetails.data));
          router.push('/dashboard');
        }
      }
      else{
        dispatch(setLoginError('Invalid credentials'))
      }
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="shadow-md ">
        <h2 className="mb-3 text-2xl text-center">Login</h2>
        { loginError && 
          <ErrorMessage message={loginError}/>
        }
        
        <label htmlFor="email">Email</label>
        <input type="text" id="email" {...register("email", { required: true})} disabled={isSubmitting} />
        {errors.email && <p className='error'>* email is required.</p>}
        

        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register("password", {required: true})} disabled={isSubmitting} />
        {errors.password && <p className='error'>* Password is required.</p>}

        <button disabled={isSubmitting}>{ isSubmitting ? <Loader2 /> : 'Login' }</button>

        <p>Don&apos;t have an account yet? <Link href='/signup' className='font-medium text-blue-700'>Sign up</Link></p>
      </form>
    </main>
  )
}

export default LoginPage