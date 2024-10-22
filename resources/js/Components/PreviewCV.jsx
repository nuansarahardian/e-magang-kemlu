import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function PreviewCV() {
    const cvRef = useRef();

    const formData = {
        namaLengkap: 'Rudi Aldo Hardika',
        email: 'rudi.hardika@mail.com',
        noHp: '08123456789',
        asalUniversitas: 'Institut Teknologi Sepuluh Nopember',
        jurusan: 'Sistem Informasi',
        fakultas: 'Fakultas Teknologi Informasi',
        ipk: '3.72',
        semester: '6',
        keterampilan: [
            { namaKeterampilan: 'Java', levelKeterampilan: 'Mahir' },
            { namaKeterampilan: 'Python', levelKeterampilan: 'Menengah' },
            { namaKeterampilan: 'MySQL', levelKeterampilan: 'Mahir' },
            { namaKeterampilan: 'AWS', levelKeterampilan: 'Pemula' },
        ],
        pengalamanOrganisasi: [
            {
                namaOrganisasi: 'Himpunan Mahasiswa Sistem Informasi',
                posisi: 'Ketua Divisi IT',
                tanggalMulai: new Date('2021-01-01'),
                tanggalSelesai: new Date('2021-12-31'),
                deskripsi: 'Memimpin divisi IT dalam berbagai kegiatan internal dan eksternal fakultas.',
            },
            {
                namaOrganisasi: 'BEM ITS',
                posisi: 'Staf Divisi Media dan Komunikasi',
                tanggalMulai: new Date('2020-01-01'),
                tanggalSelesai: new Date('2020-12-31'),
                deskripsi: 'Membantu pengelolaan komunikasi dan media publikasi acara BEM.',
            }
        ],
        perusahaan: 'PT ABC Teknologi',
        posisi: 'Backend Developer Intern',
        tanggalMulai: new Date('2023-07-01'),
        tanggalSelesai: new Date('2023-09-30'),
        deskripsiPengalaman: 'Mengembangkan API untuk aplikasi e-commerce dan bekerja dengan tim pengembangan untuk memperbaiki bug dan meningkatkan performa sistem.',
    };

    const handleDownloadPDF = async () => {
        const input = cvRef.current;
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 10;
        const imgWidth = pageWidth - 2 * margin;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = margin;

        pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - 2 * margin;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight + margin;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
            heightLeft -= pageHeight - 2 * margin;
        }

        pdf.save('CV-' + (formData.namaLengkap || 'Preview') + '.pdf');
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
            <div ref={cvRef} className="bg-white text-gray-900 mx-auto max-w-4xl p-8 md:px-12 sm:px-6">
                {/* Section 1: Informasi Pribadi */}
                <div className="text-center mb-10">
                    {/* Foto di atas nama */}
                    <img
                        src="/images/fotoprofil.jpg"
                        alt="Foto Profil"
                        className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                    />
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-3xl">{formData.namaLengkap}</h1>
                    <p className="text-base text-gray-600 sm:text-sm">
                        {formData.email} | {formData.noHp}
                    </p>
                </div>

                {/* Pembatas */}
                <hr className="my-4 border-gray-300" />

                {/* Section 2: Informasi Pendidikan */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 sm:text-lg">Informasi Pendidikan</h2>
                    <p className="text-sm text-gray-700 sm:text-xs"><strong>{formData.asalUniversitas}</strong> - {formData.jurusan}</p>
                    <p className="text-sm text-gray-700 sm:text-xs">{formData.fakultas} | Semester {formData.semester}</p>
                    <p className="text-sm text-gray-700 sm:text-xs">IPK: {formData.ipk}</p>
                </div>

                {/* Pembatas */}
                <hr className="my-4 border-gray-300" />

                {/* Section 3: Keterampilan */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 sm:text-lg">Keterampilan</h2>
                    <ul className="list-disc list-inside text-sm text-gray-700 sm:text-xs">
                        {formData.keterampilan.map((skill, index) => (
                            <li key={index}>{skill.namaKeterampilan} - Level {skill.levelKeterampilan}</li>
                        ))}
                    </ul>
                </div>

                {/* Pembatas */}
                <hr className="my-4 border-gray-300" />

                {/* Section 4: Pengalaman */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 sm:text-lg">Pengalaman</h2>
                    {formData.pengalamanOrganisasi.map((pengalaman, index) => (
                        <div key={index} className="mb-4">
                            <p className="text-sm text-gray-700 sm:text-xs"><strong>{pengalaman.namaOrganisasi}</strong> - {pengalaman.posisi}</p>
                            <p className="text-sm text-gray-700 sm:text-xs">{pengalaman.tanggalMulai.toLocaleDateString()} - {pengalaman.tanggalSelesai.toLocaleDateString()}</p>
                            <p className="text-sm text-gray-700 sm:text-xs">{pengalaman.deskripsi}</p>

                            {/* Pembatas antara pengalaman */}
                            <hr className="my-4 border-gray-300" />
                        </div>
                    ))}
                    <div className="mb-4">
                        <p className="text-sm text-gray-700 sm:text-xs"><strong>{formData.perusahaan}</strong> - {formData.posisi}</p>
                        <p className="text-sm text-gray-700 sm:text-xs">{formData.tanggalMulai.toLocaleDateString()} - {formData.tanggalSelesai.toLocaleDateString()}</p>
                        <p className="text-sm text-gray-700 sm:text-xs">{formData.deskripsiPengalaman}</p>

                        {/* Pembatas antara pengalaman */}
                        <hr className="my-4 border-gray-300" />
                    </div>
                </div>
            </div>
        </div>
    );
}
