import React from "react";
// import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

export const StatCards = () => {
  return (
    <>
      <Card
        title="Available Beds"
        value="12"
        pillText="Stable"
        // trend="up"
        period="Currently unassigned beds"
      />
      <Card
        title="Occupied Beds"
        value="28"
        pillText="+5%"
        // trend="down"
        period="Beds in active use"
      />
      <Card
        title="Beds Under Repair"
        value="3"
        pillText="2 issues"
        // trend="down"
        period="Currently in maintenance"
      />
    </>
  );
};

const Card = ({
  title,
  value,
  pillText,
  // trend,
  period,
}: {
  title: string;
  value: string;
  pillText: string;
  // trend: "up" | "down";
  period: string;
}) => {
  return (
    <div className="col-span-4 p-4 rounded-lg border border-stone-300 shadow-sm bg-white">
      <div className="flex mb-6 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm font-medium">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>

        {/* <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
        </span> */}
      </div>

      <p className="text-xs text-stone-500">{period}</p>
    </div>
  );
};
