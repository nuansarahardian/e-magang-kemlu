import React from "react";

export default function StatusPendaftaran({ historiPendaftaran = [] }) {
    // console.log("historiPendaftaran:", historiPendaftaran);
    const handleDownload = (id) => {
        if (id) {
            window.location.href = `/surat-penerimaan/${id}/download`;
        } else {
            alert("ID tidak ditemukan.");
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-white shadow-md outline outline-1 outline-gray-200 sm:rounded-lg">
                <div className="bg-gradient-to-r from-[#384AA0] to-[#5E7ADD] text-white text-center rounded-t-lg">
                    <h2 className="text-4xl font-bold py-8">
                        Status Pendaftaran
                    </h2>
                </div>

                <div className="p-8 space-y-6">
                    {historiPendaftaran.length === 0 ? (
                        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center ">
                            <img
                                src="storage/images/blank.png"
                                className="w-60 mb-8"
                                alt=""
                            />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                Anda belum melakukan pendaftaran.
                            </h3>
                            <p className="text-gray-600">
                                Yuk, daftar untuk memulai pengalaman magang yang
                                berharga!
                            </p>
                        </div>
                    ) : (
                        historiPendaftaran.map((pendaftaran, index) => (
                            <div
                                key={index}
                                className="bg-[#F7F6F8] border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start justify-between space-y-4 sm:space-y-0"
                            >
                                <img
                                    src={pendaftaran.gambar}
                                    alt="gambar posisi"
                                    className="w-20 h-20 rounded-md object-cover"
                                />
                                <div className="sm:ml-6 flex-1 text-center sm:text-left">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {pendaftaran.posisi}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {pendaftaran.nomor_registrasi}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {pendaftaran.nama_batch}
                                    </p>

                                    <div className="flex gap-2 mt-4 justify-center sm:justify-start">
                                        <div className="gap-1 flex flex-col">
                                            <p className="text-sm text-gray-500 ">
                                                Tanggal Mulai Magang{" "}
                                            </p>
                                            <p className="text-sm text-gray-500 ">
                                                Tanggal Berakhir{" "}
                                            </p>
                                        </div>
                                        <div className="flex flex-col text-sm text-gray-500 gap-1">
                                            <b>{pendaftaran.tanggal_mulai}</b>
                                            <b>
                                                {pendaftaran.tanggal_berakhir}
                                            </b>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center sm:text-right">
                                    <span
                                        className={`px-4 py-1 rounded-full text-md font-bold mb-2 inline-block ${
                                            pendaftaran.status === "diterima"
                                                ? "bg-yellow-100 text-yellow-600 border-1 border border-yellow-600" // Kuning untuk diterima
                                                : pendaftaran.status === "aktif"
                                                ? "bg-blue-100 text-blue-600 border-1 border border-blue-600" // Biru untuk aktif
                                                : pendaftaran.status === "lulus"
                                                ? "bg-green-100 text-green-600 border-1 border border-green-600" // Hijau untuk lulus
                                                : pendaftaran.status ===
                                                  "tidak lulus"
                                                ? "bg-red-100 text-red-600 border-1 border border-red-600" // Merah untuk tidak lulus
                                                : "bg-gray-300 text-black" // Default untuk status yang tidak diketahui
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
                                        Unduh Surat Penerimaan
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
