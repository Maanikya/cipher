"use client";

import { useState, useEffect, useRef } from "react";
import { animate } from "animejs";

export default function Base64() {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const blobRef = useRef(null);

  useEffect(() => {
    // Background floating animation
    if (blobRef.current) {
      animate(blobRef.current, {
        translateX: [
          { value: 100, duration: 3000 },
          { value: -100, duration: 3000 }
        ],
        translateY: [
          { value: 50, duration: 4000 },
          { value: -50, duration: 4000 }
        ],
        loop: true,
        direction: "alternate",
        easing: "easeInOutSine"
      });
    }
  }, []);

  const handleEncode = () => {
    const encodedText = btoa(text);
    setEncoded(encodedText);
    animate("#encode-box", {
      scale: [1, 1.05, 1],
      duration: 600,
      easing: "easeInOutQuad"
    });
  };

  const handleDecode = () => {
    try {
      const decodedText = atob(text);
      setDecoded(decodedText);
      animate("#decode-box", {
        scale: [1, 1.05, 1],
        duration: 600,
        easing: "easeInOutQuad"
      });
    } catch (e) {
      setDecoded("Invalid Base64 string!");
    }
  };

  return (
    <>
      <div
        ref={blobRef}
        className="absolute w-[400px] h-[400px] bg-purple-600 opacity-20 rounded-full blur-3xl -z-10"
      ></div>
      <h1 className="text-5xl mb-8">🛸 Base64 Encryptor</h1>

      <textarea
        className="w-[500px] h-32 bg-black/40 border border-white/30 p-4 rounded-lg text-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleEncode}
          className="bg-purple-500 px-6 py-2 rounded-lg hover:bg-purple-600 transition-all"
        >
          Encode
        </button>
        <button
          onClick={handleDecode}
          className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Decode
        </button>
      </div>

      <div className="mt-8 space-y-6">
        {encoded && (
          <div
            id="encode-box"
            className="p-4 bg-white/10 border border-purple-500 rounded-lg w-[500px] break-words text-purple-300"
          >
            <strong>Encoded:</strong>
            <p>{encoded}</p>
          </div>
        )}

        {decoded && (
          <div
            id="decode-box"
            className="p-4 bg-white/10 border border-blue-500 rounded-lg w-[500px] break-words text-blue-300"
          >
            <strong>Decoded:</strong>
            <p>{decoded}</p>
          </div>
        )}
      </div>
    </>
  );
}
