import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { usePage } from "@inertiajs/react";

export default function PreviewCV() {
    const cvRef = useRef();

    // Ambil data dari Inertia props
    const { profilData } = usePage().props;

    const handleDownloadPDF = async () => {
        const input = cvRef.current;
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 10;
        const imgWidth = pageWidth - 2 * margin;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = margin;

        pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - 2 * margin;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight + margin;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
            heightLeft -= pageHeight - 2 * margin;
        }

        pdf.save("CV-" + (profilData.namaLengkap || "Preview") + ".pdf");
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="flex justify-end space-x-4 mb-4 pr-4 pt-4">
                <button
                    onClick={handleDownloadPDF}
                    className="bg-[#328945] text-white py-2 px-4 rounded-md hover:bg-green-600 shadow-sm transition"
                >
                    Download PDF
                </button>
            </div>

            {/* CV Preview */}
            <div
                ref={cvRef}
                className="a4-preview bg-white text-gray-900 mx-auto p-8 md:px-12 sm:px-6"
            >
                {/* Section 1: Informasi Pribadi */}
                <div className="text-center mb-10">
                    <img
                        src={profilData.foto}
                        alt="Foto Profil"
                        className="w-[100px] h-[120px] mx-auto mb-4"
                    />
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-3xl">
                        {profilData.nama}
                    </h1>
                    <p className="text-base text-gray-600 sm:text-sm">
                        {profilData.email} | {profilData.noHp}
                    </p>
                </div>

                <hr className="my-4 border-gray-300" />

                {/* Section 2: Informasi Pendidikan */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 sm:text-lg">
                        Informasi Pendidikan
                    </h2>
                    <p className="text-sm text-gray-700 sm:text-xs">
                        <strong>{profilData.asalUniversitas}</strong> -{" "}
                        {profilData.jurusan}
                    </p>
                    <p className="text-sm text-gray-700 sm:text-xs">
                        {profilData.fakultas} | Semester {profilData.semester}
                    </p>
                    <p className="text-sm text-gray-700 sm:text-xs">
                        IPK: {profilData.IPK}
                    </p>
                </div>

                <hr className="my-4 border-gray-300" />

                {/* Section 3: Keterampilan */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 sm:text-lg">
                        Keterampilan
                    </h2>
                    <ul className="list-disc list-inside text-sm text-gray-700 sm:text-xs">
                        {profilData.keterampilan &&
                            profilData.keterampilan.map((skill, index) => (
                                <li key={index}>
                                    {skill.nama_keterampilan} - Level{" "}
                                    {skill.level}
                                </li>
                            ))}
                    </ul>
                </div>

                <hr className="my-4 border-gray-300" />

                {/* Section 4: Pengalaman */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 sm:text-lg">
                        Pengalaman
                    </h2>
                    {profilData.pengalaman &&
                        profilData.pengalaman.map((pengalaman, index) => (
                            <div key={index} className="mb-4">
                                <p className="text-sm text-gray-700 sm:text-xs">
                                    <strong>{pengalaman.instansi}</strong> -{" "}
                                    {pengalaman.posisi}
                                </p>
                                <p className="text-sm text-gray-700 sm:text-xs">
                                    {new Date(
                                        pengalaman.tanggal_mulai
                                    ).toLocaleDateString()}{" "}
                                    -{" "}
                                    {new Date(
                                        pengalaman.tanggal_berakhir
                                    ).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-700 sm:text-xs">
                                    {pengalaman.deskripsi}
                                </p>
                                <hr className="my-4 border-gray-300" />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
