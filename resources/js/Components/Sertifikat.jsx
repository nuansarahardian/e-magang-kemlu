import { useState } from "react";

export default function Sertifikat() {
    const [isDownloading, setIsDownloading] = useState(false);

    // Fungsi untuk menangani aksi download
    const handleDownload = () => {
        setIsDownloading(true);
        // Simulasi pengunduhan
        const link = document.createElement("a");
        link.href = "/path/to/1.jpeg"; // Ubah path sesuai dengan letak gambar
        link.download = "Sertifikat.jpeg";
        link.click();
        setIsDownloading(false);
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Container atas: Heading dengan background gradient */}
            <div className="bg-gradient-to-r from-[#384AA0] to-[#5E7ADD] text-white text-center rounded-t-lg">
                <h2 className="text-4xl font-bold py-8">Sertifikat</h2>
            </div>

            {/* Container bawah: Gambar sertifikat dan tombol download */}
            <div className="flex-grow bg-white py-12 p-8">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Gambar Sertifikat */}
                    <img
                        src="/images/sertif.png" // Ubah path sesuai dengan lokasi gambar
                        alt="Sertifikat"
                        className="w-full h-auto rounded-lg shadow-md mb-6"
                    />

                    {/* Tombol Download dengan gradient */}
                    <button
                        onClick={handleDownload}
                        className="bg-gradient-to-r from-[#FFB900] to-[#BB9124] text-white py-3 px-6 rounded-lg hover:opacity-90 transition w-full sm:w-auto"
                    >
                        {isDownloading ? "Mengunduh..." : "Download Sertifikat"}
                    </button>
                </div>
            </div>
        </div>
    );
}
