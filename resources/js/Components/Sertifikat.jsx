import React, { useRef, useState } from "react";
import { usePage } from "@inertiajs/react";
import html2canvas from "html2canvas";

export default function Sertifikat() {
    const { props } = usePage();
    const { historiPendaftaran } = props;
    const [isDownloading, setIsDownloading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const certificateRef = useRef();

    // Check if there is a registration history
    const isRegistered = historiPendaftaran && historiPendaftaran.length > 0;

    // Check for the status of the registration to determine what to display
    const hasPassed =
        isRegistered &&
        historiPendaftaran.some((data) => data.status === "lulus");
    const isAccepted =
        isRegistered &&
        historiPendaftaran.some((data) => data.status === "diterima");
    const isActive =
        isRegistered &&
        historiPendaftaran.some((data) => data.status === "aktif");
    const hasFailed =
        isRegistered &&
        historiPendaftaran.some((data) => data.status === "tidak lulus");

    const handleDownload = async () => {
        setIsDownloading(true);
        const canvas = await html2canvas(certificateRef.current, {
            backgroundColor: null,
            scale: 2,
        });
        const imageUrl = canvas.toDataURL("image/jpeg", 1.0);
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

            <div className="flex bg-white py-12 p-12 text-center flex-col">
                {isRegistered ? (
                    <>
                        {hasPassed ? (
                            // Jika status lulus, tampilkan opsi unduh sertifikat
                            <>
                                <p className="flex m-auto flex-col text-lg font-base text-slate-600 mb-4">
                                    <img
                                        src="storage/images/graduate.jpg"
                                        className="rounded-xl w-80 mb-10 m-auto"
                                        alt=""
                                    />
                                    Selamat, Anda telah menyelesaikan program
                                    magang. Silahkan mengunduh sertifikat di
                                    bawah ini.
                                </p>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-gradient-to-r from-[#FFB900] to-[#BB9124] text-white py-3 px-6 rounded-lg hover:opacity-90 transition w-full sm:w-auto"
                                >
                                    Lihat Sertifikat
                                </button>
                            </>
                        ) : isAccepted || isActive ? (
                            // Jika status diterima atau aktif, tampilkan pesan bahwa sertifikat akan tersedia di akhir magang
                            <p className="text-lg font-semibold text-blue-600 bg-blue-100/50 w-fit m-auto px-8 py-2 border border-1 border-blue-600 rounded-xl">
                                Sertifikat akan tersedia setelah anda lulus
                                program magang.
                            </p>
                        ) : hasFailed ? (
                            // Jika status tidak lulus, tampilkan pesan tidak lulus
                            <p className="text-lg font-semibold text-red-600 bg-red-100/50 w-fit m-auto px-8 py-2 border border-1 border-red-600 rounded-xl">
                                Mohon maaf atas beberapa pertimbangan, Anda
                                dinyatakan tidak lulus program magang.
                            </p>
                        ) : null}
                    </>
                ) : (
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
                )}
            </div>

            {isModalOpen && hasPassed && (
                <div className="fixed inset-0 flex justify-center items-center z-100 bg-black bg-opacity-50">
                    <div className="mt-36 pt-8 pb-20 bg-white p-8 max-w-full mx-auto relative shadow-lg max-h-full overflow-y-auto z-100">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-xl font-bold text-gray-600"
                        >
                            X
                        </button>

                        {historiPendaftaran.map((data, index) =>
                            data.status === "lulus" ? (
                                <div
                                    key={index}
                                    className="flex flex-col items-center mb-8"
                                >
                                    <p className="mb-4 ">
                                        <b>
                                            Sertifikat Magang {data.nama_batch}
                                        </b>{" "}
                                        ({data.tanggal_mulai} -{" "}
                                        {data.tanggal_berakhir})
                                    </p>
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
                                                "rgba(255, 255, 255, 1)",
                                            backgroundBlendMode: "overlay",
                                        }}
                                    >
                                        {/* Konten sertifikat */}
                                        <div className="absolute top-5">
                                            <img
                                                src="/storage/images/logo-kemlu.png"
                                                alt="Logo Kemlu"
                                                className="w-28 mx-auto"
                                            />
                                        </div>
                                        <div
                                            style={{
                                                fontFamily: "'Candara', serif",
                                            }}
                                        >
                                            <h2 className="text-lg font-bold text-center mt-6">
                                                <p className="text-sky-900 ">
                                                    KEMENTERIAN LUAR NEGERI
                                                </p>
                                                <p className="text-red-800">
                                                    REPUBLIK INDONESIA
                                                </p>
                                            </h2>
                                            <h2 className="text-4xl font-extrabold py-2 mb-2 text-center">
                                                SERTIFIKAT
                                            </h2>
                                            {/* Detail Sertifikat */}
                                            <div className="ml-4 mr-4 text-md leading-7 text-gray-800 mb-2">
                                                <p className="ml-16 mb-4 text-lg">
                                                    Dengan ini menerangkan
                                                    dengan sesungguhnya bahwa:
                                                </p>
                                                {/* Detail Mahasiswa */}
                                                <div className="flex gap-1 mb-4 ml-16">
                                                    <div className="col-span-4 text-left pr-3 text-lg">
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
                                                                    className="col-span-1 text-center text-lg"
                                                                >
                                                                    :
                                                                </div>
                                                            ))}
                                                    </div>
                                                    <div className="col-span-7 text-lg text-left">
                                                        <p>{data.nama}</p>
                                                        <p>{data.nim}</p>
                                                        <p>{data.jurusan}</p>
                                                        <p>{data.fakultas}</p>
                                                        <p>
                                                            {data.universitas}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="ml-16 mr-12 text-lg">
                                                    Yang bersangkutan telah
                                                    menyelesaikan magang di unit
                                                    kerja Badan Strategi
                                                    Kebijakan Luar Negeri
                                                    (BSKLN), Kementerian Luar
                                                    Negeri RI, pada tanggal{" "}
                                                    <b>{data.tanggal_mulai}</b>{" "}
                                                    sampai dengan{" "}
                                                    <b>
                                                        {data.tanggal_berakhir}
                                                    </b>{" "}
                                                    pada {data.posisi_magang}.
                                                </p>
                                            </div>
                                            <div className="flex justify-end pr-16 items-center w-full text-xl">
                                                <div className="w-28 h-36 border border-gray-300 flex items-center justify-center text-gray-500 pl-2 ">
                                                    <img
                                                        src={data.pas_foto}
                                                        alt="Pas Foto"
                                                        className="pr-2"
                                                    />
                                                </div>
                                                <div className="text-center text-lg">
                                                    <p>
                                                        Jakarta,{" "}
                                                        {data.tanggal_berakhir}
                                                    </p>
                                                    <p>
                                                        Sekretaris BSKLN, Kemlu
                                                        RI
                                                    </p>
                                                    <img
                                                        src="/storage/images/ttd.png"
                                                        alt=""
                                                        className="w-24 mx-auto mt-4"
                                                    />
                                                    <p className="font-bold">
                                                        Nina Kurnia Widhi
                                                    </p>
                                                    <p>
                                                        NIP. 19691029 199503 2
                                                        001
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleDownload}
                                        className="bg-gradient-to-r mb-8 from-[#FFB900] to-[#BB9124] text-white py-3 px-6 rounded-lg hover:opacity-90 transition w-full sm:w-auto mt-6"
                                    >
                                        {isDownloading
                                            ? "Mengunduh..."
                                            : "Download Sertifikat "}
                                    </button>
                                    <div className="mt-10 border-1 w-full border border-slate-200"></div>
                                </div>
                            ) : null
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
