import React from "react";

export default function StatusPendaftaran({ historiPendaftaran = [] }) {
    const handleDownload = (id, status) => {
        if (status === "diterima") {
            if (id) {
                window.location.href = `/surat-penerimaan/${id}/download`;
            } else {
                alert("ID tidak ditemukan.");
            }
        } else {
            alert("Surat hanya bisa diunduh untuk status 'diterima'.");
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-gradient-to-r from-[#384AA0] to-[#5E7ADD] text-white text-center rounded-t-lg">
                <h2 className="text-4xl font-bold py-8">Status Pendaftaran</h2>
            </div>

            <div className="p-8 space-y-6">
                {historiPendaftaran.map((pendaftaran, index) => (
                    <div
                        key={index}
                        className="bg-[#F7F6F8] border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between"
                    >
                        <img
                            src="/images/1.jpeg"
                            alt="Company Logo"
                            className="w-20 h-20 rounded-full object-cover"
                        />
                        <div className="ml-6 flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {pendaftaran.posisi}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                                {pendaftaran.posisi}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                {pendaftaran.batch}
                            </p>
                        </div>
                        <div className="text-right">
                            <span
                                className={`px-4 py-2 rounded-full text-sm font-medium mb-2 inline-block ${
                                    pendaftaran.status === "diterima"
                                        ? "bg-[#328945] text-white"
                                        : pendaftaran.status === "Proses"
                                        ? "bg-[#FFB900] text-white"
                                        : "bg-[#B50000] text-white"
                                }`}
                            >
                                {pendaftaran.status}
                            </span>
                            <p className="text-sm text-gray-500 mt-2">
                                {pendaftaran.tanggal_pendaftaran}
                            </p>
                            <button
                                onClick={() =>
                                    handleDownload(
                                        pendaftaran.id,
                                        pendaftaran.status
                                    )
                                }
                                className="bg-[#384AA0] text-white mt-4 px-4 py-2 rounded-lg hover:bg-blue-600"
                            >
                                {pendaftaran.status === "diterima"
                                    ? "Unduh Surat Penerimaan"
                                    : "Tidak Tersedia"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
