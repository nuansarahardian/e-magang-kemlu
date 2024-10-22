import { useState } from 'react';

export default function PengaturanAkun() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [isEditing, setIsEditing] = useState(false); // State untuk kontrol mode edit atau tidak

    // Fungsi untuk menangani perubahan input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Fungsi untuk submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Password dan konfirmasi password tidak cocok");
            return;
        }
        console.log("Data Akun:", formData);
        // Aksi untuk menyimpan data, misalnya kirim data ke backend
    };

    // Fungsi untuk toggle mode edit
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Container atas: Heading dengan background gradient */}
            <div className="bg-gradient-to-r from-[#384AA0] to-[#5E7ADD] text-white text-center rounded-t-lg">
                <h2 className="text-4xl font-bold py-8">Pengaturan Akun</h2>
            </div>

            {/* Container bawah: Pengaturan Akun */}
            <div className="flex-grow bg-white-100 py-12 p-8">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div className="grid grid-cols-1 gap-y-2">
                            <label className="text-lg font-semibold text-gray-700">Alamat Email: *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Masukkan Email Anda"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={!isEditing}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="grid grid-cols-1 gap-y-2">
                            <label className="text-lg font-semibold text-gray-700">Password: *</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Masukkan Password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={!isEditing}
                                required
                            />
                        </div>

                        {/* Konfirmasi Password */}
                        <div className="grid grid-cols-1 gap-y-2">
                            <label className="text-lg font-semibold text-gray-700">Konfirmasi Password: *</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Konfirmasi Password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={!isEditing}
                                required
                            />
                        </div>

                        {/* Tombol Ubah dan Simpan */}
                        <div className="flex justify-end space-x-4 mt-6">
                            {isEditing ? (
                                <button
                                    type="submit"
                                    className="bg-[#FFB900] text-white py-3 px-6 rounded-lg hover:bg-yellow-600 transition w-full sm:w-auto"
                                >
                                    Simpan
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={toggleEdit}
                                    className="bg-[#384AA0] text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
                                >
                                    Ubah
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
