import React, { useEffect } from "react";
import DatePicker from "react-datepicker"; // Pastikan Anda telah menginstal react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import style datepicker
import { router } from "@inertiajs/react"; // Import router dari Inertia.js
import moment from "moment"; // Pastikan moment.js sudah diinstal
import Swal from "sweetalert2"; // Import SweetAlert2

export default function EditInformasiPribadi({
    profilData,
    formData,
    setFormData,
    handleChange,
    switchComponent,
}) {
    // Inisialisasi data form dengan data dari profilData saat pertama kali dimuat
    useEffect(() => {
        console.log(profilData);
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
                        : "", // Gunakan nilai kosong jika tidak valid
                jenisKelamin: profilData.jenis_kelamin || "",
                alamatKTP: profilData.alamat_KTP || "",
                alamatDomisili: profilData.alamat_domisili || "",
                noHp: profilData.no_telepon || "",
                uploadFoto: profilData.pas_foto || "",
                kontakDarurat: profilData.kontak_darurat || "",
                noAsuransi: profilData.no_asuransi || "",
            });
        } else {
            // Jika profilData tidak ada (mode create), set nilai default kosong
            setFormData({
                namaLengkap: "",
                NIM: "",
                tanggalLahir: "",
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
            tanggalLahir: date ? moment(date).format("DD-MM-YYYY") : "", // Pastikan format tetap "DD-MM-YYYY"
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
        switchComponent("cv"); // Kembali ke komponen CurriculumVitae
    };

    return (
        <div className="px-3">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Informasi Pribadi
            </h3>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                    {/* Nama Lengkap */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700 flex">
                            Nama Lengkap <p className="text-red-500 ml-1">*</p>
                        </label>
                        <input
                            type="text"
                            name="namaLengkap"
                            value={formData.namaLengkap || ""}
                            onChange={handleChange}
                            placeholder="Masukkan Nama Lengkap"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* NIM */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700 flex">
                            NIM <p className="text-red-500 ml-1">*</p>
                        </label>
                        <input
                            type="text"
                            name="NIM"
                            value={formData.NIM || ""}
                            onChange={handleChange}
                            placeholder="Masukkan NIM"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Tanggal Lahir */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700 flex">
                            Tanggal Lahir <p className="text-red-500 ml-1">*</p>
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
                            dateFormat="dd-MM-yyyy" // Gunakan format yang kompatibel
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholderText="Pilih Tanggal Lahir"
                            required
                        />
                    </div>

                    {/* Jenis Kelamin */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700 flex">
                            Jenis Kelamin <p className="text-red-500 ml-1">*</p>
                        </label>
                        <select
                            name="jenisKelamin"
                            value={formData.jenisKelamin || ""}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Pilih Jenis Kelamin</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>

                    {/* Alamat Sesuai KTP */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700 flex">
                            Alamat Sesuai KTP
                            <p className="text-red-500 ml-1">*</p>
                        </label>
                        <textarea
                            type="text"
                            name="alamatKTP"
                            value={formData.alamatKTP || ""}
                            onChange={handleChange}
                            placeholder="Masukkan Alamat Sesuai KTP"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Alamat Domisili (Opsional) */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">
                            Alamat Domisili (Opsional)
                        </label>
                        <textarea
                            name="alamatDomisili"
                            value={formData.alamatDomisili || ""}
                            onChange={handleChange}
                            placeholder="Masukkan Alamat Domisili"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Nomor Handphone */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700 flex">
                            Nomor Handphone
                            <p className="text-red-500 ml-1">*</p>
                        </label>
                        <input
                            type="text"
                            name="noHp"
                            value={formData.noHp || ""}
                            onChange={handleChange}
                            placeholder="Masukkan Nomor Handphone"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700 flex">
                            Nomor Kontak Darurat
                        </label>
                        <input
                            type="text"
                            name="kontakDarurat"
                            value={formData.kontakDarurat || ""}
                            onChange={handleChange}
                            placeholder="Masukkan Nomor Handphone"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700 flex">
                            Nomor Asuransi
                        </label>
                        <input
                            type="text"
                            name="noAsuransi"
                            value={formData.noAsuransi || ""}
                            onChange={handleChange}
                            placeholder="Masukkan Nomor Handphone"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {/* Upload Foto 3x4 */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700 flex">
                            Upload Pas Foto 3x4
                            <p className="text-red-500 ml-1*"></p>
                        </label>
                        <p className="text-slate-400 text-sm ml-1">
                            Foto formal dengan background berwarna merah
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    {/* Tombol Batalkan */}
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button" // Ubah menjadi "button" agar tidak melakukan submit
                            onClick={handleCancel} // Panggil fungsi handleCancel untuk kembali ke CurriculumVitae
                            className="bg-[#5E7ADD]/20 text-[#162360] py-3 px-6 rounded-lg hover:bg-[#5E7ADD] transition w-full sm:w-auto font-bold"
                        >
                            Batalkan
                        </button>
                    </div>

                    {/* Tombol Simpan */}
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="submit"
                            className="bg-[#162360] text-white hover:bg-blue-800 py-3 px-6 rounded-lg  transition w-full sm:w-auto font-bold"
                        >
                            Simpan Perubahan
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
