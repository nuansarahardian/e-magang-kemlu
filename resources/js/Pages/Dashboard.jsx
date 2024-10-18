import { useState } from 'react'; // Import useState untuk state management
import Footer from '@/Components/Footer';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { UserIcon, DocumentTextIcon, CalendarIcon, CheckBadgeIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'; // Import Heroicons Outline

// Import komponen yang akan ditampilkan
import ProfilPengguna from '@/Components/ProfilPengguna';
import CurriculumVitae from '@/Components/CurriculumVitae';
import Absensi from '@/Components/Absensi';
import Sertifikat from '@/Components/Sertifikat';

export default function Dashboard() {
    const [activeComponent, setActiveComponent] = useState('profil'); // Set default ke 'profil'

    // Fungsi untuk mengganti komponen berdasarkan menu yang diklik
    const renderComponent = () => {
        switch (activeComponent) {
            case 'profil':
                return <ProfilPengguna />;
            case 'cv':
                return <CurriculumVitae />;
            case 'absensi':
                return <Absensi />;
            case 'sertifikat':
                return <Sertifikat />;
            default:
                return <ProfilPengguna />; // Default ke ProfilPengguna
        }
    };

    return (
        <div className="relative min-h-screen bg-white z-10">
            <AuthenticatedLayout />

            {/* Dekorasi Background dengan z-index lebih rendah */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#FFB900] to-[#FFDD57] rounded-full blur-3xl opacity-30 z-0"></div>
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-br from-[#5E7ADD] to-[#384AA0] rounded-full blur-3xl opacity-30 z-0"></div>

            {/* Wrapper utama */}
            <div className="py-12 relative z-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex">
                    
                    {/* Sidebar Container - Terpisah menjadi dua bagian */}
                    <div className="w-1/4 flex flex-col space-y-8 mr-8">
                        
                        {/* Container Atas: Nama dan Nama Kampus */}
                        <div className="bg-white shadow-md outline outline-1 outline-gray-200 sm:rounded-lg p-6">
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-900">Rudi Aldo Hardika</h3>
                                <p className="text-sm text-gray-500">Institut Teknologi Sepuluh Nopember</p>
                            </div>
                        </div>

                        {/* Container Bawah: Menu Navigasi */}
                        <div className="bg-white shadow-md outline outline-1 outline-gray-200 sm:rounded-lg p-6">
                            <ul className="space-y-6 border-t border-gray-300 pt-4">
                                <li className="border-b border-gray-300 pb-4">
                                    <a href="#" onClick={() => setActiveComponent('profil')} className="hover:text-blue-500 flex items-center font-semibold">
                                        <UserIcon className="w-5 h-5 mr-2 text-gray-500" />
                                        <span>Profil</span>
                                    </a>
                                </li>
                                <li className="border-b border-gray-300 pb-4">
                                    <a href="#" onClick={() => setActiveComponent('cv')} className="hover:text-blue-500 flex items-center font-semibold">
                                        <DocumentTextIcon className="w-5 h-5 mr-2 text-gray-500" />
                                        <span>Curriculum Vitae</span>
                                    </a>
                                </li>
                                <li className="border-b border-gray-300 pb-4">
                                    <a href="#" onClick={() => setActiveComponent('absensi')} className="hover:text-blue-500 flex items-center font-semibold">
                                        <CalendarIcon className="w-5 h-5 mr-2 text-gray-500" />
                                        <span>Absensi</span>
                                    </a>
                                </li>
                                <li className="border-b border-gray-300 pb-4">
                                    <a href="#" onClick={() => setActiveComponent('sertifikat')} className="hover:text-blue-500 flex items-center font-semibold">
                                        <CheckBadgeIcon className="w-5 h-5 mr-2 text-gray-500" />
                                        <span>Sertifikat</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-red-500 hover:text-red-700 flex items-center font-semibold">
                                        <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                                        <span>Keluar</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="w-3/4 bg-white shadow-md outline outline-1 outline-gray-200 sm:rounded-lg">
                        {/* Render komponen berdasarkan menu yang diklik */}
                        {renderComponent()}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
