"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [today, setToday] = useState<string>("");

  useEffect(() => {
    const date = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(date);
  }, []);

  return (
    <header className="bg-slate-800 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Sacrament Meeting Planner</h1>
        <p className="text-sm text-slate-300">{today || "Loading date..."}</p>
      </div>
    </header>
  );
}
