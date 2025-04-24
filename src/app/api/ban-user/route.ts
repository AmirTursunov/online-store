// // app/api/ban-user/route.ts
// import { NextResponse } from "next/server";
// import { clerkClient } from "@clerk/clerk-sdk-node";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { userId } = body;

//     if (!userId) {
//       return NextResponse.json(
//         { error: "Foydalanuvchi IDsi yo'q" },
//         { status: 400 }
//       );
//     }

//     // Clerk orqali userni ban qilish
//     const response = await clerkClient.users.banUser(userId);

//     return NextResponse.json({
//       message: "Foydalanuvchi ban qilindi",
//       response,
//     });
//   } catch (error) {
//     console.error("Ban qilishda xatolik:", error);
//     return NextResponse.json({ error: "Server xatosi" }, { status: 500 });
//   }
// }
