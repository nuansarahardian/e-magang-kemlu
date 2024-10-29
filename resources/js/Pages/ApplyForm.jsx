import React from "react";
import { Head, usePage, Link } from "@inertiajs/react";

export default function ApplyForm() {
    // Mengambil data dari Inertia props
    const { posisiMagangPerBatch, profilMahasiswa } = usePage().props;

    return (
        <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
            <Head title="Form Pendaftaran" />

            <h1 className="text-2xl font-bold mb-4">Form Pendaftaran Magang</h1>

            {/* Periksa apakah data posisiMagangPerBatch dan subdatanya tersedia */}
            {posisiMagangPerBatch &&
            posisiMagangPerBatch.posisiMagang &&
            posisiMagangPerBatch.batch ? (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">
                        Informasi Posisi Magang
                    </h2>
                    <p>
                        <strong>Posisi:</strong>{" "}
                        {posisiMagangPerBatch.posisiMagang.nama_posisi}
                    </p>
                    <p>
                        <strong>Batch:</strong>{" "}
                        {posisiMagangPerBatch.batch.nama_batch}
                    </p>
                    <p>
                        <strong>Durasi:</strong>{" "}
                        {posisiMagangPerBatch.batch.tanggal_mulai} -{" "}
                        {posisiMagangPerBatch.batch.tanggal_berakhir}
                    </p>
                    <p>
                        <strong>Kuota:</strong> {posisiMagangPerBatch.kuota}{" "}
                        Orang
                    </p>
                    <p>
                        <strong>Jumlah Pendaftar:</strong>{" "}
                        {posisiMagangPerBatch.jumlah_pendaftar} Orang
                    </p>
                </div>
            ) : (
                <p>Informasi posisi magang tidak tersedia.</p>
            )}

            {/* Informasi Profil Mahasiswa */}
            {profilMahasiswa ? (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">
                        Informasi Mahasiswa
                    </h2>
                    <p>
                        <strong>NIM:</strong> {profilMahasiswa.NIM}
                    </p>
                    <p>
                        <strong>Nama:</strong> {profilMahasiswa.user.name}
                    </p>
                    <p>
                        <strong>Universitas:</strong>{" "}
                        {profilMahasiswa.universitas}
                    </p>
                    <p>
                        <strong>Fakultas:</strong> {profilMahasiswa.fakultas}
                    </p>
                    <p>
                        <strong>Jurusan:</strong> {profilMahasiswa.jurusan}
                    </p>
                    <p>
                        <strong>Semester:</strong> {profilMahasiswa.semester}
                    </p>
                </div>
            ) : (
                <p>Informasi mahasiswa tidak tersedia.</p>
            )}

            {/* Formulir Pengiriman */}
            <form method="post" action={`/apply/${posisiMagangPerBatch?.id}`}>
                <input type="hidden" name="nim" value={profilMahasiswa?.NIM} />

                <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
                >
                    Daftar Sekarang
                </button>
            </form>

            {/* Tautan Kembali */}
            <Link
                href="/"
                className="mt-6 inline-block text-blue-500 hover:text-blue-700"
            >
                Kembali ke Halaman Utama
            </Link>
        </div>
    );
}
