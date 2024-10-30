import React, { useState } from "react";
import KelengkapanBerkas from "@/components/KelengkapanBerkas";
import PernyataanMagang from "@/components/PernyataanMagang";
import Swal from "sweetalert2";
import { useForm } from "@inertiajs/react";

function PendaftaranMagang({ posisiMagang }) {
    const [currentPage, setCurrentPage] = useState(1);

    // Menggunakan useForm untuk menangani data dan proses pendaftaran
    const { data, setData, post, processing, errors } = useForm({
        posisi_magang_per_batch_id: posisiMagang.id,
        status: "mendaftar",
        tanggal_pendaftaran: new Date().toISOString().slice(0, 10), // Tanggal saat ini
    });

    const nextPage = () => setCurrentPage(2);
    const previousPage = () => setCurrentPage(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("pendaftaran.store"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Pendaftaran Berhasil!",
                    text: "Anda berhasil mendaftar ke posisi magang ini.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            },
            onError: () => {
                Swal.fire({
                    title: "Pendaftaran Gagal",
                    text: "Terjadi kesalahan dalam pendaftaran. Silakan coba lagi.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            },
        });
    };

    return (
        <div className="max-w-2xl mx-auto p-8">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800 text-center">
                Daftar Magang
            </h2>
            <p className="text-gray-600 mb-8 text-center">
                Pastikan seluruh informasi dan berkas di bawah ini sudah benar
                dan sesuai dengan data kamu ya.
            </p>

            {/* Halaman pertama: Kelengkapan Berkas */}
            {currentPage === 1 ? (
                <>
                    <KelengkapanBerkas />
                    <div className="flex justify-end mt-8">
                        <button
                            onClick={nextPage}
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200 ease-in-out"
                        >
                            Selanjutnya
                        </button>
                    </div>
                </>
            ) : (
                // Halaman kedua: Pernyataan Magang dan tombol daftar
                <>
                    <PernyataanMagang />
                    <div className="flex justify-between items-center mt-8">
                        <button
                            onClick={previousPage}
                            className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition duration-200 ease-in-out"
                        >
                            Kembali
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={processing}
                            className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition duration-200 ease-in-out"
                        >
                            {processing ? "Processing..." : "Daftar"}
                        </button>
                    </div>
                </>
            )}

            {/* Tampilkan pesan error jika ada */}
            {errors && (
                <div className="text-red-500 mt-4">
                    {Object.values(errors).map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PendaftaranMagang;
