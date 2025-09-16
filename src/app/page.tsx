"use client";

import FloatingBlob from "./components/FloatingBlob";
import Base64 from "./pages/base64";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center pb-18 gap-16">
      <FloatingBlob />
      <Base64 />
    </div>
  );
}
