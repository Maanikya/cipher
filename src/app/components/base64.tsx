"use client";

import { useState, useEffect, useRef } from "react";
import { animate } from "animejs";

export default function Base64() {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const blobRef = useRef(null);

  useEffect(() => {
    // Floating background blob
    if (blobRef.current) {
      animate(blobRef.current, {
        translateX: [
          { value: 100, duration: 4000 },
          { value: -100, duration: 4000 }
        ],
        translateY: [
          { value: 50, duration: 5000 },
          { value: -50, duration: 5000 }
        ],
        loop: true,
        direction: "alternate",
        easing: "easeInOutSine"
      });
    }
  }, []);

  useEffect(() => {
    // Real-time encoding
    if (text) {
      const encodedText = btoa(text);
      setEncoded(encodedText);

      animate("#encode-box", {
        scale: [1, 1.05, 1],
        duration: 400,
        easing: "easeInOutQuad"
      });
    } else {
      setEncoded("");
    }

    // Real-time decoding
    if (text) {
      try {
        const decodedText = atob(text);
        setDecoded(decodedText);

        animate("#decode-box", {
          scale: [1, 1.05, 1],
          duration: 400,
          easing: "easeInOutQuad"
        });
      } catch (e) {
        setDecoded("Invalid Base64!");
      }
    } else {
      setDecoded("");
    }
  }, [text]);

  return (
    <>
      <div
        ref={blobRef}
        className="w-[400px] h-[300px] bg-purple-600 opacity-20 rounded-full blur-3xl -z-10"
      ></div>

      <h1 className="text-5xl mb-4">Real-time Base64</h1>

      <textarea
        className="w-[500px] h-26 bg-black/40 border border-white/30 p-4 rounded-lg text-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        placeholder="Type text or Base64 here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="mt-6 space-y-6 w-[500px]">
        {encoded && (
          <div
            id="encode-box"
            className="p-4 bg-white/10 border border-purple-500 rounded-lg break-words text-purple-300"
          >
            <strong>Encoded:</strong>
            <p>{encoded}</p>
          </div>
        )}

        {decoded && (
          <div
            id="decode-box"
            className="p-4 bg-white/10 border border-blue-500 rounded-lg break-words text-blue-300"
          >
            <strong>Decoded:</strong>
            <p>{decoded}</p>
          </div>
        )}
      </div>
    </>
  );
}
