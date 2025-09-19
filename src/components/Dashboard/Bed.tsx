import React, { useMemo, useState } from "react";

// Tipe untuk setiap bed
type Bed = {
  id: number;
  assigned: boolean;
  repair?: boolean;
};

// Data awal kasur
const initialBeds: Bed[] = Array.from({ length: 26 }, (_, i) => ({
  id: i + 1,
  assigned: false,
}));

// Definisikan skema kamar dengan tipe yang benar
const ROOM_RANGES = {
  TOP_LEFT: [1, 4] as [number, number],
  LEFT: [5, 10] as [number, number],
  CENTER: [11, 16] as [number, number],
  RIGHT: [17, 22] as [number, number],
  BOTTOM_CENTER: [23, 26] as [number, number],
} as const;

const RoomKey = ["TOP_LEFT", "LEFT", "CENTER", "RIGHT", "BOTTOM_CENTER"] as const;

const BedRect: React.FC<{
  variant: "normal" | "assigned" | "repair";
  number: number;
  row: number;
}> = ({ variant, number, row }) => {
  const bg = variant === "repair" ? "bg-yellow-300" : variant === "assigned" ? "bg-green-300" : "bg-white";

  // Posisi kotak kecil untuk kasur genap (ml-20) dan ganjil (ml-0)
  const smallBoxPosition = number % 2 === 0 ? "ml-20" : "ml-0"; // Genap = ml-20, Ganjil = ml-0
  const isLeft = number % 2 === 0; // Genap = kiri, ganjil = kanan

  return (
    <div className={`flex ${isLeft ? "flex-row-reverse" : "flex-row"} flex-col items-start justify-center`}>
      <div className={`w-4 h-4 border-2 border-black mb-2 ${smallBoxPosition}`}></div>
      <div className={`${bg} w-24 h-12 border-2 border-black relative`}></div>
    </div>
  );
};

const BedUnit: React.FC<{ bed: Bed; row: number }> = ({ bed, row }) => {
  const variant: "normal" | "assigned" | "repair" = bed.repair ? "repair" : bed.assigned ? "assigned" : "normal";
  return (
    <div className="relative flex items-center gap-2">
      <BedRect variant={variant} number={bed.id} row={row} />
    </div>
  );
};

const BedGridRows: React.FC<{ beds: Bed[]; rows: number }> = ({ beds, rows }) => {
  const cells = useMemo(() => beds.slice(0, rows * 2), [beds, rows]);
  const chunks: Bed[][] = [];
  for (let r = 0; r < rows; r++) {
    chunks.push(cells.slice(r * 2, r * 2 + 2));
  }
  return (
    <div className="flex flex-col gap-3">
      {chunks.map((row, idx) => (
        <div key={idx} className="flex items-center justify-between gap-6">
          {row.map((b) => (
            <BedUnit key={b.id} bed={b} row={idx + 1} />
          ))}
        </div>
      ))}
    </div>
  );
};

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="border-4 border-sky-500 rounded-2xl p-4 bg-white/80 shadow-sm">
    <h3 className="text-sm font-semibold text-sky-700 tracking-wide">{title}</h3>
    {children}
  </section>
);

const DialysisLayoutPage: React.FC = () => {
  const [beds] = useState<Bed[]>(initialBeds);

  const getBedsInRange = (range: [number, number]) =>
    beds.filter((b) => b.id >= range[0] && b.id <= range[1]);

  const renderRoom = (roomKey: keyof typeof ROOM_RANGES) => {
    const list = getBedsInRange(ROOM_RANGES[roomKey]);
    return (
      <Card title={`Bed Room (${roomKey.replace("_", " ")})`}>
        <BedGridRows beds={list} rows={roomKey === "CENTER" ? 3 : 2} />
      </Card>
    );
  };

  return (
    <main className="min-h-screen w-full bg-gray-100 text-gray-900">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold leading-tight">DYALISIS BED AND MACHINE MANAGEMENT</h1>
          <p className="text-gray-600">KLINIK UTAMA JAKARTA KIDNEY CENTER — Lantai 2</p>
        </header>

        {/* TOP ROW: Top Left · Nurse Station · Consultation Room */}
        <div className="grid grid-cols-12 gap-4 items-start">
          <div className="col-span-4">{renderRoom("TOP_LEFT")}</div>

          {/* Nurse Station */}
          <div className="col-span-4 flex items-center justify-center">
            <section className="relative flex items-center justify-center">
              <div className="w-48 h-28 rounded-full border-[6px] border-sky-500 bg-white/80 shadow-sm flex items-center justify-center">
                <div className="w-[90%] h-[78%] rounded-full border border-gray-400 flex items-center justify-center">
                  <span className="text-gray-800 text-sm font-medium">Nurse Station</span>
                </div>
              </div>
            </section>
          </div>

          {/* Consultation Room */}
          <div className="col-span-4">
            <Card title="Doctor Consultation Room">
              <p className="text-[12px] text-gray-600 mt-1">(Ruang konsultasi dokter)</p>
            </Card>
          </div>
        </div>

        {/* MIDDLE ROW: Left · Center(+Bottom) · Right */}
        <div className="grid grid-cols-12 gap-4 mt-6">
          <div className="col-span-4">{renderRoom("LEFT")}</div>
          <div className="col-span-4">{renderRoom("CENTER")}</div>
          <div className="col-span-4">{renderRoom("RIGHT")}</div>
        </div>

        <div className="mt-8 rounded-xl border bg-white/80 p-4">
          <h4 className="font-semibold text-sky-700 mb-2">Legenda</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 text-sm">
            <li className="flex items-center gap-2">
              <div className="w-16 h-8 border border-gray-700 rounded-sm bg-white relative">
                <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold">12</span>
              </div>
              <span>= Tempat tidur pasien (nomor di tengah)</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-3 h-3 border border-gray-700 rounded-sm bg-white" />
              <span>= Mesin dialisis</span>
            </li>
            <li>( O ) Nurse Station</li>
            <li>Kotak berbingkai biru = Ruangan (Consultation / Bed Room)</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default DialysisLayoutPage;
