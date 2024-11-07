import React from "react";
import { usePage } from "@inertiajs/react";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function InformasiAkademik({ switchComponent }) {
    const { profilData } = usePage().props;

    const handleEditClick = () => {
        switchComponent("editcv", 2); // Indeks tab untuk Edit Informasi Akademik
    };

    return (
        <div className="px-3">
            <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Informasi Akademik
                </h3>
                <button
                    type="button"
                    onClick={handleEditClick}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <PencilIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-8 border-b pb-4 sm:pb-6 border-gray-300">
                Pastikan data akademik benar untuk mempermudah proses
                pendaftaran
            </p>
            <div className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Universitas */}
                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Universitas
                        </label>
                        <p className="text-sm sm:text-lg text-gray-700">
                            {profilData.universitas || "Tidak ada data"}
                        </p>
                    </div>

                    {/* Fakultas */}
                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Fakultas
                        </label>
                        <p className="text-sm sm:text-lg text-gray-700">
                            {profilData.fakultas || "Tidak ada data"}
                        </p>
                    </div>

                    {/* Jurusan */}
                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Jurusan
                        </label>
                        <p className="text-sm sm:text-lg text-gray-700">
                            {profilData.jurusan || "Tidak ada data"}
                        </p>
                    </div>

                    {/* Semester */}
                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Semester
                        </label>
                        <p className="text-sm sm:text-lg text-gray-700">
                            {profilData.semester || "Tidak ada data"}
                        </p>
                    </div>

                    {/* IPK */}
                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            IPK
                        </label>
                        <p className="text-sm sm:text-lg text-gray-700">
                            {profilData.IPK || "Tidak ada data"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
