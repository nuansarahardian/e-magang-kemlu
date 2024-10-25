import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";
import CardPosisi from "@/Components/CardPosisi";
import DetailPosisi from "@/Components/DetailPosisi";

export default function PosisiMagang() {
    const { props } = usePage(); // Mengambil data dari backend melalui Inertia
    const { positions } = props; // Mengambil data posisi magang yang dikirim dari server

    const [selectedPosition, setSelectedPosition] = useState(null);

    return (
        <div className="relative bg-white min-h-screen overflow-hidden">
            <Head title="Posisi Magang" />
            <AuthenticatedLayout />

            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#FFB900] to-[#FFDD57] rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-br from-[#5E7ADD] to-[#384AA0] rounded-full blur-3xl opacity-30"></div>

            <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-6 relative z-10">
                {/* CardPosisi for the left container */}
                <div className="lg:w-1/3 bg-[#F7F6F8] border border-gray-400 shadow-md rounded-lg p-8">
                    <CardPosisi
                        positions={positions}
                        setSelectedPosition={setSelectedPosition}
                    />
                </div>

                {/* DetailPosisi for the right container */}
                <div className="lg:w-2/3 bg-[#F7F6F8] border border-gray-400 shadow-md rounded-lg p-6">
                    <DetailPosisi selectedPosition={selectedPosition} />
                </div>
            </div>

            <Footer />
        </div>
    );
}
