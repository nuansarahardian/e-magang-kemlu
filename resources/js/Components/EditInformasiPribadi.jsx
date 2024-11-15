import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { router } from "@inertiajs/react";
import moment from "moment";
import Swal from "sweetalert2";

export default function EditInformasiPribadi({
    profilData,
    formData,
    setFormData,
    handleChange,
    switchComponent,
}) {
    useEffect(() => {
        if (profilData) {
            setFormData({
                namaLengkap: profilData.nama || "",
                NIM: profilData.NIM || "",
                tanggalLahir:
                    profilData.tanggal_lahir &&
                    moment(
                        profilData.tanggal_lahir,
                        moment.ISO_8601,
                        true
                    ).isValid()
                        ? moment(profilData.tanggal_lahir).format("DD-MM-YYYY")
                        : "",
                jenisKelamin: profilData.jenis_kelamin || "",
                tempatLahir: profilData.tempat_lahir || "",
                alamatKTP: profilData.alamat_KTP || "",
                alamatDomisili: profilData.alamat_domisili || "",
                noHp: profilData.no_telepon || "",
                uploadFoto: profilData.pas_foto || "",
                kontakDarurat: profilData.kontak_darurat || "",
                noAsuransi: profilData.no_asuransi || "",
            });
        } else {
            setFormData({
                namaLengkap: "",
                NIM: "",
                tanggalLahir: "",
                tempatLahir: "",
                jenisKelamin: "",
                alamatKTP: "",
                alamatDomisili: "",
                noHp: "",
                uploadFoto: "",
                kontakDarurat: "",
                noAsuransi: "",
            });
        }
    }, [profilData]);

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            tanggalLahir: date ? moment(date).format("DD-MM-YYYY") : "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedTanggalLahir = formData.tanggalLahir
            ? moment(formData.tanggalLahir, "DD-MM-YYYY").format("DD-MM-YYYY")
            : "";

        const data = new FormData();
        data.append("namaLengkap", formData.namaLengkap || "");
        data.append("NIM", formData.NIM || "");
        data.append("tanggalLahir", formattedTanggalLahir);
        data.append("tempatLahir", formData.tempatLahir || "");
        data.append("jenisKelamin", formData.jenisKelamin || "");
        data.append("alamatKTP", formData.alamatKTP || "");
        data.append("noHp", formData.noHp || "");
        data.append("alamatDomisili", formData.alamatDomisili || "");
        data.append("kontakDarurat", formData.kontakDarurat || "");
        data.append("noAsuransi", formData.noAsuransi || "");

        if (formData.uploadFoto instanceof File) {
            data.append("uploadFoto", formData.uploadFoto);
        }

        const routeName = profilData
            ? "profil-mahasiswa.update"
            : "profil-mahasiswa.store";

        router.post(route(routeName), data, {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Data berhasil disimpan!",
                    confirmButtonText: "OK",
                }).then(() => {
                    window.location.reload();
                });
            },
            onError: (errors) => {
                const errorMessages = Object.values(errors)
                    .flat()
                    .join("<br/>");

                Swal.fire({
                    icon: "error",
                    title: "Gagal Menyimpan Data!",
                    html: errorMessages,
                    confirmButtonText: "OK",
                });
            },
        });
    };

    const handleCancel = () => {
        switchComponent("cv");
    };
    const [showExample, setShowExample] = useState(false);
    return (
        <div className="px-3">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
                Edit Informasi Pribadi
            </h3>
            <p className="sm:text-sm mb-3 sm:mb-4 text-xs text-yellow-600 bg-yellow-100/50 rounded-xl text-center p-2 border border-1 border-yellow-400">
                Pastikan data diisi dengan lengkap dan benar, karena informasi
                ini akan dipakai untuk berbagai keperluan administrasi.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Nama Lengkap */}
                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Nama Lengkap <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="namaLengkap"
                            value={formData.namaLengkap || ""}
                            onChange={handleChange}
                            placeholder="Masukkan Nama Lengkap"
                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* NIM */}
                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            NIM <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="NIM"
                            value={formData.NIM || ""}
                            onChange={handleChange}
                            placeholder="Masukkan NIM"
                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {/* NIM */}
                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Tempat Lahir <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="tempatLahir"
                            value={formData.tempatLahir || ""}
                            onChange={handleChange}
                            placeholder="Masukkan Tempat Lahir"
                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Tanggal Lahir */}
                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Tanggal Lahir{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <DatePicker
                            selected={
                                formData.tanggalLahir
                                    ? moment(
                                          formData.tanggalLahir,
                                          "DD-MM-YYYY"
                                      ).toDate()
                                    : null
                            }
                            onChange={handleDateChange}
                            dateFormat="dd-MM-yyyy"
                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholderText="Pilih Tanggal Lahir"
                            required
                            showYearDropdown
                        />
                    </div>

                    {/* Jenis Kelamin */}
                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Jenis Kelamin{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="jenisKelamin"
                            value={formData.jenisKelamin || ""}
                            onChange={handleChange}
                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Pilih Jenis Kelamin</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>

                    {/* Alamat Sesuai KTP */}
                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Alamat Sesuai KTP{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="alamatKTP"
                            value={formData.alamatKTP || ""}
                            onChange={handleChange}
                            placeholder="Masukkan Alamat Sesuai KTP"
                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Alamat Domisili */}
                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Alamat Domisili (Opsional)
                        </label>
                        <textarea
                            name="alamatDomisili"
                            value={formData.alamatDomisili || ""}
                            onChange={handleChange}
                            placeholder="Masukkan Alamat Domisili"
                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Nomor Handphone */}
                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Nomor Handphone{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="noHp"
                            value={formData.noHp || ""}
                            onChange={handleChange}
                            placeholder="Masukkan Nomor Handphone"
                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Kontak Darurat */}
                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Nomor Kontak Darurat
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="kontakDarurat"
                            value={formData.kontakDarurat || ""}
                            onChange={handleChange}
                            placeholder="Masukkan Nomor Kontak Darurat"
                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Nomor Asuransi */}
                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700">
                            Nomor Asuransi/BPJS
                        </label>
                        <input
                            type="text"
                            name="noAsuransi"
                            value={formData.noAsuransi || ""}
                            onChange={handleChange}
                            placeholder="Masukkan Nomor Asuransi"
                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Upload Foto 3x4 */}
                    <div className="grid gap-y-2">
                        <div className="flex items-center gap-2">
                            <label className="text-sm sm:text-lg font-semibold text-gray-700">
                                Upload Pas Foto 3x4
                                <span className="text-red-500">*</span>
                            </label>
                            <button
                                type="button"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => setShowExample(true)} // ini untuk membuka modal atau tooltip contoh foto
                            >
                                <span className="text-lg font-semibold">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                        />
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <p className="text-slate-400 text-xs sm:text-sm">
                            Foto formal dengan background warna biru.
                        </p>
                        <input
                            type="file"
                            name="uploadFoto"
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    uploadFoto: e.target.files[0],
                                })
                            }
                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        />

                        {/* Modal atau tooltip contoh foto */}
                        {showExample && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs text-center">
                                    <p className="text-gray-700 font-semibold mb-2">
                                        Contoh Foto 3x4
                                    </p>
                                    <img
                                        src="storage/images/pasfoto.jpg"
                                        alt="Contoh Foto 3x4"
                                        className="w-full rounded-lg mb-4"
                                    />
                                    <button
                                        onClick={() => setShowExample(false)} // ini untuk menutup modal
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        Tutup
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-end space-x-2 sm:space-x-4 mt-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-[#5E7ADD]/20 text-[#162360] py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-[#5E7ADD] transition font-bold w-full sm:w-auto"
                    >
                        Batalkan
                    </button>
                    <button
                        type="submit"
                        className="bg-[#162360] text-white hover:bg-blue-800 py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition font-bold w-full sm:w-auto"
                    >
                        Simpan Perubahan
                    </button>
                </div>
            </form>
        </div>
    );
}
