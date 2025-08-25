import React, { useState } from "react";
import { FiUsers } from "react-icons/fi";

type BedStatus = "Available" | "Occupied" | "Repaired" | "Unassigned";

type BedData = {
  status: BedStatus;
  nurse?: string;
  patient?: string;
  startDate?: string;
  endDate?: string;
  handler?: string;
  issue?: string;
};

// Dummy initial data
const initialBeds: Record<string, Record<string, BedData>> = {
  "Room 101": {
    "Bed 1": { status: "Available", handler: "Admin A" },
    "Bed 2": {
      status: "Occupied",
      nurse: "Nurse Julia",
      patient: "John Doe",
      startDate: "2023-08-20",
      endDate: "2023-08-25",
      handler: "Dr. Smith",
    },
    "Bed 3": { status: "Repaired", issue: "Broken frame", handler: "Tech Team" },
    "Bed 4": { status: "Available", handler: "Admin B" },
  },
  "Room 102": {
    "Bed 1": {
      status: "Occupied",
      nurse: "Nurse Alex",
      patient: "Sarah Lee",
      startDate: "2023-08-21",
      endDate: "2023-08-26",
      handler: "Dr. Williams",
    },
    "Bed 2": { status: "Available", handler: "Admin C" },
  },
  "Room 103": {
    "Bed 1": { status: "Repaired", issue: "Mattress replacement", handler: "Tech Team" },
    "Bed 2": { status: "Available", handler: "Admin D" },
    "Bed 3": {
      status: "Occupied",
      nurse: "Nurse Emma",
      patient: "Michael Chen",
      startDate: "2023-08-23",
      handler: "Dr. Lee",
    },
    "Bed 4": { status: "Available", handler: "Admin E" },
    "Bed 5": {
      status: "Occupied",
      nurse: "Nurse Ryan",
      patient: "Sophia Park",
      startDate: "2023-08-22",
      handler: "Dr. Brown",
    },
    "Bed 6": { status: "Repaired", issue: "Broken wheel", handler: "Tech Team" },
  },
  // Dummy rooms tambahan
  "Room 104": {
    "Bed 1": { status: "Available", handler: "Admin F" },
    "Bed 2": { status: "Available", handler: "Admin G" },
  },
  "Room 105": {
    "Bed 1": { status: "Occupied", nurse: "Nurse Clara", patient: "David Kim", handler: "Dr. Adams" },
    "Bed 2": { status: "Repaired", issue: "Broken headboard", handler: "Tech Team" },
    "Bed 3": { status: "Available", handler: "Admin H" },
  },
};

export const RecentTransactions = ({
  onSelectPage,
}: {
  onSelectPage?: (page: string) => void;
}) => {
  const [showAll, setShowAll] = useState(false);

  // fungsi hitung status per room
  const summarizeRoom = (beds: Record<string, BedData>) => {
    let available = 0,
      occupied = 0,
      repaired = 0;

    Object.values(beds).forEach((bed) => {
      if (bed.status === "Available") available++;
      else if (bed.status === "Occupied") occupied++;
      else if (bed.status === "Repaired") repaired++;
    });

    return { available, occupied, repaired };
  };

  const rooms = Object.entries(initialBeds);
  const visibleRooms = showAll ? rooms : rooms.slice(0, 3);

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300 bg-white shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          Bed Availability by Room
        </h3>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-sm text-violet-500 hover:underline"
        >
          {showAll ? "Show less" : "See all"}
        </button>
      </div>
      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          {visibleRooms.map(([room, beds], index) => {
            const summary = summarizeRoom(beds);
            return (
              <TableRow
                key={room}
                room={room}
                available={summary.available}
                occupied={summary.occupied}
                repaired={summary.repaired}
                order={index + 1}
                onSelectPage={onSelectPage}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">Room</th>
        <th className="text-center p-1.5">Available Beds</th>
        <th className="text-center p-1.5">Occupied Beds</th>
        <th className="text-center p-1.5">Repaired Beds</th>
        <th className="w-16"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  room,
  available,
  occupied,
  repaired,
  order,
  onSelectPage,
}: {
  room: string;
  available: number;
  occupied: number;
  repaired: number;
  order: number;
  onSelectPage?: (page: string) => void;
}) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5 font-medium text-gray-700">{room}</td>
      <td className="p-1.5 text-green-700 font-semibold text-center">
        {available}
      </td>
      <td className="p-1.5 text-blue-700 font-semibold text-center">
        {occupied}
      </td>
      <td className="p-1.5 text-red-700 font-semibold text-center">
        {repaired}
      </td>
      <td className="p-1.5 text-center">
        <button
          onClick={() => onSelectPage && onSelectPage("Bed")}
          className="px-3 py-1 text-xs font-medium rounded bg-violet-100 text-violet-700 hover:bg-violet-200 transition"
        >
          Detail
        </button>
      </td>
    </tr>
  );
};
