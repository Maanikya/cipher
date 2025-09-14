"use client";

import { useState, useEffect, useRef } from "react";
import { animate } from "animejs";

export default function Base64() {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const blobRef = useRef(null);

  // Floating blob
  useEffect(() => {
    if (blobRef.current) {
      animate(blobRef.current, {
        translateX: [
          { value: 100, duration: 4000 },
          { value: -100, duration: 4000 },
        ],
        translateY: [
          { value: 50, duration: 5000 },
          { value: -50, duration: 5000 },
        ],
        loop: true,
        direction: "alternate",
        easing: "easeInOutSine",
      });
    }
  }, []);

  // Animate encode/decode with scrambling effect
  const scramble = (selector: string, finalText: string) => {
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

  // Encoding/decoding
  useEffect(() => {
    if (text) {
      const encodedText = btoa(text);
      setEncoded(encodedText);
      scramble("#encode-text", encodedText);

      const decodedText = (() => {
        try {
          return atob(text);
        } catch {
          return "Invalid Base64!";
        }
      })();
      setDecoded(decodedText);
      scramble("#decode-text", decodedText);
    } else {
      setEncoded("");
      setDecoded("");
    }
  }, [text]);

  return (
    <div className="absolute w-full flex flex-col items-center p-6">

      {/* Floating Blob */}
      <div
        ref={blobRef}
        className="w-full h-[300px] bg-purple-600 opacity-20 rounded-full blur-3xl -z-10"
      ></div>

      <h1 className="text-5xl mt-2 mb-4 text-white drop-shadow-lg">
        Real-time Base64
      </h1>

      <textarea
        className="w-[500px] h-26 bg-black/40 border border-white/30 p-4 rounded-lg text-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-white"
        placeholder="Type text or Base64 here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="mt-6 space-y-6 w-[500px]">
        {encoded && (
          <div className="flex flex-wrap gap-2 items-start">
            <strong
              className="p-4 bg-white/10 border-purple-500 rounded-lg text-purple-300 whitespace-nowrap"
            >
              Encoded:
            </strong>
            <div
              id="encode-box"
              className="p-4 flex-1 bg-white/10 border border-purple-500 rounded-lg break-words text-purple-300"
            >
              <p id="encode-text">{encoded}</p>
            </div>
          </div>
        )}

        {decoded && (
          <div
            id="decode-box"
            className="p-4 bg-white/10 border border-blue-500 rounded-lg break-words text-blue-300"
          >
            <strong>Decoded:</strong>
            <p id="decode-text">{decoded}</p>
          </div>
        )}
      </div>
    </div>
  );
}
