import React from "react";
import { usePage } from "@inertiajs/react";
import { PencilIcon } from "@heroicons/react/24/outline"; // Import ikon dari Heroicons

export default function InformasiPribadi({ switchComponent }) {
    // Mengambil data dari Inertia page props
    const { profilData } = usePage().props;
    // Format tanggal menjadi lebih user-friendly
    const formatTanggal = (tanggal) => {
        if (!tanggal) return "Tidak ada data";
        const date = new Date(tanggal);
        return date.toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const handleEditClick = () => {
        switchComponent("editcv", 1); // Panggil fungsi untuk mengaktifkan EditCV
    };

    // Menangani kondisi di mana `profilData` mungkin null
    const nama = profilData?.nama || "Tidak ada data";
    const email = profilData?.email || "Tidak ada data";
    const NIM = profilData?.NIM || "Tidak ada data";
    const jenisKelamin = profilData?.jenis_kelamin || "Tidak ada data";
    const alamatKTP = profilData?.alamat_KTP || "Tidak ada data";
    const tanggalLahir = formatTanggal(profilData?.tanggal_lahir);
    const alamatDomisili = profilData?.alamat_domisili || "Tidak ada data";
    const noTelepon = profilData?.no_telepon || "Tidak ada data";

    return (
        <div className="px-3  ">
            <div className="flex items-center justify-between mb-1">
                <h3 className="text-2xl font-bold text-gray-800">
                    Data Pribadi
                </h3>
                <button
                    type="button"
                    onClick={handleEditClick}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <PencilIcon className="w-6 h-6" />
                </button>
            </div>
            <p className="text-gray-600 mb-6 border-b pb-6 border-gray-300">
                Pastikan data pribadi benar untuk mempermudah proses pendaftaran
            </p>
            <div className="space-y-8 ">
                <div className="grid grid-cols-2 gap-6">
                    {/* NIM */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">
                            NIM
                        </label>
                        <p className="text-lg text-gray-700">{NIM}</p>
                    </div>

                    {/* Nama Lengkap */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">
                            Nama Lengkap
                        </label>
                        <p className="text-lg text-gray-700">{nama}</p>
                    </div>

                    {/* Email */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">
                            Email
                        </label>
                        <p className="text-lg text-gray-700">{email}</p>
                    </div>

                    {/* Jenis Kelamin */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">
                            Jenis Kelamin
                        </label>
                        <p className="text-lg text-gray-700">{jenisKelamin}</p>
                    </div>
                    {/* Jenis Kelamin */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">
                            Tanggal Lahir
                        </label>
                        <p className="text-lg text-gray-700">{tanggalLahir}</p>
                    </div>

                    {/* Alamat Sesuai KTP */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">
                            Alamat Sesuai KTP
                        </label>
                        <p className="text-lg text-gray-700">{alamatKTP}</p>
                    </div>

                    {/* Alamat Domisili */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">
                            Alamat Domisili
                        </label>
                        <p className="text-lg text-gray-700">
                            {alamatDomisili}
                        </p>
                    </div>

                    {/* Nomor Telepon */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">
                            Nomor Telepon
                        </label>
                        <p className="text-lg text-gray-700">{noTelepon}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
