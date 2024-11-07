import React from "react";
import { usePage } from "@inertiajs/react";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function InformasiPribadi({ switchComponent }) {
    const { profilData } = usePage().props;

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
        switchComponent("editcv", 1);
    };

    const nama = profilData?.nama || "Tidak ada data";
    const email = profilData?.email || "Tidak ada data";
    const NIM = profilData?.NIM || "Tidak ada data";
    const jenisKelamin = profilData?.jenis_kelamin || "Tidak ada data";
    const alamatKTP = profilData?.alamat_KTP || "Tidak ada data";
    const tanggalLahir = formatTanggal(profilData?.tanggal_lahir);
    const alamatDomisili = profilData?.alamat_domisili || "Tidak ada data";
    const noTelepon = profilData?.no_telepon || "Tidak ada data";
    const kontakDarurat = profilData?.kontak_darurat || "Tidak ada data";
    const noAsuransi = profilData?.no_asuransi || "Tidak ada data";

    return (
        <div className="px-3">
            <div className="flex items-center justify-between mb-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Data Pribadi
                </h3>
                <button
                    type="button"
                    onClick={handleEditClick}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <PencilIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 border-b pb-4 sm:pb-6 border-gray-300">
                Pastikan data pribadi benar untuk mempermudah proses pendaftaran
            </p>
            <div className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            NIM
                        </label>
                        <p className="text-sm sm:text-lg text-gray-700">
                            {NIM}
                        </p>
                    </div>

                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Nama Lengkap
                        </label>
                        <p className="text-sm sm:text-lg text-gray-700">
                            {nama}
                        </p>
                    </div>

                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Email
                        </label>
                        <p className="text-sm sm:text-lg text-gray-700">
                            {email}
                        </p>
                    </div>

                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Jenis Kelamin
                        </label>
                        <p className="text-sm sm:text-lg text-gray-700">
                            {jenisKelamin}
                        </p>
                    </div>

                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Tanggal Lahir
                        </label>
                        <p className="text-sm sm:text-lg text-gray-700">
                            {tanggalLahir}
                        </p>
                    </div>

                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Alamat Sesuai KTP
                        </label>
                        <p className="text-sm sm:text-lg text-gray-700">
                            {alamatKTP}
                        </p>
                    </div>

                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Alamat Domisili
                        </label>
                        <p className="text-sm sm:text-lg text-gray-700">
                            {alamatDomisili}
                        </p>
                    </div>

                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Nomor Telepon
                        </label>
                        <p className="text-sm sm:text-lg text-gray-700">
                            {noTelepon}
                        </p>
                    </div>

                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Kontak Darurat
                        </label>
                        <p className="text-sm sm:text-lg text-gray-700">
                            {kontakDarurat}
                        </p>
                    </div>

                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Nomor Asuransi
                        </label>
                        <p className="text-sm sm:text-lg text-gray-700">
                            {noAsuransi}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
