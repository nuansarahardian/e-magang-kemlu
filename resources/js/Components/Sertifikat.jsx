import React, { useRef, useState } from "react";
import { usePage } from "@inertiajs/react";
import html2canvas from "html2canvas";

export default function Sertifikat() {
    const { props } = usePage();
    const { historiPendaftaran } = props;

    const [isDownloading, setIsDownloading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const certificateRef = useRef();

    const handleDownload = async () => {
        setIsDownloading(true);
        const canvas = await html2canvas(certificateRef.current, {
            backgroundColor: null,
        });
        const imageUrl = canvas.toDataURL("image/jpeg");
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "Sertifikat.jpeg";
        link.click();
        setIsDownloading(false);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white shadow-md outline outline-1 outline-gray-200 sm:rounded-lg">
            <div className="bg-gradient-to-r from-[#384AA0] to-[#5E7ADD] text-white text-center rounded-t-lg">
                <h2 className="text-4xl font-bold py-8">Sertifikat</h2>
            </div>

            <div className="flex-grow bg-white py-12 p-12 text-center">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gradient-to-r from-[#FFB900] to-[#BB9124] text-white py-3 px-6 rounded-lg hover:opacity-90 transition w-full sm:w-auto"
                >
                    Lihat Sertifikat
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-100 bg-black bg-opacity-50">
                    <div className="mt-36 pt-8 pb-20 bg-white p-8 max-w-full mx-auto relative shadow-lg max-h-full overflow-y-auto z-100">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-xl font-bold text-gray-600"
                        >
                            X
                        </button>

                        {historiPendaftaran.length > 0 ? (
                            <>
                                <button
                                    onClick={handleDownload}
                                    className="bg-gradient-to-r mb-8 from-[#FFB900] to-[#BB9124] text-white py-3 px-6 rounded-lg hover:opacity-90 transition w-full sm:w-auto mt-6"
                                >
                                    {isDownloading
                                        ? "Mengunduh..."
                                        : "Download Sertifikat"}
                                </button>
                                <div
                                    ref={certificateRef}
                                    className="w-[280mm] h-[200mm] bg-white p-20 shadow-lg border relative flex flex-col items-center"
                                    style={{
                                        backgroundImage:
                                            "url('/storage/images/sertif.png')",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        backgroundRepeat: "no-repeat",
                                        backgroundColor:
                                            "rgba(255, 255, 255, 0.95)",
                                        backgroundBlendMode: "overlay",
                                    }}
                                >
                                    <div className="absolute top-20">
                                        <img
                                            src="/storage/images/logo-kemlu.png"
                                            alt="Logo Kemlu"
                                            className="w-20 mx-auto"
                                        />
                                    </div>

                                    <h2 className="text-base font-semibold text-center mt-14">
                                        Kementerian Luar Negeri
                                        <br />
                                        Republik Indonesia
                                    </h2>
                                    <h1 className="text-2xl font-bold mt-2 mb-6 text-center">
                                        SERTIFIKAT
                                    </h1>

                                    <div className="text-base leading-7 text-gray-800 mb-2">
                                        <p className="text-center mb-6">
                                            Dengan ini menerangkan dengan
                                            sesungguhnya bahwa:
                                        </p>
                                        <div className="flex gap-1 mb-6 justify-center">
                                            <div className="col-span-4 text-left pr-3 text-sm">
                                                <p>Nama</p>
                                                <p>NIM</p>
                                                <p>Jurusan/Prodi</p>
                                                <p>Fakultas</p>
                                                <p>Universitas</p>
                                            </div>

                                            <div className="flex flex-col">
                                                {Array(5)
                                                    .fill()
                                                    .map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className="col-span-1 text-center text-sm"
                                                        >
                                                            :
                                                        </div>
                                                    ))}
                                            </div>
                                            <div className="col-span-7 text-sm text-left">
                                                <p>
                                                    {historiPendaftaran[0].nama}
                                                </p>
                                                <p>
                                                    {historiPendaftaran[0].nim}
                                                </p>
                                                <p>
                                                    {
                                                        historiPendaftaran[0]
                                                            .jurusan
                                                    }
                                                </p>
                                                <p>
                                                    {
                                                        historiPendaftaran[0]
                                                            .fakultas
                                                    }
                                                </p>
                                                <p>
                                                    {
                                                        historiPendaftaran[0]
                                                            .universitas
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-center">
                                            Yang bersangkutan telah
                                            menyelesaikan magang di unit kerja
                                            Badan Strategi Kebijakan Luar Negeri
                                            (BSKLN), Kementerian Luar Negeri RI,
                                            pada tanggal{" "}
                                            <b>
                                                {
                                                    historiPendaftaran[0]
                                                        .tanggal_mulai
                                                }
                                            </b>{" "}
                                            sampai dengan{" "}
                                            <b>
                                                {
                                                    historiPendaftaran[0]
                                                        .tanggal_berakhir
                                                }
                                            </b>{" "}
                                            pada{" "}
                                            {
                                                historiPendaftaran[0]
                                                    .posisi_magang
                                            }
                                            .
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center w-full">
                                        <div className="w-28 h-36 border border-gray-300 flex items-center justify-center text-gray-500 text-sm">
                                            <img
                                                src={
                                                    historiPendaftaran[0]
                                                        .pas_foto
                                                }
                                                alt=""
                                            />
                                        </div>

                                        <div className="text-center text-sm">
                                            <p>
                                                Jakarta,{" "}
                                                {
                                                    historiPendaftaran[0]
                                                        .tanggal_berakhir
                                                }
                                            </p>
                                            <p className="mb-20">
                                                Sekretaris BPPK, Kemlu RI
                                            </p>
                                            <p className="font-bold">
                                                Nina Kurnia Widhi
                                            </p>
                                            <p>NIP. 19691029 199503 2 001</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className="text-center text-gray-700">
                                Belum ada sertifikat.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
