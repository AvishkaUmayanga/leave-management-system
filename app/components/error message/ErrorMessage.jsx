import { TriangleAlert } from 'lucide-react';

const ErrorMessage = ({message}) => {
  return (
    <>
      <p className='resError'><TriangleAlert />{message}</p>
    </>
  )
}

export default ErrorMessage
