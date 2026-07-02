import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const recent = await db.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        name: true,
        service: true,
        createdAt: true,
      },
    });
    const events = recent.map((b) => ({
      name: b.name.split(" ")[0],
      action: "booked",
      service: b.service,
      time: timeAgo(b.createdAt),
    }));
    return NextResponse.json({ events });
  } catch {
    return NextResponse.json({ events: [] });
  }
}

function timeAgo(date: Date): string {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins === 1) return "1 min ago";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  return hrs === 1 ? "1 hour ago" : `${hrs} hours ago`;
}
