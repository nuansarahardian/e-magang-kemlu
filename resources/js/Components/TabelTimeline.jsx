import React from "react";
import { usePage } from "@inertiajs/react";

export default function AgendaTable() {
    const { batches } = usePage().props; // Accessing batches data from Inertia's page props

    return (
        <section className="py-20 relative overflow-hidden bg-white">
            <div className="relative z-10 container mx-auto px-10 lg:px-12">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#162360] tracking-wide">
                        Agenda Magang
                    </h2>
                    <p
                        className="text-[#5E7ADD] text-lg mt-4 max-w-3xl mx-auto"
                        style={{ lineHeight: "1.6", fontWeight: 600 }}
                    >
                        Berikut adalah jadwal pendaftaran dan periode On Job
                        untuk Batch 1 hingga Batch 5.
                    </p>
                </div>

                {/* Card wrapping the table */}
                <div className="bg-white shadow-lg rounded-3xl">
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto text-center border-collapse rounded-3xl">
                            <thead className="bg-gradient-to-r from-[#2D3985] to-[#5E7ADD] text-white">
                                <tr>
                                    <th className="px-6 py-4 text-lg font-semibold rounded-tl-3xl">
                                        Batch
                                    </th>
                                    <th className="px-6 py-4 text-lg font-semibold">
                                        Pendaftaran
                                    </th>
                                    <th className="px-6 py-4 text-lg font-semibold rounded-tr-3xl">
                                        On Job
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {batches.map((batch, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 text-gray-800 text-[15px] font-medium">
                                            {batch.nama_batch}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-[15px]">
                                            {batch.tanggal_pendaftaran}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 text-[15px]">
                                            {batch.tanggal_mulai} -{" "}
                                            {batch.tanggal_berakhir}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
