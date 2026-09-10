"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
//import { Button } from "@base-ui/react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Archive, LayoutGrid, Plus, Settings, SparkleIcon, Sparkles, Users } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Progress } from "@/components/ui/progress"

export function AppSidebar() {
  const path = usePathname();
  const {user}=useUser();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-2">
        <img src="/logo.svg" alt="Logo" width= {40} height = {40} />
        <h2 className="text-xl font-bold">Whizboard</h2>
        </div>
      </SidebarHeader>

      <SidebarGroup >
            <Button className="w-full justify-start gap-2">
        <Plus className="w-4 h-4" />
            Create New Board
            </Button>
      </SidebarGroup>

      <SidebarGroup >
        <SidebarGroupLabel>My Boards</SidebarGroupLabel>
        <SidebarMenuButton className="p-5" isActive= {path === '/dashboard'} >
            <LayoutGrid/>
            <span>All Files</span>
        </SidebarMenuButton>

        <SidebarMenuButton className="p-5 mt-2" isActive= {path === "/Shared-files"} >
            <Users/>
            <span>Shared</span>
        </SidebarMenuButton>

        <SidebarMenuButton className="p-5 mt-2" isActive= {path === "/archived"}>
            <Archive/>
            <span>Archived</span>
        </SidebarMenuButton>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Others</SidebarGroupLabel>
        <SidebarMenuButton className="p-5" isActive= {path === "/ai"}>
          <Sparkles />
            <span>AI Helper</span>
        </SidebarMenuButton>

        <SidebarMenuButton className="p-5" isActive= {path === "/settings"}>
          <Settings />
            <span>Settings</span>
        </SidebarMenuButton>

      </SidebarGroup>


      <SidebarContent>
      </SidebarContent>
      <SidebarFooter>
       <Button className="w-full justify-start gap-2">
        <Plus className="w-4 h-4" />
            Create New Board
            </Button>
            <div className="p-4 my-3 border rounded-md"> 
              <h2 className = "text-sm flex justify-between mb-1">2 files created <span>total 3</span></h2>
            </div>
            <Progress value={60} className="h-2 mt-2" />

          <div className="flex items-center gap-2 p-4 border rounded-md">
          {user?.imageUrl && (
          <Image src={user.imageUrl} alt="User Image" width={40} height={40} 
          className="rounded-full"/>)}

          <h2>{user?.firstName} {user?.lastName}</h2>
          </div>
      </SidebarFooter>
    </Sidebar>
  )
}