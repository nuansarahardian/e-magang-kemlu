import React, { useState } from "react";
import KelengkapanBerkas from "@/components/KelengkapanBerkas";
import PernyataanMagang from "@/components/PernyataanMagang";

function DaftarMagang() {
    const [currentPage, setCurrentPage] = useState(1);

    const nextPage = () => setCurrentPage(2);
    const previousPage = () => setCurrentPage(1);

    return (
        <div className="max-w-2xl mx-auto p-8">
            <h2 className="text-3xl font-semibold mb-4 text-gray-800 text-center">
                Daftar Magang
            </h2>
            <p className="text-gray-600 mb-8 text-center">
                Pastikan seluruh informasi dan berkas di bawah ini sudah benar
                dan sesuai dengan data kamu ya.
            </p>

            {currentPage === 1 ? (
                <>
                    <KelengkapanBerkas />
                    <div className="flex justify-end mt-8">
                        <button
                            onClick={nextPage}
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-200 ease-in-out"
                        >
                            Selanjutnya
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <PernyataanMagang />
                    <div className="flex justify-between items-center mt-8">
                        <button
                            onClick={previousPage}
                            className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition duration-200 ease-in-out"
                        >
                            Kembali
                        </button>
                        <button className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition duration-200 ease-in-out">
                            Daftar
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default DaftarMagang;
