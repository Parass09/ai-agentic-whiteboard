import { NextRequest,NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { projects } from "@/db/schema";
import { db } from "@/db";

export async function POST(req:NextRequest){
    const{projectId,projectName} = await req.json();
    const user=await currentUser();

    if(!user?.primaryEmailAddress?.emailAddress){
        return NextResponse.json({error:"Unauthorized user"});
    }


    if(!projectId || !projectName ){
        return NextResponse.json({error:"Project information Missing "});
    }
    const result=await db.insert(projects).values({
        projectId: projectId,
        projectName: projectName?? '',
        userEmail: user?.primaryEmailAddress?.emailAddress??''
    }).returning();

    return NextResponse.json(result[0]);
}