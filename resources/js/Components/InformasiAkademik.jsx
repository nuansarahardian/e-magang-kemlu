import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'; // Pastikan menggunakan Heroicons

export default function InformasiAkademik({ formData, handleChange, isEditing, toggleEdit, handleSubmit }) {
    return (
        <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Informasi Akademik</h3>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
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
                        <p className="text-sm text-gray-500">Tuliskan nama universitas lengkap tanpa disingkat. Contoh: "Universitas Indonesia"</p>
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
                        <p className="text-sm text-gray-500">Tuliskan nama fakultas lengkap tanpa disingkat. Contoh: "Fakultas Ilmu Sosial dan Ilmu Politik"</p>
                    </div>

                    {/* Jurusan/Prodi */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">Jurusan/Prodi: *</label>
                        <input
                            type="text"
                            name="jurusan"
                            value={formData.jurusan}
                            onChange={handleChange}
                            placeholder="Masukkan Jurusan/Prodi"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={!isEditing}
                            required
                        />
                        <p className="text-sm text-gray-500">Tuliskan nama jurusan atau program studi lengkap tanpa disingkat. Contoh: "Hubungan Internasional"</p>
                    </div>

                    {/* IPK */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">IPK: *</label>
                        <input
                            type="text"
                            name="ipk"
                            value={formData.ipk}
                            onChange={handleChange}
                            placeholder="Masukkan IPK"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={!isEditing}
                            required
                        />
                        <p className="text-sm text-gray-500">Tuliskan IPK dengan pemisah titik. Contoh: "3.75"</p>
                    </div>

                    {/* Semester (Dropdown with Icon) */}
                    <div className="relative grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">Semester: *</label>
                        <div className="relative">
                            <select
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={!isEditing}
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
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">Upload KTM: *</label>
                        <input
                            type="file"
                            name="uploadKTM"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            disabled={!isEditing}
                            required
                        />
                    </div>

                    {/* Surat Permohonan Magang */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">Surat Permohonan Magang: *</label>
                        <input
                            type="file"
                            name="suratPermohonan"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
                            disabled={!isEditing}
                            required
                        />
                    </div>

                    {/* Transkrip Nilai */}
                    <div className="grid grid-cols-1 gap-y-2">
                        <label className="text-lg font-semibold text-gray-700">Transkrip Nilai Resmi Terakhir: *</label>
                        <input
                            type="file"
                            name="transkripNilai"
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
