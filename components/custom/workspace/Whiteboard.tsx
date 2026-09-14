"use client"
import React from 'react'
import dynamic from "next/dynamic";
const Excalidraw = dynamic(async () => (await import("@excalidraw/excalidraw")).Excalidraw, { ssr: false });
import "@excalidraw/excalidraw/index.css"
import { useRef,useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { toast } from 'sonner'
import './whiteboard.css'
import { Circle, Diamond, Hand, MousePointer2, Square, ArrowRight, Minus, Pencil, Type, Image, Eraser } from 'lucide-react';
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types';
const tools = [
    {
        name: 'selection',
        icon: MousePointer2,
        color: 'text-blue-600',
    },
    {
        name: 'hand',
        icon: Hand,
        color: 'text-cyan-600',
    },
    {
        name: 'rectangle',
        icon: Square,
        color: 'text-blue-600',
    },
    {
        name: 'diamond',
        icon: Diamond,
        color: 'text-emerald-500',
    },
    {
        name: 'ellipse',
        icon: Circle,
        color: 'text-amber-500',
    },
    {
        name: 'arrow',
        icon: ArrowRight,
        color: 'text-violet-500',
    },
    {
        name: 'line',
        icon: Minus,
        color: 'text-pink-500',
    },
    {
        name: 'freedraw',
        icon: Pencil,
        color: 'text-orange-500',
    },{
        name: 'text',
        icon: Type,
        color: 'text-indigo-500',
    },
    {
        name: 'image',
        icon: Image,
        color: 'text-green-500',
    },
    {
        name: 'eraser',
        icon: Eraser,
        color: 'text-rose-500',
    }

];
function Whiteboard() {
    const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI|null>(null);
    const saveTimeRef=useRef<any>(null);
    const {projectid} = useParams()
    const [activeTool, setActiveTool] = useState<string>('selection');


    const handleCanvasChange = (elements:readonly any[],appState:any,files:any)=>{
        console.log("onChange fired, activeTool from Excalidraw:", appState.activeTool?.type);
        if(appState.activeTool?.type && appState.activeTool.type !== activeTool){
          setActiveTool(appState.activeTool.type);
        //Cancel Prev Timer
        }
        if(saveTimeRef?.current){
            clearTimeout(saveTimeRef.current)
        }
        saveTimeRef.current=setTimeout(()=>{

            //SaveCanvasChanges(elements,appState,files);
            //toast.success('Changes Saved')
        },10000)
    }

    const SaveCanvasChanges=async(elements:readonly any[],appState:any,files:any)=>{
        const result=await axios.post('/api/whiteboard',{
            elements: elements,
            appState: appState,
            files: files,
            projectId: projectid
        })

    }
    const changeTool=(tool:any)=>{
        if(!excalidrawAPI) return;

        setActiveTool(tool);
        excalidrawAPI.setActiveTool({
            type:tool
        })
    }


  return (
    <div style={{ height: "90vh" }}>
        <Excalidraw
        //@ts-ignore 
        excalidrawAPI={(api)=> setExcalidrawAPI(api)}
        onChange = {handleCanvasChange} />
<div className = 'absolute left-4 top-1/2 z-50 -translate-y-1/2 flex flex-col gap-1 rounded-2xl bg-white border p-1.5 shadow-xl'>
{tools.map((tool)=>{
    const Icon = tool.icon
    return(
        <button
          key={tool.name}
          className={`flex h-10 w-10 items-center justify-center rounded-xl transition
        hover:bg-primary/10 hover:cursor-pointer
        ${activeTool === tool.name ? "bg-primary/10" : ""}`}

          onClick={() => changeTool(tool.name)}
        >
        <Icon size="19" className={tool.color} />
        </button>
    )
})}
</div>

    </div>
  )
}

export default Whiteboard
