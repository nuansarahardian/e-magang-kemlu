import { useState } from "react";

export default function PengaturanAkun() {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isVerified, setIsVerified] = useState(false); // Untuk status verifikasi password lama

    // Fungsi untuk menangani perubahan input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Fungsi untuk submit form verifikasi password lama
    const handleVerify = (e) => {
        e.preventDefault();
        // Verifikasi password lama
        if (formData.currentPassword === "correct_password") {
            // Gantilah "correct_password" dengan mekanisme verifikasi yang sesuai
            setIsVerified(true);
            setIsEditing(true);
        } else {
            alert("Password lama tidak sesuai");
        }
    };

    // Fungsi untuk submit form perubahan password
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmNewPassword) {
            alert("Password baru dan konfirmasi password tidak cocok");
            return;
        }
        console.log("Password berhasil diubah:", formData.newPassword);
        // Aksi untuk menyimpan password baru ke backend
        setIsEditing(false);
        setIsVerified(false);
    };

    return (
        <div className="min-h-48 flex flex-col bg-white shadow-md outline outline-1 outline-gray-200 sm:rounded-lg">
            {/* Container atas: Heading dengan background gradient */}
            <div className="bg-gradient-to-r from-[#384AA0] to-[#5E7ADD] text-white text-center rounded-t-lg">
                <h2 className="text-4xl font-bold py-8">Pengaturan Akun</h2>
            </div>

            {/* Container bawah: Pengaturan Akun */}
            <div className="flex-grow bg-white-100 py-12 p-8">
                <div className="max-w-4xl mx-auto">
                    {!isVerified ? (
                        <form onSubmit={handleVerify} className="space-y-6">
                            {/* Password Lama */}
                            <div className="grid grid-cols-1 gap-y-2">
                                <label className="text-lg font-semibold text-gray-700">
                                    Password Lama: *
                                </label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    placeholder="Masukkan Password Lama"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Tombol Verifikasi */}
                            <div className="flex justify-end mt-6">
                                <button
                                    type="submit"
                                    className="bg-[#384AA0] text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
                                >
                                    Verifikasi
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Password Baru */}
                            <div className="grid grid-cols-1 gap-y-2">
                                <label className="text-lg font-semibold text-gray-700">
                                    Password Baru: *
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    placeholder="Masukkan Password Baru"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Konfirmasi Password Baru */}
                            <div className="grid grid-cols-1 gap-y-2">
                                <label className="text-lg font-semibold text-gray-700">
                                    Konfirmasi Password Baru: *
                                </label>
                                <input
                                    type="password"
                                    name="confirmNewPassword"
                                    value={formData.confirmNewPassword}
                                    onChange={handleChange}
                                    placeholder="Konfirmasi Password Baru"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Tombol Simpan */}
                            <div className="flex justify-end mt-6">
                                <button
                                    type="submit"
                                    className="bg-[#FFB900] text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition w-full sm:w-auto"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
