import { NextResponse } from "next/server";
import { SERVICES, PACKAGES, SALON } from "@/lib/salon-data";

// Generates a print-friendly HTML price list that the browser can
// open in a new tab and "Save as PDF" via the print dialog.
export async function GET() {
  const rows = SERVICES.map(
    (s) => `
      <tr>
        <td class="name">${s.name}<div class="cat">${s.category} · ${s.duration}</div></td>
        <td class="desc">${s.description}</td>
        <td class="price">${s.price}</td>
      </tr>`
  ).join("");

  const pkgRows = PACKAGES.map(
    (p) => `
      <tr>
        <td class="name">${p.name}<div class="cat">${p.duration}</div></td>
        <td class="desc">${p.includes.slice(0, 4).join(" · ")}${p.includes.length > 4 ? "…" : ""}</div>
        <td class="price">${p.price}</td>
      </tr>`
  ).join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Bitanas Salon — Price List</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Georgia, 'Times New Roman', serif; color: #2b1722; padding: 40px; background: #fff; }
  .header { text-align: center; border-bottom: 3px double #c0506a; padding-bottom: 20px; margin-bottom: 30px; }
  .logo { font-size: 36px; font-weight: bold; color: #9c2a44; letter-spacing: 1px; }
  .tagline { font-style: italic; color: #888; font-size: 14px; margin-top: 4px; }
  .meta { font-size: 12px; color: #666; margin-top: 10px; line-height: 1.6; }
  h2 { color: #9c2a44; font-size: 20px; margin: 28px 0 12px; padding-bottom: 6px; border-bottom: 1px solid #f0d4dc; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 10px 8px; border-bottom: 1px solid #f5e8ec; vertical-align: top; }
  td.name { font-weight: bold; width: 32%; }
  td.cat { font-weight: normal; font-size: 11px; color: #999; font-style: italic; margin-top: 2px; }
  td.desc { font-size: 13px; color: #555; line-height: 1.5; }
  td.price { text-align: right; font-weight: bold; color: #9c2a44; white-space: nowrap; width: 18%; }
  .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #f0d4dc; text-align: center; font-size: 11px; color: #888; }
  .badge { display: inline-block; background: #fce8ee; color: #9c2a44; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: bold; margin-left: 6px; }
  @media print {
    body { padding: 20px; }
    .no-print { display: none; }
  }
  .print-btn { position: fixed; top: 20px; right: 20px; background: #9c2a44; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-size: 14px; cursor: pointer; box-shadow: 0 4px 12px rgba(156,42,68,0.3); }
  .print-btn:hover { background: #7a1f35; }
</style>
</head>
<body>
  <button class="print-btn no-print" onclick="window.print()">📄 Save as PDF</button>
  <div class="header">
    <div class="logo">✨ Bitanas Salon</div>
    <div class="tagline">Where Beauty Meets Artistry</div>
    <div class="meta">
      ${SALON.address}<br/>
      📞 ${SALON.phone} &nbsp;·&nbsp; ⭐ ${SALON.rating}/5 (${SALON.reviewCount} reviews)<br/>
      Mon–Sat 10:30 AM – 8:00 PM · Friday 2:00 PM – 8:00 PM · Sunday Closed
    </div>
  </div>

  <h2>Signature Services</h2>
  <table>${rows}</table>

  <h2>Bridal Packages</h2>
  <table>${pkgRows}</table>

  <div class="footer">
    <p>Prices are starting points and may vary based on hair length, skin condition, and complexity.</p>
    <p>All services include a complimentary consultation. Premium products used (MAC, NARS, Huda Beauty, Kryolan).</p>
    <p>© ${new Date().getFullYear()} Bitanas Salon, Peshawar. · Generated on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
  </div>
  <script>
    // Auto-trigger print dialog after load
    window.addEventListener('load', function() { setTimeout(function(){ window.print(); }, 500); });
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
