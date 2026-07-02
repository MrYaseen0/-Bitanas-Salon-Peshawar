import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const BASE = 18;

export async function GET() {
  const count = BASE + Math.floor(Math.random() * 20);
  return NextResponse.json({ viewers: count });
}
