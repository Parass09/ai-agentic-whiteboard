import { db } from "@/db";
import { users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const email = user.primaryEmailAddress?.emailAddress ?? '';

  const userdata = await db.select().from(users).where(eq(users.email, email));

  if (userdata.length > 0) {
    return NextResponse.json(userdata[0]);
  }

  const newUser = await db
    .insert(users)
    .values({
      name: user.firstName ?? '',
      email: email,
    })
    .onConflictDoNothing()
    .returning();

  if (newUser.length > 0) {
    return NextResponse.json(newUser[0]);
  }

  const existingUser = await db.select().from(users).where(eq(users.email, email));
  return NextResponse.json(existingUser[0]);
}