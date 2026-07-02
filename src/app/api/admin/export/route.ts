import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "bitanas-admin-2026";

function checkAuth(req: NextRequest): boolean {
  return req.headers.get("x-admin-key") === ADMIN_PASSWORD;
}

function escapeCsv(val: unknown): string {
  if (val === null || val === undefined) return "";
  const s = String(val);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function toCsv(rows: any[], columns: { key: string; label: string }[]): string {
  const header = columns.map((c) => escapeCsv(c.label)).join(",");
  const body = rows
    .map((r) => columns.map((c) => escapeCsv(r[c.key])).join(","))
    .join("\n");
  return header + "\n" + body;
}

const SCHEMAS: Record<
  string,
  { fetch: () => Promise<any[]>; columns: { key: string; label: string }[] }
> = {
  bookings: {
    fetch: () =>
      db.booking.findMany({ orderBy: { createdAt: "desc" }, take: 1000 }),
    columns: [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "phone", label: "Phone" },
      { key: "email", label: "Email" },
      { key: "service", label: "Service" },
      { key: "artist", label: "Artist" },
      { key: "date", label: "Date" },
      { key: "time", label: "Time" },
      { key: "notes", label: "Notes" },
      { key: "status", label: "Status" },
      { key: "createdAt", label: "Submitted" },
    ],
  },
  reviews: {
    fetch: () => db.review.findMany({ orderBy: { createdAt: "desc" }, take: 1000 }),
    columns: [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "rating", label: "Rating" },
      { key: "service", label: "Service" },
      { key: "comment", label: "Comment" },
      { key: "approved", label: "Approved" },
      { key: "createdAt", label: "Submitted" },
    ],
  },
  contact: {
    fetch: () =>
      db.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 1000 }),
    columns: [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "subject", label: "Subject" },
      { key: "message", label: "Message" },
      { key: "createdAt", label: "Submitted" },
    ],
  },
  newsletter: {
    fetch: () => db.newsletter.findMany({ orderBy: { createdAt: "desc" }, take: 1000 }),
    columns: [
      { key: "id", label: "ID" },
      { key: "email", label: "Email" },
      { key: "createdAt", label: "Subscribed" },
    ],
  },
  waitlist: {
    fetch: () => db.waitlist.findMany({ orderBy: { createdAt: "desc" }, take: 1000 }),
    columns: [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "phone", label: "Phone" },
      { key: "service", label: "Service" },
      { key: "preferredDate", label: "Preferred Date" },
      { key: "notes", label: "Notes" },
      { key: "createdAt", label: "Submitted" },
    ],
  },
  jobs: {
    fetch: () =>
      db.jobApplication.findMany({ orderBy: { createdAt: "desc" }, take: 1000 }),
    columns: [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Phone" },
      { key: "position", label: "Position" },
      { key: "experience", label: "Experience" },
      { key: "message", label: "Message" },
      { key: "createdAt", label: "Submitted" },
    ],
  },
};

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const type = req.nextUrl.searchParams.get("type");
  if (!type || !SCHEMAS[type]) {
    return NextResponse.json(
      { error: "Invalid type. Use: bookings, reviews, contact, newsletter, waitlist, jobs" },
      { status: 400 }
    );
  }

  try {
    const schema = SCHEMAS[type];
    const rows = await schema.fetch();
    const csv = toCsv(rows, schema.columns);

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="bitanas-${type}-${new Date().toISOString().split("T")[0]}.csv"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("CSV export error:", err);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
