import React from "react";
import { router, usePage } from "@inertiajs/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/24/outline"; // Pastikan menggunakan Heroicons

export default function InformasiAkademik({ switchComponent }) {
    const { profilData } = usePage().props; // Ganti dengan 'profilData'
    const handleEditClick = () => {
        switchComponent("editcv", 2); // 2 adalah indeks tab untuk Edit Informasi Akademik
    };

    return (
        <div className="px-3">
            <div className="flex items-center justify-between mb-1">
                <h3 className="text-2xl font-bold text-gray-800">
                    Informasi Akademik
                </h3>
                <button
                    type="button"
                    onClick={handleEditClick}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <PencilIcon className="w-6 h-6" />
                </button>
            </div>
            <p className="text-gray-600  mb-8 border-b pb-6 border-gray-300">
                Pastikan data akademik benar untuk mempermudah proses
                pendaftaran
            </p>
            <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                    {/* Universitas */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">
                            Universitas
                        </label>
                        <p className="text-lg text-gray-700">
                            {profilData.universitas || "Tidak ada data"}
                        </p>
                    </div>

                    {/* Fakultas */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">
                            Fakultas
                        </label>
                        <p className="text-lg text-gray-700">
                            {profilData.fakultas || "Tidak ada data"}
                        </p>
                    </div>

                    {/* Jurusan */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">
                            Jurusan
                        </label>
                        <p className="text-lg text-gray-700">
                            {profilData.jurusan || "Tidak ada data"}
                        </p>
                    </div>

                    {/* Semester */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">
                            Semester
                        </label>
                        <p className="text-lg text-gray-700">
                            {profilData.semester || "Tidak ada data"}
                        </p>
                    </div>

                    {/* IPK */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">
                            IPK
                        </label>
                        <p className="text-lg text-gray-700">
                            {profilData.IPK || "Tidak ada data"}{" "}
                            {/* Ganti 'ipk' dengan 'IPK' */}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
