"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  LayoutDashboard,
  X,
  Lock,
  Loader2,
  Calendar,
  Star,
  Mail,
  Users,
  Bell,
  Briefcase,
  Check,
  Clock,
  Phone,
  Trash2,
  TrendingUp,
  ArrowRight,
  Download,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type TabKey =
  | "bookings"
  | "reviews"
  | "contact"
  | "newsletter"
  | "waitlist"
  | "jobs";

interface AdminData {
  stats: {
    bookings: number;
    pendingBookings: number;
    reviews: number;
    avgRating: string;
    contactMessages: number;
    newsletterSubs: number;
    waitlist: number;
    jobApps: number;
  };
  bookings: any[];
  reviews: any[];
  contactMessages: any[];
  waitlist: any[];
  jobApps: any[];
}

export function AdminDashboard() {
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AdminData | null>(null);
  const [tab, setTab] = useState<TabKey>("bookings");

  const authHeader = useCallback(() => ({ "x-admin-key": pw }), [pw]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin", {
        headers: authHeader(),
      });
      if (!res.ok) throw new Error("Unauthorized");
      const json = await res.json();
      setData(json);
    } catch {
      setError("Failed to load data — check your password");
    } finally {
      setLoading(false);
    }
  }, [authHeader]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pw.trim()) {
      setError("Please enter the admin password");
      return;
    }
    setAuthed(true);
    setError("");
    fetchData();
  };

  const logout = () => {
    setAuthed(false);
    setPw("");
    setData(null);
    setOpen(false);
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify({ id, status, model: "booking" }),
      });
      if (res.ok) fetchData();
    } catch {
      /* noop */
    }
  };

  const toggleReviewApproval = async (id: string, approved: boolean) => {
    try {
      const res = await fetch("/api/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify({
          id,
          status: approved ? "unapproved" : "approved",
          model: "review",
        }),
      });
      if (res.ok) fetchData();
    } catch {
      /* noop */
    }
  };

  // Listen for admin open event (from footer button)
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("bitanas:open-admin", handler);
    return () => window.removeEventListener("bitanas:open-admin", handler);
  }, []);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const TABS: { key: TabKey; label: string; icon: typeof Calendar; count: number }[] = [
    { key: "bookings", label: "Bookings", icon: Calendar, count: data?.stats.bookings ?? 0 },
    { key: "reviews", label: "Reviews", icon: Star, count: data?.stats.reviews ?? 0 },
    { key: "contact", label: "Messages", icon: Mail, count: data?.stats.contactMessages ?? 0 },
    { key: "newsletter", label: "Newsletter", icon: Users, count: data?.stats.newsletterSubs ?? 0 },
    { key: "waitlist", label: "Waitlist", icon: Bell, count: data?.stats.waitlist ?? 0 },
    { key: "jobs", label: "Applications", icon: Briefcase, count: data?.stats.jobApps ?? 0 },
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md flex items-stretch justify-stretch">
      <div className="w-full h-full flex flex-col bg-background overflow-hidden">
        {/* Top bar */}
        <header className="shrink-0 bg-gradient-to-r from-rose-deep via-rose to-rose-deep text-white px-4 sm:px-6 py-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <LayoutDashboard className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-serif text-lg font-bold leading-tight">
                Bitanas Admin
              </h1>
              <p className="text-[11px] text-white/70">
                Dashboard &amp; submission manager
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {authed && (
              <Button
                onClick={logout}
                variant="ghost"
                className="text-white hover:bg-white/15 h-9 text-xs"
              >
                Logout
              </Button>
            )}
            <button
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
              aria-label="Close admin"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        {!authed ? (
          /* Login gate */
          <div className="flex-1 flex items-center justify-center p-4">
            <form
              onSubmit={login}
              className="w-full max-w-sm rounded-3xl bg-white border border-rose-soft/50 p-7 shadow-2xl"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose to-rose-deep text-white shadow-lg mb-4">
                <Lock className="h-7 w-7" />
              </div>
              <h2 className="text-center font-serif text-xl font-bold text-foreground">
                Admin Login
              </h2>
              <p className="text-center text-sm text-foreground/55 mt-1 mb-5">
                Enter your password to access the dashboard
              </p>
              <Input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Password"
                className="rounded-xl border-rose-soft focus-visible:ring-rose/40 h-11 text-center"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-xs text-destructive text-center">{error}</p>
              )}
              <Button
                type="submit"
                className="w-full mt-4 rounded-xl bg-gradient-to-r from-rose to-rose-deep text-white h-11 font-semibold"
              >
                Enter Dashboard
              </Button>
              <p className="mt-3 text-center text-[10px] text-foreground/40">
                Demo password configured via env
              </p>
            </form>
          </div>
        ) : loading && !data ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-rose-deep" />
          </div>
        ) : data ? (
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Sidebar tabs */}
            <aside className="shrink-0 lg:w-60 border-b lg:border-b-0 lg:border-r border-border bg-muted/30 p-2 lg:p-3 flex lg:flex-col gap-1 overflow-x-auto">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap",
                    tab === t.key
                      ? "bg-gradient-to-r from-rose to-rose-deep text-white shadow-sm"
                      : "text-foreground/70 hover:bg-rose-soft/40 hover:text-rose-deep"
                  )}
                >
                  <t.icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1 text-left">{t.label}</span>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                      tab === t.key
                        ? "bg-white/25 text-white"
                        : "bg-rose-soft/60 text-rose-deep"
                    )}
                  >
                    {t.count}
                  </span>
                </button>
              ))}
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6">
              {/* Stats overview */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {[
                  { label: "Total Bookings", value: data.stats.bookings, icon: Calendar, sub: `${data.stats.pendingBookings} pending` },
                  { label: "Avg Rating", value: `${data.stats.avgRating}★`, icon: Star, sub: `${data.stats.reviews} reviews` },
                  { label: "Newsletter", value: data.stats.newsletterSubs, icon: Users, sub: "subscribers" },
                  { label: "Waitlist", value: data.stats.waitlist, icon: Bell, sub: "waiting" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl bg-white border border-rose-soft/50 p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-soft text-rose-deep">
                        <s.icon className="h-4 w-4" />
                      </span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="mt-2 font-serif text-2xl font-bold text-foreground">
                      {s.value}
                    </p>
                    <p className="text-xs text-foreground/50">{s.label}</p>
                    <p className="text-[10px] text-rose-deep font-medium mt-0.5">
                      {s.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tab content */}
              {tab === "bookings" && (
                                                <DataTable
                                                  title="Booking Requests"
                                                  rows={data.bookings}
                                                  csvType="bookings"
                                                  adminPw={pw}
                  columns={["name", "phone", "service", "artist", "date", "time", "status", "createdAt"]}
                  render={(row, col) => {
                    if (col === "createdAt") return formatDate(row[col]);
                    if (col === "status") {
                      return (
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                            row[col] === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : row[col] === "cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-amber-100 text-amber-700"
                          )}
                        >
                          {row[col]}
                        </span>
                      );
                    }
                    return row[col] || "—";
                  }}
                  actions={(row) =>
                    row.status === "pending" ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => updateBookingStatus(row.id, "confirmed")}
                          className="rounded-lg bg-green-100 text-green-700 p-1.5 hover:bg-green-200"
                          title="Confirm"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => updateBookingStatus(row.id, "cancelled")}
                          className="rounded-lg bg-red-100 text-red-700 p-1.5 hover:bg-red-200"
                          title="Cancel"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : null
                  }
                />
              )}

                  {tab === "reviews" && (
                <DataTable
                  title="Customer Reviews"
                  rows={data.reviews}
                  csvType="reviews"
                  adminPw={pw}
                  columns={["name", "rating", "service", "comment", "approved", "createdAt"]}
                  render={(row, col) => {
                    if (col === "createdAt") return formatDate(row[col]);
                    if (col === "rating")
                      return "★".repeat(row[col]) + "☆".repeat(5 - row[col]);
                    if (col === "approved")
                      return (
                        <button
                          onClick={() => toggleReviewApproval(row.id, row.approved)}
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                            row.approved
                              ? "bg-green-100 text-green-700"
                              : "bg-muted text-foreground/50"
                          )}
                        >
                          {row.approved ? "Approved" : "Hidden"}
                        </button>
                      );
                    if (col === "comment")
                      return <span className="line-clamp-2">{row[col]}</span>;
                    return row[col] || "—";
                  }}
                />
              )}

              {tab === "contact" && (
                <DataTable
                  title="Contact Messages"
                  rows={data.contactMessages}
                  csvType="contact"
                  adminPw={pw}
                  columns={["name", "email", "subject", "message", "createdAt"]}
                  render={(row, col) => {
                    if (col === "createdAt") return formatDate(row[col]);
                    if (col === "message")
                      return <span className="line-clamp-2">{row[col]}</span>;
                    return row[col] || "—";
                  }}
                />
              )}

              {tab === "newsletter" && (
                <SimpleList
                  title={`Newsletter Subscribers (${data.stats.newsletterSubs})`}
                  emptyText="No subscribers yet"
                >
                  <div className="rounded-2xl bg-gradient-to-br from-rose-deep to-rose p-6 text-white text-center mb-4">
                    <Users className="h-10 w-10 mx-auto mb-2" />
                    <p className="font-serif text-3xl font-bold">
                      {data.stats.newsletterSubs}
                    </p>
                    <p className="text-sm text-white/80">
                      Total subscribers on the Beauty Insider list
                    </p>
                  </div>
                  {data.stats.newsletterSubs > 0 && (
                    <div className="flex justify-center">
                      <a
                        href="/api/admin/export?type=newsletter"
                        onClick={(e) => {
                          e.preventDefault();
                          fetch("/api/admin/export?type=newsletter", {
                            headers: { "x-admin-key": pw },
                          })
                            .then((r) => r.blob())
                            .then((blob) => {
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement("a");
                              a.href = url;
                              a.download = `bitanas-newsletter-${new Date().toISOString().split("T")[0]}.csv`;
                              a.click();
                              URL.revokeObjectURL(url);
                            });
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-rose-soft/60 text-rose-deep hover:bg-rose hover:text-white px-4 py-2 text-xs font-semibold transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Export Subscribers CSV
                      </a>
                    </div>
                  )}
                </SimpleList>
              )}

              {tab === "waitlist" && (
                <DataTable
                  title="Waitlist Requests"
                  rows={data.waitlist}
                  csvType="waitlist"
                  adminPw={pw}
                  columns={["name", "phone", "service", "preferredDate", "createdAt"]}
                  render={(row, col) => {
                    if (col === "createdAt") return formatDate(row[col]);
                    return row[col] || "—";
                  }}
                />
              )}

              {tab === "jobs" && (
                <DataTable
                  title="Job Applications"
                  rows={data.jobApps}
                  csvType="jobs"
                  adminPw={pw}
                  columns={["name", "email", "phone", "position", "experience", "message", "createdAt"]}
                  render={(row, col) => {
                    if (col === "createdAt") return formatDate(row[col]);
                    if (col === "message")
                      return <span className="line-clamp-2">{row[col]}</span>;
                    return row[col] || "—";
                  }}
                />
              )}
            </main>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function DataTable({
  title,
  rows,
  columns,
  render,
  actions,
  csvType,
  adminPw,
}: {
  title: string;
  rows: any[];
  columns: string[];
  render: (row: any, col: string) => React.ReactNode;
  actions?: (row: any) => React.ReactNode;
  csvType?: string;
  adminPw?: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      columns.some((col) => {
        const val = row[col];
        return val != null && String(val).toLowerCase().includes(q);
      })
    );
  }, [rows, query, columns]);

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <h2 className="font-serif text-lg font-bold text-foreground">
          {title}{" "}
          <span className="text-sm font-normal text-foreground/50">
            ({filtered.length}
            {query && filtered.length !== rows.length ? ` of ${rows.length}` : ""})
          </span>
        </h2>
        <div className="flex items-center gap-2">
          {rows.length > 0 && (
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="h-8 w-40 rounded-lg bg-white border border-rose-soft/60 pl-8 pr-7 text-xs focus:outline-none focus:ring-2 focus:ring-rose/30"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full hover:bg-rose-soft text-foreground/40 hover:text-rose-deep"
                  aria-label="Clear search"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          )}
          {csvType && rows.length > 0 && (
            <a
              href={`/api/admin/export?type=${csvType}`}
              onClick={(e) => {
                e.preventDefault();
                fetch(`/api/admin/export?type=${csvType}`, {
                  headers: { "x-admin-key": adminPw || "" },
                })
                  .then((r) => r.blob())
                  .then((blob) => {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `bitanas-${csvType}-${new Date().toISOString().split("T")[0]}.csv`;
                    a.click();
                    URL.revokeObjectURL(url);
                  });
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-rose-soft/60 text-rose-deep hover:bg-rose hover:text-white px-3.5 py-1.5 text-xs font-semibold transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                Export CSV
              </a>
            )}
        </div>
      </div>
      {rows.length === 0 ? (
        <div className="rounded-2xl bg-muted/30 border border-dashed border-border p-10 text-center">
          <p className="text-foreground/50 text-sm">No entries yet</p>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-rose-soft/50 overflow-hidden overflow-x-auto shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-rose-soft/30 border-b border-rose-soft/50">
                {columns.map((c) => (
                  <th
                    key={c}
                    className="text-left p-3 font-semibold text-foreground/60 text-xs uppercase tracking-wider whitespace-nowrap"
                  >
                    {c}
                  </th>
                ))}
                {actions && <th className="p-3 w-20"></th>}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((row, i) => (
                  <tr
                    key={row.id || i}
                    className="border-b border-border/40 last:border-0 hover:bg-rose-soft/10 transition-colors"
                  >
                    {columns.map((c) => (
                      <td key={c} className="p-3 text-foreground/80 whitespace-nowrap max-w-xs">
                        {render(row, c)}
                      </td>
                    ))}
                    {actions && <td className="p-3">{actions(row)}</td>}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + (actions ? 1 : 0)} className="p-8 text-center text-foreground/50 text-sm">
                    No matches for &ldquo;{query}&rdquo;
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function SimpleList({
  title,
  emptyText,
  children,
}: {
  title: string;
  emptyText: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="font-serif text-lg font-bold text-foreground mb-3">
        {title}
      </h2>
      {children}
    </div>
  );
}
