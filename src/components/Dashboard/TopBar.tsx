"use client";

import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import Calendar, { Value } from "react-calendar";
import "react-calendar/dist/Calendar.css";

// fungsi format tanggal sesuai contoh
const formatDate = (date: Date) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  return `${dayName}, ${monthName} ${day}${getOrdinal(day)} ${year}`;
};

// fungsi untuk menentukan greeting sesuai jam
const getGreeting = (hour: number) => {
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 21) return "Good evening";
  return "Good night";
};

export const TopBar = () => {
  const now = new Date();
  const [showCalendar, setShowCalendar] = useState(false);
  // Gunakan tipe Value dari react-calendar (Date | [Date | null, Date | null] | null)
  const [selectedDate, setSelectedDate] = useState<Value>(now);

  const monthsPassed = now.getMonth() + 1; // Januari = 0, jadi +1
  const greeting = getGreeting(now.getHours());

  // Ambil 1 Date yang valid dari Value (untuk display)
  const selectedAsDate: Date =
    (Array.isArray(selectedDate)
      ? selectedDate[0] ?? now
      : selectedDate ?? now) as Date;

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200 relative">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">🚀 {greeting}, Tom!</span>
          <span className="text-xs block text-stone-500">
            {formatDate(now)}
          </span>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowCalendar((v) => !v)}
            className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 hover:text-violet-700 px-3 py-1.5 rounded"
          >
            <FiCalendar />
            <span>{monthsPassed} Months</span>
          </button>

          {showCalendar && (
            <div className="absolute right-0 mt-2 bg-white border border-stone-200 rounded shadow p-3 z-10">
              <Calendar
                // onChange menerima Value, bukan Date
                onChange={(value) => setSelectedDate(value)}
                value={selectedDate}
                selectRange={false}
              />
              <p className="mt-2 text-xs text-stone-600">
                Selected: {formatDate(selectedAsDate)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
