import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const cocktails = await prisma.cocktails.findMany();

    return NextResponse.json(cocktails);
}