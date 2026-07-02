let ctx: AudioContext | null = null;

function getCtx() {
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

function play(freqs: number[], durations: number[], type: OscillatorType = "sine") {
  const c = getCtx();
  const gain = c.createGain();
  gain.connect(c.destination);
  gain.gain.setValueAtTime(0.15, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + durations.reduce((a, b) => a + b, 0));
  let t = c.currentTime;
  for (let i = 0; i < freqs.length; i++) {
    const osc = c.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freqs[i], t);
    osc.connect(gain);
    osc.start(t);
    osc.stop(t + durations[i]);
    t += durations[i];
  }
}

export function playBookingChime() {
  play([523, 659, 784], [0.12, 0.12, 0.25], "sine");
}

export function playWheelTick() {
  play([880], [0.04], "square");
}

export function playWheelWin() {
  play([523, 659, 784, 1047], [0.1, 0.1, 0.1, 0.35], "sine");
}

export function playSparkle() {
  play([1200, 1500, 1800], [0.08, 0.08, 0.15], "sine");
}

export function playStreakFire() {
  play([440, 554, 659, 880], [0.1, 0.1, 0.1, 0.3], "triangle");
}

export function playSwipe() {
  play([600, 400], [0.06, 0.06], "sawtooth");
}
