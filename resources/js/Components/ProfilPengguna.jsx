import { useState } from 'react';
import DatePicker from 'react-datepicker'; // Pastikan sudah menginstal react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Import style datepicker

export default function ProfilPengguna() {
    const [formData, setFormData] = useState({
        namaLengkap: '',
        email: '',
        tempatLahir: '',
        tanggalLahir: null, // Tanggal Lahir default null, pengguna bisa memilih
        asalUniversitas: '',
        nim: '',
        jurusan: '',
        fakultas: '',
        noHp: '',
        semester: '',
        periodeMagang: '',
        isuDiminati: ''
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
    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            tanggalLahir: date
        });
    };

    // Fungsi untuk submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data Diri:", formData);
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
                <h2 className="text-4xl font-bold py-8">Profil Pengguna</h2>
            </div>

            {/* Container bawah: Profil Pengguna dengan padding 6 */}
            <div className="flex-grow bg-white-100 py-12 p-8">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nama Lengkap: Kolom tidak dibagi dua */}
                        <div className="grid grid-cols-1 gap-y-2">
                            <label className="text-lg font-semibold text-gray-700">Nama Calon Peserta Magang: *</label>
                            <input
                                type="text"
                                name="namaLengkap"
                                value={formData.namaLengkap}
                                onChange={handleChange}
                                placeholder="Masukkan Nama Lengkap"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Kolom Lainnya (dibagi dua) */}
                        <div className="grid grid-cols-2 gap-6">
                            {/* Email */}
                            <div className="grid grid-cols-1 gap-y-2">
                                <label className="text-lg font-semibold text-gray-700">Alamat Email Aktif: *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Masukkan Email Anda"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Tempat Lahir */}
                            <div className="grid grid-cols-1 gap-y-2">
                                <label className="text-lg font-semibold text-gray-700">Tempat Lahir: *</label>
                                <input
                                    type="text"
                                    name="tempatLahir"
                                    value={formData.tempatLahir}
                                    onChange={handleChange}
                                    placeholder="Masukkan Tempat Lahir"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={!isEditing}
                                    required
                                />
                            </div>

                            {/* Tanggal Lahir dengan DatePicker */}
                            <div className="grid grid-cols-1 gap-y-2">
                                <label className="text-lg font-semibold text-gray-700">Tanggal Lahir: *</label>
                                <DatePicker
                                    selected={formData.tanggalLahir}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholderText="Pilih Tanggal Lahir"
                                    disabled={!isEditing}
                                    required
                                />
                            </div>

                            {/* Asal Universitas */}
                            <div className="grid grid-cols-1 gap-y-2">
                                <label className="text-lg font-semibold text-gray-700">Asal Universitas: *</label>
                                <input
                                    type="text"
                                    name="asalUniversitas"
                                    value={formData.asalUniversitas}
                                    onChange={handleChange}
                                    placeholder="Masukkan Asal Universitas"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={!isEditing}
                                    required
                                />
                            </div>

                            {/* NIM */}
                            <div className="grid grid-cols-1 gap-y-2">
                                <label className="text-lg font-semibold text-gray-700">Nomor Induk Mahasiswa: *</label>
                                <input
                                    type="text"
                                    name="nim"
                                    value={formData.nim}
                                    onChange={handleChange}
                                    placeholder="Masukkan NIM"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={!isEditing}
                                    required
                                />
                            </div>

                            {/* Jurusan */}
                            <div className="grid grid-cols-1 gap-y-2">
                                <label className="text-lg font-semibold text-gray-700">Jurusan/Prodi: *</label>
                                <input
                                    type="text"
                                    name="jurusan"
                                    value={formData.jurusan}
                                    onChange={handleChange}
                                    placeholder="Masukkan Jurusan"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={!isEditing}
                                    required
                                />
                            </div>

                            {/* Fakultas */}
                            <div className="grid grid-cols-1 gap-y-2">
                                <label className="text-lg font-semibold text-gray-700">Fakultas: *</label>
                                <input
                                    type="text"
                                    name="fakultas"
                                    value={formData.fakultas}
                                    onChange={handleChange}
                                    placeholder="Masukkan Fakultas"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={!isEditing}
                                    required
                                />
                            </div>

                            {/* No HP */}
                            <div className="grid grid-cols-1 gap-y-2">
                                <label className="text-lg font-semibold text-gray-700">No. HP Yang Bisa Dihubungi: *</label>
                                <input
                                    type="text"
                                    name="noHp"
                                    value={formData.noHp}
                                    onChange={handleChange}
                                    placeholder="Masukkan No. HP"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={!isEditing}
                                    required
                                />
                            </div>

                            {/* Semester */}
                            <div className="grid grid-cols-1 gap-y-2">
                                <label className="text-lg font-semibold text-gray-700">Semester: *</label>
                                <input
                                    type="text"
                                    name="semester"
                                    value={formData.semester}
                                    onChange={handleChange}
                                    placeholder="Masukkan Semester"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={!isEditing}
                                    required
                                />
                            </div>

                            {/* Periode Magang */}
                            <div className="grid grid-cols-1 gap-y-2">
                                <label className="text-lg font-semibold text-gray-700">Periode Magang: *</label>
                                <input
                                    type="text"
                                    name="periodeMagang"
                                    value={formData.periodeMagang}
                                    onChange={handleChange}
                                    placeholder="Masukkan Periode Magang"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={!isEditing}
                                    required
                                />
                            </div>
                        </div>

                        {/* Isu Yang Diminati: Kolom tidak dibagi dua */}
                        <div className="grid grid-cols-1 gap-y-2">
                            <label className="text-lg font-semibold text-gray-700">Isu Yang Diminati: *</label>
                            <select
                                name="isuDiminati"
                                value={formData.isuDiminati}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={!isEditing}
                                required
                            >
                                <option value="">Pilih Isu yang Diminati</option>
                                <option value="Strategi Asia Pasifik & Afrika">Strategi Asia Pasifik & Afrika</option>
                                <option value="Strategi Amerika & Eropa">Strategi Amerika & Eropa</option>
                                <option value="Strategi Kebijakan Multilateral">Strategi Kebijakan Multilateral</option>
                                <option value="Isu Khusus & Analisis Data">Isu Khusus & Analisis Data</option>
                            </select>
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
