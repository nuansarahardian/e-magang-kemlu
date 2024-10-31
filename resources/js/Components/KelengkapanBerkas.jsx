import React, { useRef } from "react";
import { FiFileText, FiEye, FiRefreshCcw } from "react-icons/fi";
import Swal from "sweetalert2";
import { usePage, router } from "@inertiajs/react";

const KelengkapanBerkas = ({ dataPribadi, documents }) => {
    console.log(documents);
    const fileInputRefs = useRef({});

    const triggerFileInput = (key) => {
        if (fileInputRefs.current[key]) {
            fileInputRefs.current[key].click();
        }
    };

    const handleFileChange = (type, event) => {
        const file = event.target.files[0];
        if (file) {
            const maxFileSize = 2 * 1024 * 1024;
            if (file.size > maxFileSize) {
                Swal.fire({
                    icon: "error",
                    title: "Gagal!",
                    text: "Ukuran file terlalu besar. Maksimal 2MB.",
                    confirmButtonText: "Coba Lagi",
                });
                return;
            }

            const formData = new FormData();
            formData.append("file", file);

            // Ganti endpoint untuk mengganti file berdasarkan `type`
            router.post(`/dokumen/update/${type}`, formData, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil!",
                        text: "File berhasil diunggah!",
                        confirmButtonText: "OK",
                    }).then(() => {
                        window.location.reload();
                    });
                },
                onError: () => {
                    Swal.fire({
                        icon: "error",
                        title: "Gagal!",
                        text: "Terjadi kesalahan saat mengunggah file.",
                        confirmButtonText: "Coba Lagi",
                    });
                },
            });
        }
    };

    return (
        <div>
            <h3
                className="text-2xl font-semibold mb-6"
                style={{ color: "#1E40AF" }}
            >
                Data Pribadi
            </h3>
            <div
                className="flex items-center mb-8 p-4 rounded-lg"
                style={{ backgroundColor: "#DBEAFE" }}
            >
                <img
                    src={
                        dataPribadi?.profileImage ||
                        "https://via.placeholder.com/50"
                    }
                    alt="Profile"
                    className="w-14 h-14 rounded-full mr-4 border-2"
                    style={{ borderColor: "#1D4ED8" }}
                />
                <div>
                    <h4
                        className="text-xl font-semibold"
                        style={{ color: "#1D4ED8" }}
                    >
                        {dataPribadi?.name || "Nama tidak tersedia"}
                    </h4>
                    <p className="text-gray-600" style={{ color: "#374151" }}>
                        {dataPribadi?.email || "Email tidak tersedia"}
                    </p>
                </div>
            </div>

            <h3
                className="text-2xl font-semibold mb-4"
                style={{ color: "#1E40AF" }}
            >
                Cek Kelengkapan Berkas
            </h3>

            <div className="space-y-8">
                {documents.map((section, index) => (
                    <div key={index} className="space-y-4">
                        <h4
                            className="text-lg font-semibold"
                            style={{ color: "#1D4ED8" }}
                        >
                            {section.title}
                        </h4>
                        {section.items.map((doc, docIndex) => {
                            const uniqueKey = `${section.title}_${doc.name}`;
                            return (
                                <div
                                    key={uniqueKey}
                                    className="flex items-center justify-between p-4 rounded-lg"
                                    style={{
                                        backgroundColor: "#DBEAFE",
                                        border: "1px dashed #1D4ED8",
                                    }}
                                >
                                    <div className="flex items-center space-x-4">
                                        <FiFileText
                                            className="text-2xl"
                                            style={{ color: "#1D4ED8" }}
                                        />
                                        <div className="max-w-xs break-words">
                                            <p
                                                className="text-gray-500"
                                                style={{ color: "#1D4ED8" }}
                                            >
                                                {doc.fileName
                                                    ? doc.fileName
                                                          .split("/")
                                                          .pop()
                                                    : "File tidak tersedia"}
                                            </p>
                                            <p
                                                className="text-sm"
                                                style={{ color: "#374151" }}
                                            >
                                                {doc.date ||
                                                    "Tanggal tidak tersedia"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() =>
                                                window.open(doc.url, "_blank")
                                            }
                                            className="flex items-center px-4 py-2 rounded-lg font-medium transition"
                                            style={{
                                                backgroundColor: "#1E40AF",
                                                color: "#FFFFFF",
                                            }}
                                        >
                                            <FiEye className="mr-2" />
                                            Lihat file
                                        </button>
                                        {/* <input
                                            type="file"
                                            ref={(el) =>
                                                (fileInputRefs.current[
                                                    uniqueKey
                                                ] = el)
                                            }
                                            onChange={(e) =>
                                                handleFileChange(doc.name, e)
                                            }
                                            className="hidden"
                                        />
                                        <button
                                            onClick={() =>
                                                triggerFileInput(uniqueKey)
                                            }
                                            className="flex items-center px-4 py-2 rounded-lg font-medium transition"
                                            style={{
                                                backgroundColor: "#1E40AF",
                                                color: "#FFFFFF",
                                            }}
                                        >
                                            <FiRefreshCcw className="mr-2" />
                                            Ganti file
                                        </button> */}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KelengkapanBerkas;
