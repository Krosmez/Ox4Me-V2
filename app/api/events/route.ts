import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

export async function DELETE(req: Request) {
  const user = await getUser();
  const { event_id } = await req.json();

  await prisma.events_users.delete({
    where: {
      user_id_event_id: { user_id: user.id, event_id },
    },
  });

  return Response.json({ success: true });
}