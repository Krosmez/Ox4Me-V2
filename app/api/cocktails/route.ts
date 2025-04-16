import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req?: NextRequest) {
  if (req) {
    const id = req.nextUrl.searchParams.get('id');

    if (id) {
      const cocktail = await prisma.cocktails.findUnique({ where: { id } });
      return Response.json(cocktail);
    }
  }

  const cocktails = await prisma.cocktails.findMany();
  return NextResponse.json(cocktails);
}