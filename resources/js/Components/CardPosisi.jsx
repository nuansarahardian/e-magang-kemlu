import React, { useState } from "react";
import { usePage } from "@inertiajs/react";
import {
    ChevronDownIcon,
    ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

export default function CardPosisi({ setSelectedPosition }) {
    const { props } = usePage(); // Mengambil data dari backend melalui Inertia
    const { positions = [] } = props; // Default ke array kosong jika tidak ada data

    const [selectedBatch, setSelectedBatch] = useState("Semua Batch");
    const [selectedIssue, setSelectedIssue] = useState("Semua Isu");

    // Data filter untuk Batch dan Isu dari posisi yang ada
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

    // Filter posisi berdasarkan batch dan isu
    const filteredPositions = positions.filter((position) => {
        const matchBatch =
            selectedBatch === "Semua Batch" ||
            position.nama_batch === selectedBatch;
        const matchIssue =
            selectedIssue === "Semua Isu" ||
            position.nama_posisi === selectedIssue;
        return matchBatch && matchIssue;
    });

    return (
        <div className="w-full h-full overflow-y-auto rounded-lg">
            <h2 className="text-[24px] font-extrabold mb-6 text-[#162360]">
                Posisi Magang
            </h2>

            {/* Filter Controls */}
            <div className="flex justify-between mb-6 gap-4">
                {/* Filter Batch */}
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

                {/* Filter Isu */}
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

            {/* Wrapper untuk card */}
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
                            onClick={() => setSelectedPosition(position)}
                            className="cursor-pointer border border-gray-300 rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
                        >
                            <h3 className="text-base font-bold text-black truncate mb-1">
                                {position.nama_posisi || "Tidak Diketahui"}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                                {position.nama_batch || "Tidak Diketahui"}
                            </p>

                            {/* Additional Info */}
                            <div className="space-y-1 text-[#86858D] text-sm">
                                <div className="flex items-center">
                                    <span>Kuota: {position.kuota} Orang</span>
                                </div>
                                <div className="flex items-center">
                                    <span>
                                        Jumlah Pendaftar:{" "}
                                        {position.jumlah_pendaftar}
                                    </span>
                                </div>
                                <div className="flex items-center">
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
