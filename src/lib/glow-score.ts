export interface GlowScoreResult {
  score: number;
  label: string;
  emoji: string;
  color: string;
  recommendations: string[];
}

export function calculateGlowScore(answers: Record<string, string>): GlowScoreResult {
  const type = answers.type || "hair";
  const concern = answers.concern || "pamper";
  const budget = answers.budget || "signature";

  let score = 35;
  if (type === "hair") score += 10;
  else if (type === "skin") score += 12;
  else if (type === "nails") score += 8;
  else if (type === "bridal") score += 15;

  if (concern === "event") score += 15;
  else if (concern === "pamper") score += 10;
  else if (concern === "dry") score += 8;
  else if (concern === "damage") score += 5;

  if (budget === "premium") score += 15;
  else if (budget === "signature") score += 10;
  else if (budget === "bridal") score += 12;
  else if (budget === "express") score += 5;

  score = Math.min(100, Math.max(0, score));

  const recs: string[] = [];
  if (type === "hair") {
    recs.push("Signature Balayage — dimensional color for natural glow");
    recs.push("Luxury Blow Dry — instant volume & shine");
    if (concern === "damage") recs.push("Hair Spa Treatment — deep repair & hydration");
  } else if (type === "skin") {
    recs.push("Signature Facial — deep cleanse & radiance boost");
    recs.push("Relaxation Spa Ritual — full-body unwind");
    if (concern === "dry") recs.push("Hydrating Mask Add-on — extra moisture lock");
  } else if (type === "nails") {
    recs.push("Acrylic Nails — custom shape & art");
    recs.push("Spa Mani/Pedi — complete hand & foot care");
  } else if (type === "bridal") {
    recs.push("Bridal Royale Package — full wedding glam");
    recs.push("Pre-Bridal Facial — glow from within");
    recs.push("Trial Session — perfect your look beforehand");
  }

  if (budget === "express") {
    return { score: Math.min(score, 45), label: "Glow Starter", emoji: "🌱", color: "from-green-400 to-emerald-500", recommendations: recs.slice(0, 2) };
  } else if (score <= 50) {
    return { score, label: "Glow Sprout", emoji: "🌿", color: "from-rose-soft to-rose", recommendations: recs.slice(0, 2) };
  } else if (score <= 70) {
    return { score, label: "Glow Blossom", emoji: "🌸", color: "from-rose to-rose-deep", recommendations: recs };
  } else if (score <= 85) {
    return { score, label: "Glow Radiance", emoji: "✨", color: "from-rose-deep to-purple-600", recommendations: recs };
  } else {
    return { score: 100, label: "Glow Queen", emoji: "👑", color: "from-gold to-amber-600", recommendations: recs };
  }
}

export function glowShareText(result: GlowScoreResult): string {
  return `✨ My Bitanas Glow Score: ${result.score}/100 — ${result.label} ${result.emoji}\n\nTake the quiz → bitanas.pk/quiz\n#BitanasGlow #PeshawarSalon`;
}
