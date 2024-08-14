import { Button } from "@/app/components/ui/button"
import { BellIcon } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/app/components/ui/dropdown-menu"

const NotificationsMenu = () => {
  return (
    <>
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button className="relative flex items-center justify-center border" >
            <div className="absolute w-3 h-3 bg-green-500 rounded-full -top-1 -right-1"></div>
              <BellIcon className="w-5 h-5 " /> 
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          <DropdownMenuItem className="flex gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p>Nofity</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default NotificationsMenu
