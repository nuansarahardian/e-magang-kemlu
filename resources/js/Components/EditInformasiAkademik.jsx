import React, { useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid"; // Pastikan menggunakan Heroicons
import { router } from "@inertiajs/react"; // Import router dari Inertia.js
import Swal from "sweetalert2"; // Import SweetAlert2

export default function EditInformasiAkademik({
    profilData,
    formData,
    setFormData,
    handleChange,
    switchComponent,
}) {
    // Inisialisasi data form dengan data dari profilData saat pertama kali dimuat
    useEffect(() => {
        if (profilData) {
            setFormData({
                asalUniversitas: profilData.universitas || "",
                fakultas: profilData.fakultas || "",
                jurusan: profilData.jurusan || "",
                ipk: profilData.IPK || "",
                semester: profilData.semester || "",
                KTM: profilData.KTM || "",
            });
        } else {
            // Jika profilData tidak ada (mode create), set nilai default kosong
            setFormData({
                asalUniversitas: "",
                fakultas: "",
                jurusan: "",
                ipk: "",
                semester: "",
                KTM: "",
            });
        }
    }, [profilData]);

    const handleSubmit = (e) => {
        e.preventDefault(); // Mencegah perilaku default form

        // Buat FormData untuk mengirim data
        const data = new FormData();
        data.append("universitas", formData.asalUniversitas); // Ganti dengan nama yang benar
        data.append("fakultas", formData.fakultas);
        data.append("jurusan", formData.jurusan);
        data.append("IPK", formData.ipk);
        data.append("semester", formData.semester);
        data.append("KTM", formData.KTM);

        // Kirim data ke backend
        router.post(route("profil-akademik.store"), data, {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Data akademik berhasil disimpan!",
                    confirmButtonText: "OK",
                }).then(() => {
                    window.location.reload(); // Refresh halaman setelah user klik "OK"
                });
            },
            onError: (errors) => {
                const errorMessages = errors.response?.data?.errors
                    ? Object.values(errors.response.data.errors)
                          .flat()
                          .join(", ")
                    : "Terjadi kesalahan saat menyimpan data.";

                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: errorMessages,
                    confirmButtonText: "Coba Lagi",
                });
                console.log("Terjadi kesalahan: ", errors);
            },
            replace: true,
        });
    };

    const handleCancel = () => {
        switchComponent("cv", 2);
    };

    return (
        <div className="px-3">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Informasi Akademik
            </h3>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                    {/* Asal Universitas */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700 flex">
                            Asal Universitas{" "}
                            <p className="text-red-500 ml-1">*</p>
                        </label>
                        <input
                            type="text"
                            name="asalUniversitas"
                            value={formData.asalUniversitas}
                            onChange={handleChange}
                            placeholder="Masukkan Asal Universitas"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <p className="text-sm text-gray-500">
                            Tuliskan nama universitas lengkap tanpa disingkat.
                            Contoh: "Universitas Indonesia"
                        </p>
                    </div>

                    {/* Fakultas */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700 flex">
                            Fakultas <p className="text-red-500 ml-1">*</p>
                        </label>
                        <input
                            type="text"
                            name="fakultas"
                            value={formData.fakultas}
                            onChange={handleChange}
                            placeholder="Masukkan Fakultas"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <p className="text-sm text-gray-500">
                            Tuliskan nama fakultas lengkap tanpa disingkat.
                            Contoh: "Fakultas Ilmu Sosial dan Ilmu Politik"
                        </p>
                    </div>

                    {/* Jurusan/Prodi */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700 flex">
                            Jurusan/Prodi <p className="text-red-500 ml-1">*</p>
                        </label>
                        <input
                            type="text"
                            name="jurusan"
                            value={formData.jurusan}
                            onChange={handleChange}
                            placeholder="Masukkan Jurusan/Prodi"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <p className="text-sm text-gray-500">
                            Tuliskan nama jurusan atau program studi lengkap
                            tanpa disingkat. Contoh: "Hubungan Internasional"
                        </p>
                    </div>

                    {/* IPK */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700 flex">
                            IPK <p className="text-red-500 ml-1">*</p>
                        </label>
                        <input
                            type="text"
                            name="ipk"
                            value={formData.ipk}
                            onChange={handleChange}
                            placeholder="Masukkan IPK"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <p className="text-sm text-gray-500">
                            Tuliskan IPK dengan pemisah titik. Contoh: "3.75"
                        </p>
                    </div>

                    {/* Semester (Dropdown with Icon) */}
                    <div className="relative grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700 flex">
                            Semester <p className="text-red-500 ml-1">*</p>
                        </label>
                        <div className="relative">
                            <select
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Pilih Semester</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
                            {/* Icon Chevron */}
                            <ChevronDownIcon className="absolute right-3 top-3 h-5 w-5 text-gray-500 pointer-events-none" />
                        </div>
                    </div>

                    {/* Upload KTM */}
                </div>
                <div className="flex  justify-end gap-2">
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
