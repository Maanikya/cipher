"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import FloatingBlob from "./components/FloatingBlob";
import Base64 from "./pages/base64";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center pb-18 gap-16">
        <FloatingBlob />
        <Base64 />
      </div>
    </SidebarProvider>
  );
}
