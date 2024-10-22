import React from 'react';
import DatePicker from 'react-datepicker'; // Pastikan Anda telah menginstal react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Import style datepicker

export default function InformasiPribadi({ formData, handleChange, handleDateChange, isEditing, toggleEdit, handleSubmit }) {
    return (
        <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Informasi Pribadi</h3>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                    {/* Nama Lengkap */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">Nama Lengkap: *</label>
                        <input
                            type="text"
                            name="namaLengkap"
                            value={formData.namaLengkap}
                            onChange={handleChange}
                            placeholder="Masukkan Nama Lengkap"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={!isEditing}
                            required
                        />
                    </div>

                    {/* Tanggal Lahir */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">Tanggal Lahir: *</label>
                        <DatePicker
                            selected={formData.tanggalLahir}
                            onChange={(date) => handleDateChange(date, 'tanggalLahir')}
                            dateFormat="dd/MM/yyyy"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholderText="dd/mm/yyyy"
                            disabled={!isEditing}
                            required
                        />
                    </div>

                    {/* Jenis Kelamin */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">Jenis Kelamin: *</label>
                        <select
                            name="jenisKelamin"
                            value={formData.jenisKelamin}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={!isEditing}
                            required
                        >
                            <option value="">Pilih Jenis Kelamin</option>
                            <option value="Laki-Laki">Laki-Laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                    </div>

                    {/* Alamat Sesuai KTP */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">Alamat Sesuai KTP: *</label>
                        <input
                            type="text"
                            name="alamatKTP"
                            value={formData.alamatKTP}
                            onChange={handleChange}
                            placeholder="Masukkan Alamat Sesuai KTP"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={!isEditing}
                            required
                        />
                    </div>

                    {/* Nomor Handphone */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">Nomor Handphone: *</label>
                        <input
                            type="text"
                            name="noHp"
                            value={formData.noHp}
                            onChange={handleChange}
                            placeholder="Masukkan Nomor Handphone"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={!isEditing}
                            required
                        />
                    </div>

                    {/* Alamat Domisili (Opsional) */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">Alamat Domisili (Opsional):</label>
                        <input
                            type="text"
                            name="alamatDomisili"
                            value={formData.alamatDomisili}
                            onChange={handleChange}
                            placeholder="Masukkan Alamat Domisili"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={!isEditing}
                        />
                    </div>

                    {/* Upload Foto 3x4 */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">Upload Foto 3x4: *</label>
                        <input
                            type="file"
                            name="uploadFoto"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            disabled={!isEditing}
                            required
                        />
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
    );
}
