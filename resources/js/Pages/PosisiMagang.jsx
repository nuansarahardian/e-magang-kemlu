import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";
import CardPosisi from "@/Components/CardPosisi";
import DetailPosisi from "@/Components/DetailPosisi";

export default function PosisiMagang({ hasAcceptedStatus }) {
    const { props } = usePage();
    const { positions } = props;
    console.log(positions);

    const [selectedPosition, setSelectedPosition] = useState(null);

    // Cari status pendaftaran dari posisi yang dipilih
    const isRegistered = selectedPosition
        ? selectedPosition.isRegistered
        : false;

    return (
        <div className="relative bg-white min-h-screen overflow-hidden">
            <Head title="Posisi Magang" />
            <AuthenticatedLayout />

            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#FFB900] to-[#FFDD57] rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-br from-[#5E7ADD] to-[#384AA0] rounded-full blur-3xl opacity-30"></div>

            <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-6 relative z-10">
                {/* CardPosisi for the left container */}
                <div className="lg:w-1/3 bg-[#fdfdff] border border-gray-300  shadow-sm rounded-lg p-8">
                    <CardPosisi
                        positions={positions}
                        setSelectedPosition={setSelectedPosition}
                    />
                </div>

                {/* DetailPosisi for the right container */}
                <div className="lg:w-2/3 ">
                    <DetailPosisi
                        selectedPosition={selectedPosition}
                        isRegistered={isRegistered}
                        hasAcceptedStatus={hasAcceptedStatus}
                    />
                </div>
            </div>

            <Footer />
        </div>
    );
}
