import { useState, useEffect } from "react";
import DatePicker from "react-datepicker"; // Pastikan sudah menginstal react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import style datepicker
import React from "react";
import { usePage } from "@inertiajs/react";

// Import komponen
import EditInformasiPribadi from "./EditInformasiPribadi";
import EditInformasiAkademik from "./EditInformasiAkademik";
import EditPengalaman from "./EditPengalaman";

export default function EditCV({ switchComponent, defaultTab = 1 }) {
    const [activeTab, setActiveTab] = useState(defaultTab);
    const { profilData } = usePage().props;
    const [formData, setFormData] = useState({
        namaLengkap: "",
        asalUniversitas: "",
    });

    const [isEditing, setIsEditing] = useState(false); // State untuk mode edit
    const [progress, setProgress] = useState(22); // Contoh progress (22%)

    useEffect(() => {
        const savedTab = localStorage.getItem("activeTab");
        if (savedTab) {
            setActiveTab(parseInt(savedTab));
        } else {
            setActiveTab(defaultTab); // Gunakan tab default jika tidak ada yang disimpan
        }
    }, [defaultTab]);

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
        localStorage.setItem("activeTab", tabIndex);
    };

    // Fungsi untuk menangani perubahan input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Fungsi untuk submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Curriculum Vitae Data:", formData);
    };

    // Fungsi untuk toggle mode edit
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div>
            <div className="shadow-md outline outline-1 outline-gray-200 sm:rounded-lg">
                {/* Bagian Bawah */}
                <div className="bg-white">
                    {/* Tab navigation */}
                    <div className="bg-white border-b border-gray-200">
                        <div className="flex pl-10 space-x-10 pt-1">
                            <button
                                onClick={() => handleTabClick(1)}
                                className={`pb-4 pt-4 ${
                                    activeTab === 1
                                        ? "border-b-2 border-[#384AA0] text-[#384AA0] font-semibold"
                                        : "text-gray-500 hover:text-gray-700 font-medium"
                                } text-lg`}
                            >
                                Informasi Pribadi
                            </button>
                            <button
                                onClick={() => handleTabClick(2)}
                                className={`pb-4 pt-4 ${
                                    activeTab === 2
                                        ? "border-b-2 border-[#384AA0] text-[#384AA0] font-semibold"
                                        : "text-gray-500 hover:text-gray-700 font-medium"
                                } text-lg`}
                            >
                                Informasi Akademik
                            </button>
                            <button
                                onClick={() => handleTabClick(3)}
                                className={`pb-4 pt-4 ${
                                    activeTab === 3
                                        ? "border-b-2 border-[#384AA0] text-[#384AA0] font-semibold"
                                        : "text-gray-500 hover:text-gray-700 font-medium"
                                } text-lg`}
                            >
                                Keterampilan dan Pengalaman
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow bg-white p-8">
                        <div className="max-w-4xl mx-auto">
                            {activeTab === 1 && (
                                <EditInformasiPribadi
                                    profilData={profilData}
                                    formData={formData}
                                    switchComponent={switchComponent}
                                    setFormData={setFormData}
                                    handleChange={handleChange}
                                    isEditing={isEditing}
                                    toggleEdit={toggleEdit}
                                    handleSubmit={handleSubmit}
                                />
                            )}
                            {activeTab === 2 && (
                                <EditInformasiAkademik
                                    profilData={profilData}
                                    formData={formData}
                                    switchComponent={switchComponent}
                                    setFormData={setFormData}
                                    handleChange={handleChange}
                                    isEditing={isEditing}
                                    toggleEdit={toggleEdit}
                                    handleSubmit={handleSubmit}
                                />
                            )}
                            {activeTab === 3 && (
                                <EditPengalaman
                                    profilData={profilData}
                                    formData={formData}
                                    switchComponent={switchComponent}
                                    setFormData={setFormData}
                                    handleChange={handleChange}
                                    isEditing={isEditing}
                                    toggleEdit={toggleEdit}
                                    handleSubmit={handleSubmit}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
