import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Simple password check (in production, use proper auth + hashed secrets)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "bitanas-admin-2026";

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("x-admin-key");
  return auth === ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [
      bookings,
      reviews,
      contactMessages,
      newsletterCount,
      waitlist,
      jobApps,
    ] = await Promise.all([
      db.booking.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
      db.review.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
      db.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
      db.newsletter.count(),
      db.waitlist.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
      db.jobApplication.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
      }),
    ]);

    const stats = {
      bookings: bookings.length,
      pendingBookings: bookings.filter((b) => b.status === "pending").length,
      reviews: reviews.length,
      avgRating:
        reviews.length > 0
          ? (
              reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            ).toFixed(1)
          : "0",
      contactMessages: contactMessages.length,
      newsletterSubs: newsletterCount,
      waitlist: waitlist.length,
      jobApps: jobApps.length,
    };

    return NextResponse.json({
      stats,
      bookings,
      reviews,
      contactMessages,
      waitlist,
      jobApps,
    });
  } catch (err) {
    console.error("Admin API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch admin data" },
      { status: 500 }
    );
  }
}

// Update booking status (confirm/cancel)
export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status, model } = await req.json();
    if (!id || !status || !model) {
      return NextResponse.json(
        { error: "id, status and model required" },
        { status: 400 }
      );
    }

    let result;
    if (model === "booking") {
      result = await db.booking.update({
        where: { id },
        data: { status },
      });
    } else if (model === "review") {
      result = await db.review.update({
        where: { id },
        data: { approved: status === "approved" },
      });
    } else {
      return NextResponse.json({ error: "Invalid model" }, { status: 400 });
    }

    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error("Admin PATCH error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
