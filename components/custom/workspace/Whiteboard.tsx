"use client"
import React from 'react'
import dynamic from "next/dynamic";
const Excalidraw = dynamic(async () => (await import("@excalidraw/excalidraw")).Excalidraw, { ssr: false });
import "@excalidraw/excalidraw/index.css"
import { useRef,useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { toast } from 'sonner'
function Whiteboard() {
    const [excalidrawAPI, setExcalidrawAPI] = useState(null);
    const saveTimeRef=useRef<any>(null);
    const {projectid} = useParams()
    const handleCanvasChange = (elements:readonly any[],appState:any,files:any)=>{
        //Cancel Prev Timer

        if(saveTimeRef?.current){
            clearTimeout(saveTimeRef.current)
        }
        saveTimeRef.current=setTimeout(()=>{

            SaveCanvasChanges(elements,appState,files);
            toast.success('Changes Saved')
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
  return (
    <div style={{ height: "90vh" }}>
        <Excalidraw
        //@ts-ignore 
        excalidrawAPI={(api)=> setExcalidrawAPI(api)}
        onChange = {handleCanvasChange} />
    </div>
  )
}

export default Whiteboard
