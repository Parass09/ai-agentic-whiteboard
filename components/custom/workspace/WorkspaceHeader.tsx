"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {Button} from "@/components/ui/button"
import { Save } from 'lucide-react'
import {Share} from 'lucide-react'


type Props = {
  selectedTab: any
}
function WorkspaceHeader({ selectedTab }: Props) {
  return (
    <div className="p-3 border-b flex justify-between">
      <div className="flex gap-2 item-center">
        <img src={'/logo.svg'} alt="logo" width={35} height={35}/>
        <h2> Workspace Name</h2>
      </div>
      {/* Switch */}
      <div>
      <Tabs defaultValue="whiteboard" className=""
        onValueChange={(value) => selectedTab(value)}>
        <TabsList>
    <TabsTrigger value="whiteboard">WhiteBoard</TabsTrigger>
    <TabsTrigger value="docs">Docs</TabsTrigger>
        </TabsList>
</Tabs>

      </div>
      {/* Extra Button */}
      <div className = "flex gap-2">
        <Button><Save />Save</Button>
        <Button variant={"outline"}><Share />Share</Button>

      </div>

    </div>
  )
}

export default WorkspaceHeader
