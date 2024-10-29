import React, { useEffect } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from "sweetalert2";

export default function PendaftaranMagang({ posisiMagang }) {
    const { data, setData, post, processing, errors } = useForm({
        posisi_magang_per_batch_id: posisiMagang.id,
        status: "mendaftar",
        tanggal_pendaftaran: new Date().toISOString().slice(0, 10), // Tanggal saat ini
    });

    const { flash } = usePage().props;

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

    useEffect(() => {
        if (flash && flash.success) {
            Swal.fire({
                title: "Pendaftaran Berhasil!",
                text: flash.success,
                icon: "success",
                confirmButtonText: "OK",
            });
        } else if (flash && flash.error) {
            Swal.fire({
                title: "Pendaftaran Gagal",
                text: flash.error,
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    }, [flash]);

    return (
        <>
            {" "}
            <Head title="Formulir Pendaftaran Magang" />
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold mb-6">
                    Formulir Pendaftaran Magang
                </h1>

                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        {posisiMagang.posisi_magang.nama_posisi}
                    </h2>
                    <p className="text-gray-700 mb-2">
                        Batch: {posisiMagang.batch.nama_batch}
                    </p>
                    <p className="text-gray-700 mb-2">
                        Durasi: {posisiMagang.batch.tanggal_mulai} -{" "}
                        {posisiMagang.batch.tanggal_berakhir}
                    </p>
                    <p className="text-gray-700 mb-2">
                        Kuota: {posisiMagang.kuota} Orang
                    </p>
                    <p className="text-gray-700 mb-2">
                        Jumlah Pendaftar: {posisiMagang.jumlah_pendaftar} Orang
                    </p>
                    <p className="text-gray-700 mt-4">
                        {posisiMagang.posisi_magang.deskripsi}
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded-lg p-6"
                >
                    <input
                        type="hidden"
                        name="posisi_magang_per_batch_id"
                        value={data.posisi_magang_per_batch_id}
                    />
                    <input type="hidden" name="status" value={data.status} />
                    <input
                        type="hidden"
                        name="tanggal_pendaftaran"
                        value={data.tanggal_pendaftaran}
                    />

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                    >
                        {processing ? "Processing..." : "Daftar Sekarang"}
                    </button>

                    {errors && (
                        <div className="text-red-500 mt-4">
                            {Object.values(errors).map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )}
                </form>
            </div>
        </>
    );
}
