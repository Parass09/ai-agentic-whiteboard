
import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function AppHeader() {
  return (
    <div className="w-full border-b p-4 flex items-center justify-between">
      <SidebarTrigger />
      <UserButton/>
    </div>
  )
}

export default AppHeader
