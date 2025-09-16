import { useEffect, useRef } from "react";
import { animate } from "animejs";

export default function FloatingBlob() {
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

  return (
    <div
      ref={blobRef}
      className="w-full h-[300px] bg-purple-600 opacity-20 rounded-full blur-3xl -z-10"
    ></div>
  )
}