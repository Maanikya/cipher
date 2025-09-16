// Animate encode/decode with scrambling effect
export default function scramble(selector: string, finalText: string) {
  const chars = "!@#$%^&*()_+=-{}[]<>?/|";
  const el = document.querySelector(selector) as HTMLElement | null;
  if (!el) return;

  let iteration = 0;
  const maxIterations = 12;

  const scrambleInterval = setInterval(() => {
    el.innerText = finalText
      .split("")
      .map((char, idx) => {
        if (idx < iteration) return char;
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    if (iteration >= finalText.length) {
      clearInterval(scrambleInterval);
      el.innerText = finalText; // restore clean
    }
    iteration += Math.ceil(finalText.length / maxIterations);
  }, 50);
};