// app/api/all-users/route.ts

import { clerkClient, User } from "@clerk/clerk-sdk-node";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allUsers: User[] = [];
    const limit = 100;
    let offset = 0;
    let hasMore = true;

    while (hasMore) {
      const users = await clerkClient.users.getUserList({ limit, offset });
      allUsers.push(...users);
      if (users.length < limit) hasMore = false;
      else offset += limit;
    }

    return NextResponse.json({ total: allUsers.length, users: allUsers });
  } catch (error) {
    console.error("Foydalanuvchilarni olishda xatolik:", error);
    return NextResponse.json(
      { error: "Foydalanuvchilarni olishda xatolik" },
      { status: 500 }
    );
  }
}
