import React, { useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2"; // Import SweetAlert2

export default function EditInformasiAkademik({
    profilData,
    formData,
    setFormData,
    handleChange,
    switchComponent,
}) {
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
        e.preventDefault(); // Prevent default form submission

        const data = new FormData();
        data.append("universitas", formData.asalUniversitas);
        data.append("fakultas", formData.fakultas);
        data.append("jurusan", formData.jurusan);
        data.append("IPK", formData.ipk);
        data.append("semester", formData.semester);
        data.append("KTM", formData.KTM);

        // Post the data to the server
        router.post(route("profil-akademik.store"), data, {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Berhasil!",
                    text: "Data akademik berhasil disimpan!",
                    confirmButtonText: "OK",
                }).then(() => {
                    window.location.reload(); // Refresh the page after the alert
                });
            },
            onError: (errors) => {
                const errorMessages = errors.response?.data?.errors
                    ? Object.values(errors.response.data.errors)
                          .flat()
                          .join(", ")
                    : "Isi terlebih dahulu NIM dan data pribadi anda!";

                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: errorMessages,
                    confirmButtonText: "Coba Lagi",
                });
            },
            replace: true,
        });
    };

    const handleCancel = () => {
        switchComponent("cv", 2);
    };

    return (
        <div className="px-3">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
                Edit Informasi Akademik
            </h3>
            <p className="sm:text-sm mb-3 sm:mb-4 text-xs text-yellow-600 bg-yellow-100/50 rounded-xl text-center p-2 border border-1 border-yellow-400">
                Pastikan data diisi dengan lengkap dan benar, karena informasi
                ini akan dipakai untuk berbagai keperluan administrasi.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Asal Universitas */}
                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700 flex">
                            Asal Universitas{" "}
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            type="text"
                            name="asalUniversitas"
                            value={formData.asalUniversitas}
                            onChange={handleChange}
                            placeholder="Masukkan Asal Universitas"
                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <p className="text-xs sm:text-sm text-gray-500">
                            Tuliskan nama universitas lengkap tanpa disingkat.
                            Contoh: "Universitas Indonesia"
                        </p>
                    </div>

                    {/* Fakultas */}
                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700 flex">
                            Fakultas{" "}
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            type="text"
                            name="fakultas"
                            value={formData.fakultas}
                            onChange={handleChange}
                            placeholder="Masukkan Fakultas"
                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <p className="text-xs sm:text-sm text-gray-500">
                            Tuliskan nama fakultas lengkap tanpa disingkat.
                            Contoh: "Fakultas Ilmu Sosial dan Ilmu Politik"
                        </p>
                    </div>

                    {/* Jurusan/Prodi */}
                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700 flex">
                            Jurusan/Prodi{" "}
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            type="text"
                            name="jurusan"
                            value={formData.jurusan}
                            onChange={handleChange}
                            placeholder="Masukkan Jurusan/Prodi"
                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <p className="text-xs sm:text-sm text-gray-500">
                            Tuliskan nama jurusan atau program studi lengkap
                            tanpa disingkat. Contoh: "Hubungan Internasional"
                        </p>
                    </div>

                    {/* IPK */}
                    <div className="grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700 flex">
                            IPK <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            type="text"
                            name="ipk"
                            value={formData.ipk}
                            onChange={handleChange}
                            placeholder="Masukkan IPK"
                            className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <p className="text-xs sm:text-sm text-gray-500">
                            Tuliskan IPK dengan pemisah titik. Contoh: "3.75"
                        </p>
                    </div>

                    {/* Semester */}
                    <div className="relative grid gap-y-2">
                        <label className="text-sm sm:text-lg font-semibold text-gray-700 flex">
                            Semester{" "}
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="relative">
                            <select
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Pilih Semester</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
                            <ChevronDownIcon className="absolute right-3 top-3 h-4 w-4 sm:h-5 sm:w-5 text-gray-500 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Buttons */}
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
