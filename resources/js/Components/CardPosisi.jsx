import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import {
    ChevronDownIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export default function CardPosisi({ setSelectedPosition }) {
    const { props } = usePage();
    const { positions = [] } = props;

    const [selectedBatch, setSelectedBatch] = useState("Semua Batch");
    const [selectedIssue, setSelectedIssue] = useState("Semua Isu");
    const [activePosition, setActivePosition] = useState(null); // State untuk posisi yang dipilih

    const batches = [
        "Semua Batch",
        ...new Set(positions.map((pos) => pos.nama_batch || "Tidak Diketahui")),
    ];
    const issues = [
        "Semua Isu",
        ...new Set(
            positions.map((pos) => pos.nama_posisi || "Tidak Diketahui")
        ),
    ];

    const filteredPositions = positions.filter((position) => {
        const matchBatch =
            selectedBatch === "Semua Batch" ||
            position.nama_batch === selectedBatch;
        const matchIssue =
            selectedIssue === "Semua Isu" ||
            position.nama_posisi === selectedIssue;
        return matchBatch && matchIssue;
    });

    const handleCardClick = (position) => {
        setActivePosition(position); // Set posisi yang dipilih
        setSelectedPosition(position); // Panggil callback dengan posisi yang dipilih
    };

    return (
        <div className="w-full h-full overflow-y-auto rounded-lg">
            <h2 className="text-[24px] font-extrabold mb-6 text-[#162360]">
                Posisi Magang
            </h2>

            <div className="flex justify-between mb-6 gap-4">
                <div className="relative w-full lg:w-1/2">
                    <select
                        className="appearance-none border border-gray-300 rounded-lg p-3 text-sm focus:ring focus:ring-blue-500 focus:outline-none w-full shadow-sm"
                        value={selectedBatch}
                        onChange={(e) => setSelectedBatch(e.target.value)}
                    >
                        {batches.map((batch, index) => (
                            <option key={index} value={batch}>
                                {batch}
                            </option>
                        ))}
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>

                <div className="relative w-full lg:w-1/2">
                    <select
                        className="appearance-none border border-gray-300 rounded-lg p-3 text-sm focus:ring focus:ring-blue-500 focus:outline-none w-full shadow-sm"
                        value={selectedIssue}
                        onChange={(e) => setSelectedIssue(e.target.value)}
                    >
                        {issues.map((issue, index) => (
                            <option key={index} value={issue}>
                                {issue}
                            </option>
                        ))}
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
            </div>

            <div className="max-h-[320px] md:max-h-[640px] overflow-y-auto space-y-4">
                {filteredPositions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-16">
                        <ExclamationCircleIcon className="h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-lg font-semibold text-gray-600">
                            Maaf, posisi yang Anda cari tidak ditemukan.
                        </p>
                        <button
                            onClick={() => {
                                setSelectedBatch("Semua Batch");
                                setSelectedIssue("Semua Isu");
                            }}
                            className="mt-4 px-6 py-2 bg-[#162360] text-white rounded-lg hover:bg-[#0F245B] focus:outline-none transition-colors duration-300"
                        >
                            Reset Filter
                        </button>
                    </div>
                ) : (
                    filteredPositions.map((position, index) => (
                        <div
                            key={index}
                            onClick={() => handleCardClick(position)}
                            className={`cursor-pointer border rounded-lg p-6 flex flex-col justify-between shadow-sm hover:!bg-slate-200 transition-shadow duration-300 bg-gradient-to-br from-white to-blue-50/10 ${
                                activePosition === position
                                    ? "border-blue-500 !bg-blue-100"
                                    : "border-gray-300"
                            }`}
                        >
                            <h3 className="text-lg font-bold text-[#162360] mb-1">
                                {position.nama_posisi || "Tidak Diketahui"}
                            </h3>
                            <p className="text-sm text-gray-900 mb-2">
                                {position.nama_batch || "Tidak Diketahui"}
                            </p>

                            <div className="space-y-3 text-[#86858D] text-sm">
                                <div className="grid grid-cols-2 gap-x-4">
                                    <div className="flex flex-col gap-y-2 ">
                                        <span>Kuota</span>
                                        <span>Jumlah Pendaftar</span>
                                    </div>

                                    <div className="flex flex-col gap-y-2 font-medium text-black">
                                        <span>{position.kuota} Mahasiswa</span>
                                        <span>
                                            {position.jumlah_pendaftar}{" "}
                                            Mahasiswa
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-2 text-gray-600 text-sm font-medium">
                                    <span>
                                        {position.tanggal_mulai} -{" "}
                                        {position.tanggal_berakhir}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
