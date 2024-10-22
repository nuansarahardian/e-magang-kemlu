import { useState } from 'react';
import DatePicker from 'react-datepicker'; // Pastikan sudah menginstal react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Import style datepicker

// Import komponen
import InformasiPribadi from './InformasiPribadi';
import InformasiAkademik from './InformasiAkademik';
import PengalamanOrganisasi from './PengalamanOrganisasi';
import PreviewCV from './PreviewCV';

export default function CurriculumVitae() {
    const [formData, setFormData] = useState({
        // Tambahkan semua field data yang diperlukan
        namaLengkap: '',
        asalUniversitas: '',
        // Tambahkan field lain sesuai kebutuhan
    });

    const [activeTab, setActiveTab] = useState(1); // State untuk tab aktif
    const [isEditing, setIsEditing] = useState(false); // State untuk mode edit

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

    // Fungsi untuk ganti tab
    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Container atas: Heading dengan background gradient */}
            <div className="bg-gradient-to-r from-[#384AA0] to-[#5E7ADD] text-white text-center rounded-t-lg">
                <h2 className="text-4xl font-bold py-8">Curriculum Vitae</h2>
            </div>

            {/* Tab navigation */}
            <div className="bg-white border-b border-gray-200">
                <div className="flex justify-center space-x-10">
                    <button
                        onClick={() => handleTabClick(1)}
                        className={`pb-4 pt-3 ${
                            activeTab === 1
                                ? 'border-b-2 border-[#384AA0] text-[#384AA0] font-semibold'
                                : 'text-gray-500 hover:text-gray-700 font-medium'
                        } text-lg`}
                    >
                        Informasi Pribadi
                    </button>
                    <button
                        onClick={() => handleTabClick(2)}
                        className={`pb-4 pt-3 ${
                            activeTab === 2
                                ? 'border-b-2 border-[#384AA0] text-[#384AA0] font-semibold'
                                : 'text-gray-500 hover:text-gray-700 font-medium'
                        } text-lg`}
                    >
                        Informasi Akademik
                    </button>
                    <button
                        onClick={() => handleTabClick(3)}
                        className={`pb-4 pt-3 ${
                            activeTab === 3
                                ? 'border-b-2 border-[#384AA0] text-[#384AA0] font-semibold'
                                : 'text-gray-500 hover:text-gray-700 font-medium'
                        } text-lg`}
                    >
                        Keterampilan dan Pengalaman
                    </button>
                    <button
                        onClick={() => handleTabClick(4)}
                        className={`pb-4 pt-3 ${
                            activeTab === 4
                                ? 'border-b-2 border-[#384AA0] text-[#384AA0] font-semibold'
                                : 'text-gray-500 hover:text-gray-700 font-medium'
                        } text-lg`}
                    >
                        Preview CV
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-grow bg-white py-12 p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Render komponen berdasarkan tab yang aktif */}
                    {activeTab === 1 && (
                        <InformasiPribadi
                            formData={formData}
                            handleChange={handleChange}
                            isEditing={isEditing}
                            toggleEdit={toggleEdit}
                            handleSubmit={handleSubmit}
                        />
                    )}

                    {activeTab === 2 && (
                        <InformasiAkademik
                            formData={formData}
                            handleChange={handleChange}
                            isEditing={isEditing}
                            toggleEdit={toggleEdit}
                            handleSubmit={handleSubmit}
                        />
                    )}

                    {activeTab === 3 && (
                        <PengalamanOrganisasi
                            formData={formData}
                            handleChange={handleChange}
                            isEditing={isEditing}
                            toggleEdit={toggleEdit}
                            handleSubmit={handleSubmit}
                        />
                    )}

                    {activeTab === 4 && (
                        <PreviewCV formData={formData} />
                    )}
                </div>
            </div>
        </div>
    );
}
