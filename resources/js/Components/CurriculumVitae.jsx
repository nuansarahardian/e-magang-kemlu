import { useState } from "react";
import React from "react";
import { Modal } from "react-responsive-modal";
import { usePage } from "@inertiajs/react";
import "react-responsive-modal/styles.css";

// Import komponen
import InformasiPribadi from "./InformasiPribadi";
import InformasiAkademik from "./InformasiAkademik";
import PengalamanOrganisasi from "./PengalamanOrganisasi";
import PreviewCV from "./PreviewCV";
import Dokumen from "./Dokumen";

export default function CurriculumVitae({ switchComponent }) {
    const { profilMahasiswa, progress } = usePage().props;
    const [formData, setFormData] = useState({
        namaLengkap: "",
        asalUniversitas: "",
    });

    const [activeTab, setActiveTab] = useState(1);
    const [isEditing, setIsEditing] = useState(false);
    const [open, setOpen] = useState(false);

    // Open/close modal functions
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    // Toggle edit mode
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    // Change tab function
    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    return (
        <div>
            <div className="bg-white shadow-md outline outline-1 outline-gray-200 sm:rounded-lg">
                <div className="bg-gradient-to-r from-[#384AA0] to-[#5E7ADD] text-white text-center rounded-t-lg py-6">
                    <h2 className="text-4xl font-bold mb-2 mt-2">
                        Curriculum Vitae
                    </h2>
                </div>

                <div className="py-6 px-8 mb-4">
                    <p className="text-lg max-w-full text-center">
                        E-Magang Kemlu menggunakan CV otomatis yang digenerate
                        berdasarkan informasi Profil Anda. Harap masukkan
                        informasi secara lengkap dan detail untuk memudahkan
                        pihak kementerian dalam membaca dan mengetahui tentang
                        diri Anda.
                    </p>
                </div>

                <div className="w-full bg-white py-6">
                    <div className="flex justify-between items-center mb-2 px-8">
                        <p className="text-gray-800 font-semibold">
                            Progress CV
                        </p>
                        <p className="text-[#2B1A70] font-medium">Detail</p>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2.5 mx-8">
                        <div
                            className="bg-[#2B1A70] h-2.5 rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between items-center mt-2 px-8">
                        <p className="text-gray-800">{`${progress}%`}</p>
                        <button
                            onClick={onOpenModal}
                            className="bg-gradient-to-r from-[#384AA0] to-[#5E7ADD] text-white py-2 px-4 rounded-full font-semibold mt-4"
                            aria-label="Open CV Preview"
                        >
                            Lihat CV &rarr;
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal open={open} onClose={onCloseModal} center>
                <PreviewCV
                    switchComponent={switchComponent}
                    setFormData={setFormData}
                    formData={formData}
                />
            </Modal>

            <div className="mt-4 shadow-md outline outline-1 outline-gray-200 sm:rounded-lg">
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
                        <button
                            onClick={() => handleTabClick(4)}
                            className={`pb-4 pt-4 ${
                                activeTab === 4
                                    ? "border-b-2 border-[#384AA0] text-[#384AA0] font-semibold"
                                    : "text-gray-500 hover:text-gray-700 font-medium"
                            } text-lg`}
                        >
                            Dokumen
                        </button>
                    </div>
                </div>

                <div className="flex-grow bg-white p-8">
                    <div className="max-w-4xl mx-auto">
                        {activeTab === 1 && (
                            <InformasiPribadi
                                profilMahasiswa={profilMahasiswa}
                                switchComponent={switchComponent}
                                setFormData={setFormData}
                                formData={formData}
                            />
                        )}
                        {activeTab === 2 && (
                            <InformasiAkademik
                                switchComponent={switchComponent}
                                setFormData={setFormData}
                                formData={formData}
                            />
                        )}
                        {activeTab === 3 && (
                            <PengalamanOrganisasi
                                switchComponent={switchComponent}
                                setFormData={setFormData}
                                formData={formData}
                            />
                        )}
                        {activeTab === 4 && (
                            <Dokumen
                                switchComponent={switchComponent}
                                setFormData={setFormData}
                                formData={formData}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
