"use client";

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Dashboard } from "@/components/Dashboard/Dashboard";
import Bed from "../components/Dashboard/Bed";        // ✅ default import
import Personel from "@/components/Dashboard/Personel"; // ✅ default import

export default function Home() {
  const [selectedPage, setSelectedPage] = useState("Dashboard");

  const renderContent = () => {
    switch (selectedPage) {
      case "Dashboard":
        return <Dashboard />;
      case "Bed":
        return <Bed />;
      case "Personel":
        return <Personel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <main className="grid gap-4 p-4 grid-cols-[220px,_1fr] min-h-screen bg-stone-100">
      <Sidebar selectedPage={selectedPage} onSelectPage={setSelectedPage} />
      {renderContent()}
    </main>
  );
}
