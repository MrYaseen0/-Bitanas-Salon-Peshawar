export function fireConfetti(count = 80) {
  const colors = ["#e11d48", "#f43f5e", "#fb7185", "#fda4af", "#fecdd3", "#fef08a", "#fde68a", "#fff"];
  const particles: { x: number; y: number; vx: number; vy: number; size: number; color: string; life: number; maxLife: number; rotation: number; rotSpeed: number }[] = [];
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d")!;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * canvas.width * 0.8,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: -Math.random() * 14 - 4,
      size: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: 80 + Math.random() * 60,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 10,
    });
  }
  let frame = 0;
  function draw() {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    for (const p of particles) {
      if (p.life > p.maxLife) continue;
      alive = true;
      p.x += p.vx;
      p.vy += 0.2;
      p.y += p.vy;
      p.life++;
      p.rotation += p.rotSpeed;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = 1 - p.life / p.maxLife;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    }
    if (alive) requestAnimationFrame(draw);
    else { canvas.remove(); }
  }
  draw();
}
