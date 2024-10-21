import { useState } from 'react';
import DatePicker from 'react-datepicker'; // Pastikan sudah menginstal react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Import style datepicker

export default function CurriculumVitae() {
    const [formData, setFormData] = useState({
        namaKeterampilan: '',
        levelKeterampilan: '',
        perusahaan: '',
        posisi: '',
        tanggalMulai: null,
        tanggalSelesai: null,
        deskripsiPengalaman: '',
        namaPrestasi: '',
        tanggalPrestasi: null,
        deskripsiPrestasi: '',
    });

    const [isEditing, setIsEditing] = useState(false); // State untuk kontrol mode edit atau tidak

    // Fungsi untuk menangani perubahan input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Fungsi untuk menangani perubahan datepicker
    const handleDateChange = (date, name) => {
        setFormData({
            ...formData,
            [name]: date
        });
    };

    // Fungsi untuk submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Curriculum Vitae Data:", formData);
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
                <h2 className="text-4xl font-bold py-8">Curriculum Vitae</h2>
            </div>

            {/* Container bawah: Curriculum Vitae dengan padding 6 */}
            <div className="flex-grow bg-white py-12 p-8">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        
                        {/* Keterampilan */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Keterampilan</h3>
                            <div className="grid grid-cols-2 gap-6">
                                {/* Nama Keterampilan */}
                                <div className="grid grid-cols-1 gap-y-2">
                                    <label className="text-lg font-semibold text-gray-700">Nama Keterampilan: *</label>
                                    <input
                                        type="text"
                                        name="namaKeterampilan"
                                        value={formData.namaKeterampilan}
                                        onChange={handleChange}
                                        placeholder="Masukkan Nama Keterampilan"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                {/* Level Keterampilan */}
                                <div className="grid grid-cols-1 gap-y-2">
                                    <label className="text-lg font-semibold text-gray-700">Level: *</label>
                                    <input
                                        type="text"
                                        name="levelKeterampilan"
                                        value={formData.levelKeterampilan}
                                        onChange={handleChange}
                                        placeholder="Masukkan Level"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Garis Pembatas */}
                        <hr className="border-t border-gray-300" />

                        {/* Pengalaman */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Pengalaman</h3>
                            <div className="grid grid-cols-2 gap-6">
                                {/* Perusahaan */}
                                <div className="grid grid-cols-1 gap-y-2">
                                    <label className="text-lg font-semibold text-gray-700">Perusahaan: *</label>
                                    <input
                                        type="text"
                                        name="perusahaan"
                                        value={formData.perusahaan}
                                        onChange={handleChange}
                                        placeholder="Masukkan Perusahaan"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                {/* Posisi */}
                                <div className="grid grid-cols-1 gap-y-2">
                                    <label className="text-lg font-semibold text-gray-700">Posisi: *</label>
                                    <input
                                        type="text"
                                        name="posisi"
                                        value={formData.posisi}
                                        onChange={handleChange}
                                        placeholder="Masukkan Posisi"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                {/* Tanggal Mulai */}
                                <div className="grid grid-cols-1 gap-y-2">
                                    <label className="text-lg font-semibold text-gray-700">Tanggal Mulai: *</label>
                                    <DatePicker
                                        selected={formData.tanggalMulai}
                                        onChange={(date) => handleDateChange(date, 'tanggalMulai')}
                                        dateFormat="dd/MM/yyyy"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholderText="Masukkan Tanggal Mulai"
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                {/* Tanggal Selesai */}
                                <div className="grid grid-cols-1 gap-y-2">
                                    <label className="text-lg font-semibold text-gray-700">Tanggal Selesai: *</label>
                                    <DatePicker
                                        selected={formData.tanggalSelesai}
                                        onChange={(date) => handleDateChange(date, 'tanggalSelesai')}
                                        dateFormat="dd/MM/yyyy"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholderText="Masukkan Tanggal Selesai"
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                {/* Deskripsi Pengalaman */}
                                <div className="grid grid-cols-1 col-span-2 gap-y-2">
                                    <label className="text-lg font-semibold text-gray-700">Deskripsi: *</label>
                                    <textarea
                                        name="deskripsiPengalaman"
                                        value={formData.deskripsiPengalaman}
                                        onChange={handleChange}
                                        placeholder="Masukkan Deskripsi"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={!isEditing}
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Garis Pembatas */}
                        <hr className="border-t border-gray-300" />

                        {/* Prestasi */}
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">Prestasi</h3>
                            <div className="grid grid-cols-2 gap-6">
                                {/* Nama Prestasi */}
                                <div className="grid grid-cols-1 gap-y-2">
                                    <label className="text-lg font-semibold text-gray-700">Nama Prestasi: *</label>
                                    <input
                                        type="text"
                                        name="namaPrestasi"
                                        value={formData.namaPrestasi}
                                        onChange={handleChange}
                                        placeholder="Masukkan Nama Prestasi"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                {/* Tanggal Prestasi */}
                                <div className="grid grid-cols-1 gap-y-2">
                                    <label className="text-lg font-semibold text-gray-700">Tanggal: *</label>
                                    <DatePicker
                                        selected={formData.tanggalPrestasi}
                                        onChange={(date) => handleDateChange(date, 'tanggalPrestasi')}
                                        dateFormat="dd/MM/yyyy"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholderText="Masukkan Tanggal"
                                        disabled={!isEditing}
                                        required
                                    />
                                </div>

                                {/* Deskripsi Prestasi */}
                                <div className="grid grid-cols-1 col-span-2 gap-y-2">
                                    <label className="text-lg font-semibold text-gray-700">Deskripsi: *</label>
                                    <textarea
                                        name="deskripsiPrestasi"
                                        value={formData.deskripsiPrestasi}
                                        onChange={handleChange}
                                        placeholder="Masukkan Deskripsi"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        disabled={!isEditing}
                                        required
                                    ></textarea>
                                </div>
                            </div>
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
