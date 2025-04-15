import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const events = await prisma.events.findMany();

  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, date } = body;

  const event = await prisma.events.create({
    data: {
      name: title,
      startAt: new Date(date),
      endAt: new Date(date),
      created_at: new Date(),
    },
  });

  return NextResponse.json(event);
}
