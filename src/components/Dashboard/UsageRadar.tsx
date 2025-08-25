"use client";

import React from "react";
import { FiEye } from "react-icons/fi";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Dummy data: usage distribution among different age groups
const data = [
  {
    feature: "Teenagers",
    VIP: 120,
    Reguler: 80,
    max: 150,
  },
  {
    feature: "Children",
    VIP: 95,
    Reguler: 60,
    max: 150,
  },
  {
    feature: "Parents",
    VIP: 70,
    Reguler: 110,
    max: 150,
  },
  {
    feature: "Adults",
    VIP: 130,
    Reguler: 100,
    max: 150,
  },
  {
    feature: "Babies",
    VIP: 40,
    Reguler: 10,
    max: 150,
  },
];

export const UsageRadar = () => {
  return (
    <div className="col-span-4 overflow-hidden rounded border border-stone-300 bg-white shadow-sm">
      <div className="p-4 border-b border-stone-200">
        <h3 className="flex items-center gap-1.5 font-medium text-stone-700">
          <FiEye /> Usage by Age Group
        </h3>
      </div>

      <div className="h-64 px-4 py-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis
              dataKey="feature"
              tick={{ fontSize: 12, fontWeight: 600, fill: "#374151" }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar
              name="VIP"
              dataKey="VIP"
              stroke="#18181b"
              fill="#18181b"
              fillOpacity={0.25}
            />
            <Radar
              name="Reguler"
              dataKey="Reguler"
              stroke="#5b21b6"
              fill="#5b21b6"
              fillOpacity={0.25}
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-stone-500"
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
