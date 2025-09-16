import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import scramble from "../components/scramble";

export default function Base64() {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");

  // Encoding/decoding
  useEffect(() => {
    if (text) {
      const encodedText = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
      setEncoded(encodedText);
      scramble("#encode-text", encodedText);

      const decodedText = (() => {
        try {
          return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(text));
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
    <div id="main" className="relative w-full flex flex-col items-center p-6">

      <h1 id="heading" className="text-5xl mt-2 mb-6 text-white drop-shadow-lg">
        Base64 Encrypt & Decrypt
      </h1>

      <textarea
        id="textarea-input"
        className="w-[500px] h-26 bg-black/40 border border-white/30 p-4 rounded-lg text-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-white"
        placeholder="Type text or Base64 here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div id="text-output" className="mt-6 space-y-6 w-[500px]">
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
          <div className="flex flex-wrap gap-2 items-start">
            <strong
              className="p-4 bg-white/10 border-blue-500 rounded-lg text-blue-300 whitespace-nowrap"
            >
              Decoded:
            </strong>
            <div
              id="decode-box"
              className="p-4 bg-white/10 border border-blue-500 rounded-lg break-words text-blue-300"
            >
              <p id="decode-text">{decoded}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
