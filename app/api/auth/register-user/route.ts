import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { firebaseUid, email, name } = await req.json();

    if (!firebaseUid || !email) {
      return NextResponse.json(
        { error: "Missing required fields (firebaseUid or email)" },
        { status: 400 }
      );
    }

    const user = await prisma.user.upsert({
      where: { firebaseUid: firebaseUid },
      update: {
        email: email,
        name: name || null,
      },
      create: {
        firebaseUid: firebaseUid,
        email: email,
        name: name || "Anonymous User",
      },
    });

    console.log(`User ${user.id} registered/updated in MySQL via Prisma.`);

    return NextResponse.json(
      { user, message: "User successfully registered or updated." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Prisma DB Operation Error:", error);
    return NextResponse.json(
      { error: "Failed to process user registration/update on database." },
      { status: 500 }
    );
  }
}
