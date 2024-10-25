import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Footer from "@/Components/Footer";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    DocumentTextIcon,
    CalendarIcon,
    CheckBadgeIcon,
    ArrowRightOnRectangleIcon,
    ClipboardDocumentIcon,
    CogIcon,
} from "@heroicons/react/24/outline";

import CurriculumVitae from "@/Components/CurriculumVitae";
import EditCV from "@/Components/EditCV";
import Absensi from "@/Components/Absensi";
import Sertifikat from "@/Components/Sertifikat";
import StatusPendaftaran from "@/Components/StatusPendaftaran";
import PengaturanAkun from "@/Components/PengaturanAkun";

export default function Dashboard() {
    const { profilData } = usePage().props;

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
            localStorage.setItem("activeTab", defaultTab); // Simpan tab yang harus dibuka di EditCV
        }
    };

    useEffect(() => {
        // Cek jika pengguna datang dari halaman lain atau mengakses ulang
        const navigationType =
            window.performance.getEntriesByType("navigation")[0];

        if (navigationType && navigationType.type === "navigate") {
            // Jika pengguna datang dari halaman lain, atur ke komponen default
            setActiveComponent("cv");
            localStorage.removeItem("activeComponent");
        } else {
            // Jika halaman di-refresh, gunakan komponen yang disimpan
            const savedComponent = localStorage.getItem("activeComponent");
            if (savedComponent) {
                setActiveComponent(savedComponent);
            }
        }
    }, []);

    const renderComponent = () => {
        console.log("Komponen aktif:", activeComponent);
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
            case "absensi":
                return <Absensi />;
            case "sertifikat":
                return <Sertifikat />;
            case "status":
                return <StatusPendaftaran />;
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

            <div className="py-12 relative z-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex">
                    <div className="w-1/4 flex flex-col space-y-8 mr-8">
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
                            <ul className="space-y-6  ">
                                <li className="border-b border-gray-300 pb-4">
                                    <a
                                        href="#"
                                        onClick={() => switchComponent("cv")}
                                        className="hover:text-blue-500 flex items-center font-semibold"
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
                                        className="hover:text-blue-500 flex items-center font-semibold"
                                    >
                                        <ClipboardDocumentIcon className="w-5 h-5 mr-2 text-gray-500" />
                                        <span>Status Pendaftaran</span>
                                    </a>
                                </li>
                                <li className="border-b border-gray-300 pb-4">
                                    <a
                                        href="#"
                                        onClick={() =>
                                            switchComponent("absensi")
                                        }
                                        className="hover:text-blue-500 flex items-center font-semibold"
                                    >
                                        <CalendarIcon className="w-5 h-5 mr-2 text-gray-500" />
                                        <span>Absensi Peserta</span>
                                    </a>
                                </li>
                                <li className="border-b border-gray-300 pb-4">
                                    <a
                                        href="#"
                                        onClick={() =>
                                            switchComponent("sertifikat")
                                        }
                                        className="hover:text-blue-500 flex items-center font-semibold"
                                    >
                                        <CheckBadgeIcon className="w-5 h-5 mr-2 text-gray-500" />
                                        <span>Sertifikat Peserta</span>
                                    </a>
                                </li>
                                <li className="border-b border-gray-300 pb-4">
                                    <a
                                        href="#"
                                        onClick={() =>
                                            switchComponent("pengaturan")
                                        }
                                        className="hover:text-blue-500 flex items-center font-semibold"
                                    >
                                        <CogIcon className="w-5 h-5 mr-2 text-gray-500" />
                                        <span>Pengaturan Akun</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-red-500 hover:text-red-700 flex items-center font-semibold"
                                    >
                                        <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                                        <span>Logout</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="w-3/4 h-fit ">{renderComponent()}</div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
