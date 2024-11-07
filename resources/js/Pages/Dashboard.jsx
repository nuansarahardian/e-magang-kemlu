import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    DocumentTextIcon,
    CheckBadgeIcon,
    ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";

import CurriculumVitae from "@/Components/CurriculumVitae";
import EditCV from "@/Components/EditCV";
import Sertifikat from "@/Components/Sertifikat";
import StatusPendaftaran from "@/Components/StatusPendaftaran";
import PengaturanAkun from "@/Components/PengaturanAkun";

export default function Dashboard() {
    const { profilData, historiPendaftaran } = usePage().props;

    const [activeComponent, setActiveComponent] = useState("cv");

    const [formData, setFormData] = useState({
        namaLengkap: "",
        tanggalLahir: null,
        jenisKelamin: "",
        alamatKTP: "",
        noHp: "",
        alamatDomisili: "",
        uploadFoto: "",
    });
    const switchComponent = (componentName, defaultTab) => {
        setActiveComponent(componentName);
        localStorage.setItem("activeComponent", componentName);
        if (defaultTab) {
            localStorage.setItem("activeTab", defaultTab);
        }
    };

    useEffect(() => {
        const navigationType =
            window.performance.getEntriesByType("navigation")[0];

        if (navigationType && navigationType.type === "navigate") {
            setActiveComponent("cv");
            localStorage.removeItem("activeComponent");
        } else {
            const savedComponent = localStorage.getItem("activeComponent");
            if (savedComponent) {
                setActiveComponent(savedComponent);
            }
        }
    }, []);

    const renderComponent = () => {
        switch (activeComponent) {
            case "cv":
                return (
                    <CurriculumVitae
                        switchComponent={switchComponent}
                        formData={formData}
                        setFormData={setFormData}
                    />
                );
            case "editcv":
                return (
                    <EditCV
                        switchComponent={switchComponent}
                        formData={formData}
                        setFormData={setFormData}
                    />
                );
            case "sertifikat":
                return <Sertifikat />;
            case "status":
                return (
                    <StatusPendaftaran
                        historiPendaftaran={historiPendaftaran}
                    />
                );
            case "pengaturan":
                return <PengaturanAkun />;
            default:
                return <CurriculumVitae switchComponent={switchComponent} />;
        }
    };

    return (
        <div className="relative min-h-screen bg-white z-10">
            <AuthenticatedLayout />
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#FFB900] to-[#FFDD57] rounded-full blur-3xl opacity-30 z-0"></div>
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-br from-[#5E7ADD] to-[#384AA0] rounded-full blur-3xl opacity-30 z-0"></div>

            <div className="py-12 relative z-10 p-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col lg:flex-row">
                    <div className="w-full lg:w-1/4 flex flex-col space-y-8 mb-8 lg:mb-0 lg:mr-8">
                        <div className="bg-white shadow-md outline outline-1 outline-gray-200 sm:rounded-lg p-6">
                            <div className="text-center">
                                <img
                                    src={profilData.foto}
                                    alt="Foto Profil"
                                    className="w-24 h-24 rounded-full mx-auto mb-4"
                                />
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {profilData.nama}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {profilData.universitas}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white shadow-md outline outline-1 outline-gray-200 sm:rounded-lg p-6">
                            <ul className="space-y-6">
                                <li className="border-b border-gray-300 pb-4">
                                    <a
                                        href="#"
                                        onClick={() => switchComponent("cv")}
                                        className={`flex items-center font-semibold hover:text-blue-500 ${
                                            activeComponent === "cv"
                                                ? "text-blue-500 border-blue-500"
                                                : "text-gray-900"
                                        }`}
                                    >
                                        <DocumentTextIcon className="w-5 h-5 mr-2 text-gray-500" />
                                        <span>Curriculum Vitae</span>
                                    </a>
                                </li>
                                <li className="border-b border-gray-300 pb-4">
                                    <a
                                        href="#"
                                        onClick={() =>
                                            switchComponent("status")
                                        }
                                        className={`flex items-center font-semibold hover:text-blue-500 ${
                                            activeComponent === "status"
                                                ? "text-blue-500 border-blue-500"
                                                : "text-gray-900"
                                        }`}
                                    >
                                        <ClipboardDocumentIcon className="w-5 h-5 mr-2 text-gray-500" />
                                        <span>Status Pendaftaran</span>
                                    </a>
                                </li>
                                <li className="border-b border-gray-300 pb-4">
                                    <a
                                        href="#"
                                        onClick={() =>
                                            switchComponent("sertifikat")
                                        }
                                        className={`flex items-center font-semibold hover:text-blue-500 ${
                                            activeComponent === "sertifikat"
                                                ? "text-blue-500 border-blue-500"
                                                : "text-gray-900"
                                        }`}
                                    >
                                        <CheckBadgeIcon className="w-5 h-5 mr-2 text-gray-500" />
                                        <span>Sertifikat Peserta</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-full lg:w-3/4 h-fit">
                        {renderComponent()}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
