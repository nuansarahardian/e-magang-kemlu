import React, { useState } from "react";
import KelengkapanBerkas from "@/components/KelengkapanBerkas";
import PernyataanMagang from "@/components/PernyataanMagang";
import Swal from "sweetalert2";
import { useForm, usePage, router } from "@inertiajs/react";
import { FiArrowLeft } from "react-icons/fi";

const PendaftaranMagang = () => {
    const { profilMahasiswa, documents, posisiMagang } = usePage().props;
    const [currentPage, setCurrentPage] = useState(1);
    const [allItemsChecked, setAllItemsChecked] = useState(false);

    // Fungsi untuk mendapatkan tanggal saat ini dengan format d-m-Y H:i:s
    const getCurrentDateTime = () => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, "0");
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const year = now.getFullYear();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    };

    // Menggunakan useForm untuk menangani data dan proses pendaftaran
    const { data, setData, post, processing, errors } = useForm({
        posisi_magang_per_batch_id: posisiMagang.id,
        status: "mendaftar",
        tanggal_pendaftaran: getCurrentDateTime(), // Set ke format d-m-Y H:i:s
    });

    // Fungsi untuk konfirmasi sebelum kembali ke halaman sebelumnya
    const handleBack = () => {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Perubahan yang belum disimpan mungkin akan hilang.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, kembali",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.get("/posisi-magang"); // Arahkan ke halaman /posisi-magang
            }
        });
    };

    // Fungsi untuk mengirim formulir
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!allItemsChecked) {
            Swal.fire({
                icon: "warning",
                title: "Peringatan",
                text: "Harap centang semua pernyataan sebelum mendaftar.",
                confirmButtonText: "OK",
            });
            return;
        }
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
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
            {/* Tombol Kembali dengan Konfirmasi */}
            <button
                onClick={handleBack}
                className="flex items-center text-gray-700 hover:text-gray-900 mb-4"
            >
                <FiArrowLeft className="mr-2" />
                <span>Kembali</span>
            </button>

            <h2 className="text-3xl font-semibold mb-4 text-gray-800 text-center">
                Daftar Magang
            </h2>
            <p className="text-gray-600 mb-8 text-center">
                Pastikan seluruh informasi dan berkas di bawah ini sudah benar
                dan sesuai dengan data kamu ya.
            </p>

            {currentPage === 1 ? (
                <>
                    <KelengkapanBerkas
                        dataPribadi={profilMahasiswa}
                        documents={documents}
                    />
                    <div className="flex justify-end mt-8">
                        <button
                            onClick={() => setCurrentPage(2)}
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200 ease-in-out"
                        >
                            Selanjutnya
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="p-6 border border-blue-500 rounded-lg bg-blue-50">
                        <PernyataanMagang
                            onAllItemsChecked={setAllItemsChecked}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-8">
                        <button
                            onClick={() => setCurrentPage(1)}
                            className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition duration-200 ease-in-out"
                        >
                            Periksa Kembali
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!allItemsChecked || processing}
                            className={`px-6 py-3 rounded-lg transition duration-200 ease-in-out ${
                                allItemsChecked
                                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        >
                            {processing ? "Processing..." : "Ya, Simpan"}
                        </button>
                    </div>
                </>
            )}

            {errors && (
                <div className="text-red-500 mt-4">
                    {Object.values(errors).map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PendaftaranMagang;
