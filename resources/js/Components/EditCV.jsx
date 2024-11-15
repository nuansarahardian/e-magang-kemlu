import { useState, useEffect } from "react";
import DatePicker from "react-datepicker"; // Pastikan sudah menginstal react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import style datepicker
import React from "react";
import { usePage } from "@inertiajs/react";
import { CSSTransition, TransitionGroup } from "react-transition-group"; // Import untuk animasi

// Import komponen
import EditInformasiPribadi from "./EditInformasiPribadi";
import EditInformasiAkademik from "./EditInformasiAkademik";
import EditPengalaman from "./EditPengalaman";
import Dokumen from "./Dokumen";

export default function EditCV({ switchComponent, defaultTab = 1 }) {
    const [activeTab, setActiveTab] = useState(defaultTab);
    const { profilData } = usePage().props;
    const [formData, setFormData] = useState({
        namaLengkap: "",
        asalUniversitas: "",
    });

    const [isEditing, setIsEditing] = useState(false); // State untuk mode edit

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
                        <div className="flex flex-col sm:flex-row pl-4 sm:pl-10 space-y-2 sm:space-y-0 sm:space-x-6 pt-1">
                            <button
                                onClick={() => handleTabClick(1)}
                                className={`pb-2 sm:pb-4 pt-4 text-sm sm:text-lg ${
                                    activeTab === 1
                                        ? "border-b-2 border-[#384AA0] text-[#384AA0] font-semibold"
                                        : "text-gray-500 hover:text-gray-700 font-medium"
                                }`}
                            >
                                Informasi Pribadi
                            </button>
                            <button
                                onClick={() => handleTabClick(2)}
                                className={`pb-2 sm:pb-4 pt-4 text-sm sm:text-lg ${
                                    activeTab === 2
                                        ? "border-b-2 border-[#384AA0] text-[#384AA0] font-semibold"
                                        : "text-gray-500 hover:text-gray-700 font-medium"
                                }`}
                            >
                                Informasi Akademik
                            </button>
                            <button
                                onClick={() => handleTabClick(3)}
                                className={`pb-2 sm:pb-4 pt-4 text-sm sm:text-lg ${
                                    activeTab === 3
                                        ? "border-b-2 border-[#384AA0] text-[#384AA0] font-semibold"
                                        : "text-gray-500 hover:text-gray-700 font-medium"
                                }`}
                            >
                                Keterampilan dan Pengalaman
                            </button>
                            <button
                                onClick={() => handleTabClick(4)}
                                className={`pb-2 sm:pb-4 pt-4 text-sm sm:text-lg ${
                                    activeTab === 4
                                        ? "border-b-2 border-[#384AA0] text-[#384AA0] font-semibold"
                                        : "text-gray-500 hover:text-gray-700 font-medium"
                                }`}
                            >
                                Dokumen
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow bg-white p-4 sm:p-8">
                        <div className="max-w-full sm:max-w-4xl mx-auto">
                            <TransitionGroup>
                                <CSSTransition
                                    key={activeTab}
                                    timeout={500}
                                    classNames="fade" // gunakan classNames "fade" untuk animasi scale dan rotate
                                >
                                    <div>
                                        {activeTab === 1 && (
                                            <EditInformasiPribadi
                                                profilData={profilData}
                                                formData={formData}
                                                switchComponent={
                                                    switchComponent
                                                }
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
                                                switchComponent={
                                                    switchComponent
                                                }
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
                                                switchComponent={
                                                    switchComponent
                                                }
                                                setFormData={setFormData}
                                                handleChange={handleChange}
                                                isEditing={isEditing}
                                                toggleEdit={toggleEdit}
                                                handleSubmit={handleSubmit}
                                            />
                                        )}
                                        {activeTab === 4 && (
                                            <Dokumen
                                                switchComponent={
                                                    switchComponent
                                                }
                                                setFormData={setFormData}
                                                formData={formData}
                                            />
                                        )}
                                    </div>
                                </CSSTransition>
                            </TransitionGroup>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
