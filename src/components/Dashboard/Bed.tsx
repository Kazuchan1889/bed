"use client";

import { useState, useRef, useEffect } from "react";

type BedStatus = "unassigned" | "assigned" | "repair";

type BedData = {
    status: BedStatus;
    nurse?: string;
    patient?: string;
    startDate?: string;
    endDate?: string;
    handler?: string;
    issue?: string;
};

export default function Bed() {
    const [rooms, setRooms] = useState(["Room 101", "Room 102", "Room 103"]);
    const [selectedRoom, setSelectedRoom] = useState(rooms[0]);
    // state untuk add room
    const [showAddRoomModal, setShowAddRoomModal] = useState(false);
    const [newRoomName, setNewRoomName] = useState("");
    const [newRoomBeds, setNewRoomBeds] = useState(1);




    // inisialisasi data bed
    const initialBeds: Record<string, Record<string, BedData>> = {
        "Room 101": {
            "Bed 1": { status: "unassigned" },
            "Bed 2": { status: "unassigned" },
            "Bed 3": { status: "unassigned" },
            "Bed 4": { status: "unassigned" },
        },
        "Room 102": {
            "Bed 1": { status: "unassigned" },
            "Bed 2": { status: "unassigned" },
        },
        "Room 103": {
            "Bed 1": { status: "unassigned" },
            "Bed 2": { status: "unassigned" },
            "Bed 3": { status: "unassigned" },
            "Bed 4": { status: "unassigned" },
            "Bed 5": { status: "unassigned" },
            "Bed 6": { status: "unassigned" },
        },
    };

    const [beds, setBeds] = useState(initialBeds);

    // state menu
    const [activeBed, setActiveBed] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    // modal states
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showRepairModal, setShowRepairModal] = useState(false);

    const [selectedBed, setSelectedBed] = useState<string | null>(null);

    // form assign
    const [form, setForm] = useState({
        nurse: "",
        patient: "",
        startDate: "",
        endDate: "",
    });

    // form repair
    const [repairForm, setRepairForm] = useState({
        handler: "",
        issue: "",
    });

    // update bed data
    const updateBed = (bed: string, data: BedData) => {
        setBeds((prev) => ({
            ...prev,
            [selectedRoom]: {
                ...prev[selectedRoom],
                [bed]: data,
            },
        }));
    };

    // warna bed
    const bedColor = (status: BedStatus) => {
        switch (status) {
            case "unassigned":
                return "bg-green-200";
            case "assigned":
                return "bg-red-200";
            case "repair":
                return "bg-yellow-200";
            default:
                return "bg-white";
        }
    };

    // auto close dropdown jika klik di luar
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setActiveBed(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Potong bed jadi grup 4 (2 col × 2 row)
  const chunkBeds = (arr: string[], size: number) => {
    return arr.reduce((acc: string[][], _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveBed(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    return (
        <div className="p-6 bg-white rounded-lg shadow flex flex-col gap-6">
            {/* Section 1 */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Select Room</h1>
                <button
                    onClick={() => setShowAddRoomModal(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-violet-500 text-white rounded hover:bg-violet-600"
                >
                    <span className="text-lg font-bold">+</span> Add Room
                </button>
            </div>


            {/* Section 2 */}
            <div className="flex flex-col gap-4">
                {/* Dropdown pilih room */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Room
                    </label>
                    <select
                        value={selectedRoom}
                        onChange={(e) => setSelectedRoom(e.target.value)}
                        className="w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                        {rooms.map((room) => (
                            <option key={room} value={room}>
                                {room}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Container bed */}
                <div className="p-6 border rounded-lg bg-gray-50">
                    <h2 className="font-semibold mb-4">{selectedRoom} Beds</h2>

                    <div className="space-y-8">
                        {chunkBeds(Object.keys(beds[selectedRoom]), 4).map(
                            (group, groupIndex) => (
                                <div
                                    key={groupIndex}
                                    className="grid grid-cols-2 grid-rows-2 gap-6"
                                >
                                    {group.map((bed) => (
                                        <div
                                            key={bed}
                                            className="relative flex flex-col items-center cursor-pointer"
                                            onClick={() => setActiveBed(bed)}
                                        >
                                            {/* SVG Bed */}
                                            <svg
                                                viewBox="0 0 512 512"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`w-24 h-24 ${bedColor(
                                                    beds[selectedRoom][bed].status
                                                )}`}
                                                fill="currentColor"
                                            >
                                                <path d="m496 320c0-15.581 0-282.497 0-296 0-8.836-7.163-16-16-16s-16 7.164-16 16v16h-416v-16c0-8.836-7.164-16-16-16s-16 7.164-16 16v296c-8.836 0-16 7.164-16 16v152c0 8.836 7.164 16 16 16h56c6.061 0 11.601-3.424 14.311-8.845l19.578-39.155h300.223l19.578 39.155c2.71 5.421 8.25 8.845 14.311 8.845h56c8.837 0 16-7.164 16-16v-152c-.001-8.836-7.164-16-16.001-16zm-32-91.833c-11.449-7.679-25.209-12.167-40-12.167h-56v-32c0-35.29-28.71-64-64-64h-96c-35.29 0-64 28.71-64 64v32h-56c-14.791 0-28.551 4.488-40 12.167v-156.167h416zm-128-12.167h-160v-32c0-17.645 14.355-32 32-32h96c17.645 0 32 14.355 32 32zm-288 72c0-22.056 17.944-40 40-40h336c22.056 0 40 17.944 40 40v32h-416zm432 184h-30.111l-19.578-39.155c-2.71-5.421-8.25-8.845-14.311-8.845h-320c-6.061 0-11.601 3.424-14.311 8.845l-19.578 39.155h-30.111v-120h448z"></path>
                                            </svg>

                                            <span className="mt-2 text-sm font-medium">{bed}</span>

                                            {/* Dropdown */}
                                            {activeBed === bed && (
                                                <div
                                                    ref={menuRef}
                                                    className="absolute top-full mt-2 right-0 bg-white shadow rounded border w-40 z-10"
                                                >
                                                    <button
                                                        disabled={
                                                            beds[selectedRoom][bed].status === "repair"
                                                        }
                                                        className={`block w-full text-left px-3 py-2 ${beds[selectedRoom][bed].status === "repair"
                                                                ? "text-gray-400 cursor-not-allowed"
                                                                : "hover:bg-violet-100"
                                                            }`}
                                                        onClick={() => {
                                                            if (
                                                                beds[selectedRoom][bed].status !== "repair"
                                                            ) {
                                                                setSelectedBed(bed);
                                                                setShowAssignModal(true);
                                                                setActiveBed(null);
                                                            }
                                                        }}
                                                    >
                                                        Assigned
                                                    </button>
                                                    <button
                                                        disabled={
                                                            beds[selectedRoom][bed].status === "repair"
                                                        }
                                                        className={`block w-full text-left px-3 py-2 ${beds[selectedRoom][bed].status === "repair"
                                                                ? "text-gray-400 cursor-not-allowed"
                                                                : "hover:bg-violet-100"
                                                            }`}
                                                        onClick={() => {
                                                            if (
                                                                beds[selectedRoom][bed].status !== "repair"
                                                            ) {
                                                                updateBed(bed, { status: "unassigned" });
                                                                setActiveBed(null);
                                                            }
                                                        }}
                                                    >
                                                        Un-assigned
                                                    </button>
                                                    <button
                                                        className="block w-full text-left px-3 py-2 hover:bg-violet-100"
                                                        onClick={() => {
                                                            setSelectedBed(bed);
                                                            setShowRepairModal(true);
                                                            setActiveBed(null);
                                                        }}
                                                    >
                                                        Repair
                                                    </button>
                                                    <button
                                                        className="block w-full text-left px-3 py-2 hover:bg-violet-100"
                                                        onClick={() => {
                                                            setSelectedBed(bed);
                                                            setShowDetailModal(true);
                                                            setActiveBed(null);
                                                        }}
                                                    >
                                                        Detail
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>


            {/* Modal Assign */}
            {showAssignModal && selectedBed && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-20">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Assign {selectedBed}</h2>

                        <form
                            className="space-y-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                updateBed(selectedBed, {
                                    status: "assigned",
                                    ...form,
                                });
                                setForm({ nurse: "", patient: "", startDate: "", endDate: "" });
                                setShowAssignModal(false);
                            }}
                        >
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Nama Perawat
                                </label>
                                <input
                                    type="text"
                                    value={form.nurse}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, nurse: e.target.value }))
                                    }
                                    className="w-full rounded border border-gray-300 p-2"
                                    placeholder="Masukkan nama perawat"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Nama Pasien
                                </label>
                                <input
                                    type="text"
                                    value={form.patient}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, patient: e.target.value }))
                                    }
                                    className="w-full rounded border border-gray-300 p-2"
                                    placeholder="Masukkan nama pasien"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Dari Tanggal
                                    </label>
                                    <input
                                        type="date"
                                        value={form.startDate}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, startDate: e.target.value }))
                                        }
                                        className="w-full rounded border border-gray-300 p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Sampai Tanggal
                                    </label>
                                    <input
                                        type="date"
                                        value={form.endDate}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, endDate: e.target.value }))
                                        }
                                        className="w-full rounded border border-gray-300 p-2"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                                    onClick={() => setShowAssignModal(false)}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded bg-violet-500 text-white hover:bg-violet-600"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Repair */}
            {showRepairModal && selectedBed && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-20">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Repair {selectedBed}</h2>

                        <form
                            className="space-y-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                updateBed(selectedBed, {
                                    status: "repair",
                                    ...repairForm,
                                });
                                setRepairForm({ handler: "", issue: "" });
                                setShowRepairModal(false);
                            }}
                        >
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Nama Handler
                                </label>
                                <input
                                    type="text"
                                    value={repairForm.handler}
                                    onChange={(e) =>
                                        setRepairForm((f) => ({ ...f, handler: e.target.value }))
                                    }
                                    className="w-full rounded border border-gray-300 p-2"
                                    placeholder="Masukkan nama handler"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Detail Kerusakan
                                </label>
                                <textarea
                                    value={repairForm.issue}
                                    onChange={(e) =>
                                        setRepairForm((f) => ({ ...f, issue: e.target.value }))
                                    }
                                    className="w-full rounded border border-gray-300 p-2"
                                    placeholder="Tuliskan detail kerusakan"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                                    onClick={() => setShowRepairModal(false)}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Add Room */}
            {showAddRoomModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-20">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Add New Room</h2>

                        <form
                            className="space-y-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!newRoomName.trim()) return;

                                // generate bed list
                                const newBeds: Record<string, BedData> = {};
                                for (let i = 1; i <= newRoomBeds; i++) {
                                    newBeds[`Bed ${i}`] = { status: "unassigned" };
                                }

                                setBeds((prev) => ({
                                    ...prev,
                                    [newRoomName]: newBeds,
                                }));

                                setRooms((prev) => [...prev, newRoomName]); // ✅ tambahin ke dropdown

                                setSelectedRoom(newRoomName);
                                setNewRoomName("");
                                setNewRoomBeds(1);
                                setShowAddRoomModal(false);
                            }}

                        >
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Room Name
                                </label>
                                <input
                                    type="text"
                                    value={newRoomName}
                                    onChange={(e) => setNewRoomName(e.target.value)}
                                    className="w-full rounded border border-gray-300 p-2"
                                    placeholder="e.g. Room 104"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Number of Beds
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    value={newRoomBeds}
                                    onChange={(e) => setNewRoomBeds(Number(e.target.value))}
                                    className="w-full rounded border border-gray-300 p-2"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                                    onClick={() => setShowAddRoomModal(false)}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded bg-violet-500 text-white hover:bg-violet-600"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* Modal Detail */}
            {showDetailModal && selectedBed && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-20">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">Detail {selectedBed}</h2>

                        <div className="space-y-2">
                            <p>
                                <strong>Status:</strong> {beds[selectedRoom][selectedBed].status}
                            </p>
                            <p>
                                <strong>Perawat:</strong>{" "}
                                {beds[selectedRoom][selectedBed].nurse || "-"}
                            </p>
                            <p>
                                <strong>Pasien:</strong>{" "}
                                {beds[selectedRoom][selectedBed].patient || "-"}
                            </p>
                            <p>
                                <strong>Mulai:</strong>{" "}
                                {beds[selectedRoom][selectedBed].startDate || "-"}
                            </p>
                            <p>
                                <strong>Selesai:</strong>{" "}
                                {beds[selectedRoom][selectedBed].endDate || "-"}
                            </p>
                            <p>
                                <strong>Handler:</strong>{" "}
                                {beds[selectedRoom][selectedBed].handler || "-"}
                            </p>
                            <p>
                                <strong>Kerusakan:</strong>{" "}
                                {beds[selectedRoom][selectedBed].issue || "-"}
                            </p>
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <button
                                type="button"
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                                onClick={() => setShowDetailModal(false)}
                            >
                                Tutup
                            </button>

                            {beds[selectedRoom][selectedBed].status === "repair" ? (
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                                    onClick={() => {
                                        updateBed(selectedBed, { status: "unassigned" });
                                        setShowDetailModal(false);
                                    }}
                                >
                                    Fixed
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded bg-violet-500 text-white hover:bg-violet-600"
                                    onClick={() => {
                                        setForm({
                                            nurse: beds[selectedRoom][selectedBed].nurse || "",
                                            patient: beds[selectedRoom][selectedBed].patient || "",
                                            startDate:
                                                beds[selectedRoom][selectedBed].startDate || "",
                                            endDate: beds[selectedRoom][selectedBed].endDate || "",
                                        });
                                        setShowDetailModal(false);
                                        setShowAssignModal(true);
                                    }}
                                >
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
