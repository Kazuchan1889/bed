import React, { useMemo, useState } from "react";

type Bed = {
  id: number;
  assigned: boolean;
  repair?: boolean;
};

type RoomKey =
  | "LEFT_TOP"
  | "LEFT_BOTTOM"
  | "MIDDLE"
  | "RIGHT_TOP"
  | "RIGHT_BOTTOM";

const ROOM_CONFIG: Record<RoomKey, { title: string; rows: number; range: [number, number] }> = {
  LEFT_TOP: { title: "Bed Room (Left Top)", rows: 1, range: [1, 2] },
  LEFT_BOTTOM: { title: "Bed Room (Left Bottom)", rows: 3, range: [3, 8] },
  MIDDLE: { title: "Bed Room (Middle)", rows: 3, range: [9, 14] },
  RIGHT_TOP: { title: "Bed Room (Right Top)", rows: 1, range: [15, 16] },
  RIGHT_BOTTOM: { title: "Bed Room (Right Bottom)", rows: 3, range: [17, 22] },
};

const initialBeds: Bed[] = Array.from({ length: 26 }, (_, i) => ({
  id: i + 1,
  assigned: false,
}));

const inRange = (b: Bed, [s, e]: [number, number]) => b.id >= s && b.id <= e;
const pick = (beds: Bed[], range: [number, number]) => beds.filter((b) => inRange(b, range));


const BedRect: React.FC<{ variant: "normal" | "assigned" | "repair"; number: number; row: number }> = ({ variant, number, row }) => {
  const bg =
    variant === "repair"
      ? "bg-yellow-300"
      : variant === "assigned"
      ? "bg-green-300"
      : "bg-white";

  const smallBoxPosition = number % 2 === 0 ? "ml-20" : "ml-0"; // Genap = ml-20, Ganjil = ml-0
  const isLeft = number % 2 === 0; // Genap = kiri, ganjil = kanan

  return (
    <div className={`flex ${isLeft ? "flex-row-reverse" : "flex-row"} flex-col items-start justify-center`}>
      <div className={`w-4 h-4 border-2 border-black mb-2 ${smallBoxPosition}`}></div>
      <div className={`${bg} w-24 h-12 border-2 border-black relative`}></div>
    </div>
  );
};

const BedUnit: React.FC<{ bed: Bed; onClick: (b: Bed) => void }> = ({ bed, onClick }) => {
  const variant: "normal" | "assigned" | "repair" = bed.repair ? "repair" : bed.assigned ? "assigned" : "normal";

  return (
    <button
      type="button"
      onClick={() => onClick(bed)}
      className="flex items-center gap-2 focus:outline-none"
      title={`Bed ${bed.id}`}
    >
      <BedRect variant={variant} number={bed.id} row={1} /> {/* Ganti state dengan variant */}
    </button>
  );
};

// Grid baris × 2 kolom
const BedGridRows: React.FC<{ beds: Bed[]; rows: number; onClick: (b: Bed) => void }> = ({ beds, rows, onClick }) => {
  const cells = useMemo(() => beds.slice(0, rows * 2), [beds, rows]);
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center justify-between gap-6">
          {cells.slice(r * 2, r * 2 + 2).map((b) => (
            <BedUnit key={b.id} bed={b} onClick={onClick} />
          ))}
        </div>
      ))}
    </div>
  );
};

const Card: React.FC<React.PropsWithChildren<{ title?: string; subtitle?: string; className?: string }>> = ({
  title,
  subtitle,
  className = "",
  children,
}) => (
  <section className={`border-4 border-sky-500 rounded-2xl p-4 bg-white/80 shadow-sm ${className}`}>
    {title && (
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-sky-700 tracking-wide">{title}</h3>
        {subtitle && <p className="text-[11px] text-gray-500">{subtitle}</p>}
      </div>
    )}
    {children}
  </section>
);

// ────────────────────────────────────────────────────────────────────────────────
/** Main Page */
// ────────────────────────────────────────────────────────────────────────────────

export default function DialysisFloor3Page() {
  const [beds, setBeds] = useState<Bed[]>(initialBeds);
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);

  const getBeds = (key: RoomKey) => pick(beds, ROOM_CONFIG[key].range);

  // Reusable room
  const Room: React.FC<{ k: RoomKey }> = ({ k }) => {
    const cfg = ROOM_CONFIG[k];
    const list = getBeds(k);
    return (
      <Card
        title={cfg.title}
        subtitle={`Kasur: ${list.map((b) => b.id).join(", ") || "-"}`}
      >
        <BedGridRows beds={list} rows={cfg.rows} onClick={setSelectedBed} />
      </Card>
    );
  };

  return (
    <main className="min-h-screen w-full bg-gray-100 text-gray-900">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-xl md:text-2xl font-bold leading-tight">
            DYALISIS BED AND MACHINE MANAGEMENT
          </h1>
          <p className="text-gray-600">KLINIK UTAMA JAKARTA KIDNEY CENTER — Lantai 3</p>
        </header>

        {/* TOP ZONE: three columns with top/bottom splits on left & right */}
        <div className="grid grid-cols-12 gap-4 items-start">
          <div className="col-span-4 space-y-4">
            <Room k="LEFT_TOP" />
            <Room k="LEFT_BOTTOM" />
          </div>

          <div className="col-span-4">
            <Room k="MIDDLE" />
          </div>

          <div className="col-span-4 space-y-4">
            <Room k="RIGHT_TOP" />
            <Room k="RIGHT_BOTTOM" />
          </div>
        </div>

        {/* BOTTOM ZONE: Doctor room (left), Nurse station (center), corridor (right) */}
        <div className="grid grid-cols-12 gap-4 items-start mt-6">
          <div className="col-span-4">
            <Card>
              <h3 className="text-sm font-semibold text-sky-700 tracking-wide">
                Doctor Consultation Room
              </h3>
            </Card>
          </div>

          <div className="col-span-4 flex items-center justify-center">
            <section className="relative flex items-center justify-center">
              <div className="w-48 h-28 rounded-full border-[6px] border-sky-500 bg-white/80 shadow-sm flex items-center justify-center">
                <div className="w-[90%] h-[78%] rounded-full border border-gray-400 flex items-center justify-center">
                  <span className="text-gray-800 text-sm font-medium">
                    Nurse Station
                  </span>
                </div>
              </div>
            </section>
          </div>

          <div className="col-span-4">
            {/* Kosong / koridor (menjaga komposisi layout sesuai gambar) */}
            <div className="h-full" />
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 rounded-xl border bg-white/80 p-4">
          <h4 className="font-semibold text-sky-700 mb-2">Legenda</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 text-sm">
            <li className="flex items-center gap-2">
              <div className="w-16 h-8 border border-gray-700 rounded-sm bg-white relative">
                <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold">
                  12
                </span>
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
}
