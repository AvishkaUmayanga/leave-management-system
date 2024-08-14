'use client'
import { useRouter } from 'next/navigation';
import {
  LayoutDashboardIcon,
  HistoryIcon,
  LogOut,
  Users,
  GitPullRequestArrow
} from "lucide-react"

import {
  Command,
  CommandItem,
  CommandList,
   
} from "@/app/components/ui/command"

import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { clearActiveBtn, setUserActiveBtn } from "@/app/redux/slices/userNavbarSlice"

const Sidebar = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state)=> state.userSlice.userDetails.admin);
  const setActiveFunc = (btnText) => {
    dispatch(setUserActiveBtn(btnText));
  }
  
  const activeBtn = useSelector((state) => state.userNavbarSlice.activeBtn);
  const router = useRouter();
  
  const logout = async() => {
    try{
      const response = await fetch('/api/logout',
        {
          method: 'GET',
          headers: {
            'Content-Type' : 'application/json'
          },
          credentials: 'include'
        }
      )
      if(response.ok){
        dispatch(clearActiveBtn());
        router.push('/')
      }
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <div className='fixed flex flex-col h-screen '>
      { !isAdmin ? (
      <div>
        <Command className="bg-white shadow-md rounded-xl max-h-fit">
          <CommandList className="px-5 py-8 max-md:px-3 max-sm:px-2">
            <div className="space-y-8 ">  
            <CommandItem>
              <Link href="/dashboard" className={`${activeBtn === 'dashboard' ? 'active': ''} link`} onClick={() => setActiveFunc('dashboard')}><LayoutDashboardIcon /></Link>
            </CommandItem>
            <CommandItem>
              <Link href="/dashboard/history" className={`${activeBtn === 'history' ? 'active': ''} link`} onClick={() => setActiveFunc('history')}><HistoryIcon /></Link>
            </CommandItem>
            </div>
          </CommandList>
        </Command>
      </div>
      ) : (
      <div>
      <Command className="bg-white shadow-md rounded-xl max-h-fit">
        <CommandList className="px-5 py-5 max-md:px-3 max-sm:px-2">
          <div className="space-y-8">  
          <CommandItem>
            <Link href="/dashboard" className={`${activeBtn === 'dashboard' ? 'active': ''} link`} onClick={() => setActiveFunc('dashboard')}><LayoutDashboardIcon /></Link>
          </CommandItem>
          <CommandItem>
            <Link href="/dashboard/users" className={`${activeBtn === 'users' ? 'active': ''} link`} onClick={() => setActiveFunc('users')}><Users /></Link>
          </CommandItem>
          <CommandItem>
            <Link href="/dashboard/requests" className={`${activeBtn === 'requests' ? 'active': ''} link`} onClick={() => setActiveFunc('requests')}><GitPullRequestArrow /></Link>
          </CommandItem>
          <CommandItem>
            <Link href="/dashboard/history" className={`${activeBtn === 'history' ? 'active': ''} link`} onClick={() => setActiveFunc('history')}><HistoryIcon /></Link>
          </CommandItem>
          </div>
        </CommandList>
      </Command>
    </div>
    )
    }
    <div className="flex grow">
    </div>
    <div className="mb-40">
    <Command className="bg-white shadow-md rounded-xl max-h-fit">
      <CommandList className="px-5 py-3 max-md:px-3 max-sm:px-2">
        <CommandItem>
          <Link href="#" className="link"> <LogOut onClick={logout} /> </Link>
        </CommandItem>
      </CommandList>
    </Command>
    </div>
    </div>
  )
}

export default Sidebar
