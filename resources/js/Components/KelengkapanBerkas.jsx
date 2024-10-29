import React from "react";
import { FiFileText, FiEye, FiRefreshCcw } from "react-icons/fi";

const KelengkapanBerkas = () => {
    // Data dummy untuk informasi pribadi
    const dataPribadi = {
        name: "NUANSA SYAFRIE",
        email: "nuansadrive@gmail.com",
    };

    // Data dummy untuk berkas yang perlu dicek
    const documents = [
        {
            title: "KTM",
            items: [
                {
                    name: "KTM",
                    fileName: "KTM Nuansa.pdf",
                    date: "22 Aug 2024",
                },
            ],
        },
        {
            title: "Surat Permohonan",
            items: [
                {
                    name: "Surat Permohonan",
                    fileName: "SURAT PERMOHONAN.pdf",
                    date: "22 Aug 2024",
                },
            ],
        },
        {
            title: "Transkrip Nilai",
            items: [
                {
                    name: "Transkrip Nilai",
                    fileName: "TRANSKRIP NILAI NUANSA SEMESTER 6.pdf",
                    date: "22 Aug 2024",
                },
            ],
        },
    ];

    return (
        <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                Data Pribadi
            </h3>
            <div className="flex items-center mb-8 bg-gray-100 p-4 rounded-lg">
                <img
                    src="https://via.placeholder.com/50"
                    alt="Profile"
                    className="w-14 h-14 rounded-full mr-4 border-2 border-pink-500"
                />
                <div>
                    <h4 className="text-xl font-semibold text-gray-800">
                        {dataPribadi.name}
                    </h4>
                    <p className="text-gray-600">{dataPribadi.email}</p>
                </div>
            </div>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Cek Kelengkapan Berkas
            </h3>

            <div className="space-y-8">
                {documents.map((section, index) => (
                    <div key={index} className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-800">
                            {section.title}
                        </h4>
                        {section.items.map((doc, docIndex) => (
                            <div
                                key={docIndex}
                                className="flex items-center justify-between p-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg"
                            >
                                <div className="flex items-center space-x-4">
                                    <FiFileText className="text-pink-500 text-2xl" />
                                    <div>
                                        <p className="text-gray-500">
                                            {doc.fileName}
                                        </p>
                                        <p className="text-gray-400 text-sm">
                                            {doc.date}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <button className="flex items-center px-4 py-2 bg-pink-100 text-pink-600 rounded-lg font-medium hover:bg-pink-200 transition">
                                        <FiEye className="mr-2" />
                                        Lihat file
                                    </button>
                                    <button className="flex items-center px-4 py-2 bg-pink-100 text-pink-600 rounded-lg font-medium hover:bg-pink-200 transition">
                                        <FiRefreshCcw className="mr-2" />
                                        Ganti file
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KelengkapanBerkas;
