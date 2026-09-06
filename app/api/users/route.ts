import { db } from "@/db";
import { users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest) {   

    const user = await currentUser()

    //If user already exists?
    if (user)
    {
     const userdata = await db.select().from(users)

     .where(eq(users.email, user.email))

    if (userdata.length > 0) {
        return NextResponse.json(userdata[0]);
    }
}
    else
    {
        const newUser = await db.insert(users).values({
            name: users.firstName,
            email: users.primaryEmailAddress?.emailAddress ?? ' ',
        }).returning();

        return NextResponse.json(newUser[0]);
    }

    return NextResponse.json({ message: "User not found" }, { status: 404 });


    //If user does not exist, create a new user in the database

}