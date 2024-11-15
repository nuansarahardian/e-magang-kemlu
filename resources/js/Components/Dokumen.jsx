import React, { useRef } from "react";
import { usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";

const Dokumen = () => {
    const { profilData } = usePage().props;

    const documents = [
        {
            category: "KTM",
            name: profilData.KTM ? profilData.KTM : "Dokumen belum diupload",
            date: profilData.KTM_date || null,
            url: profilData.KTM ? `/storage/${profilData.KTM}` : null,
            isUploaded: !!profilData.KTM,
            type: "KTM",
        },
        {
            category: "Surat Pengantar/Permohonan dari Universitas",
            name: profilData.surat_permohonan
                ? profilData.surat_permohonan
                : "Dokumen belum diupload",
            date: profilData.surat_permohonan_date || null,
            url: profilData.surat_permohonan
                ? `/storage/${profilData.surat_permohonan}`
                : null,
            isUploaded: !!profilData.surat_permohonan,
            type: "surat_permohonan",
        },
        {
            category: "Transkrip Nilai",
            name: profilData.transkrip_nilai
                ? profilData.transkrip_nilai
                : "Dokumen belum diupload",
            date: profilData.transkrip_nilai_date || null,
            url: profilData.transkrip_nilai
                ? `/storage/${profilData.transkrip_nilai}`
                : null,
            isUploaded: !!profilData.transkrip_nilai,
            type: "transkrip_nilai",
        },
    ];

    const handleDelete = (type) => {
        Swal.fire({
            title: "Anda yakin?",
            text: "Dokumen ini akan dihapus dan tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/dokumen/delete/${type}`, {
                    preserveState: true,
                    preserveScroll: true,
                    onSuccess: (page) => {
                        Swal.fire(
                            "Berhasil!",
                            page.props.flash.success,
                            "success"
                        ).then(() => {
                            window.location.reload();
                        });
                    },
                    onError: (errors) => {
                        Swal.fire(
                            "Gagal!",
                            "Terjadi kesalahan saat menghapus dokumen.",
                            "error"
                        );
                    },
                });
            }
        });
    };

    const fileInputRefs = useRef({});

    const triggerFileInput = (type) => {
        if (fileInputRefs.current[type]) {
            fileInputRefs.current[type].click();
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

            router.post(`/dokumen/upload/${type}`, formData, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Berhasil!",
                        text: "File berhasil diunggah!",
                        confirmButtonText: "OK",
                    });
                },
                onError: (errors) => {
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
        <div className="px-3">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 sm:mb-4">
                Kelengkapan Dokumen
            </h3>
            <p className="text-xs sm:text-sm text-gray-600  mb-2 sm:mb-3">
                Lengkapi dokumen untuk mempermudah proses pendaftaran magang.
            </p>
            <p className="sm:text-sm mb-3 sm:mb-4 text-xs text-yellow-600 bg-yellow-100/50 rounded-xl py-2 px-4 w-fit border border-1 border-yellow-400">
                File yang diizinkan adalah <b>PDF. png, jpg, jpeg.</b> dengan
                maksimal ukuran <b>2MB</b> .
            </p>
            <div className="space-y-6 sm:space-y-8">
                {documents.map((doc, index) => (
                    <div key={index} className="space-y-2">
                        <h4 className="text-lg sm:text-xl font-medium text-gray-700">
                            {doc.category}
                        </h4>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border border-gray-200 p-3 sm:p-4 rounded-lg bg-gray-50">
                            <div className="flex items-start sm:items-center mb-2 sm:mb-0">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 mr-2 sm:mr-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 8h10M7 12h4m-6 4h14M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"
                                    />
                                </svg>
                                <div>
                                    <p className="text-sm sm:text-base font-semibold text-gray-700">
                                        {doc.name}
                                    </p>
                                    {doc.date && (
                                        <p className="text-xs sm:text-sm text-gray-500">
                                            {doc.date}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex space-x-2 sm:space-x-3">
                                {doc.isUploaded ? (
                                    <>
                                        <a
                                            href={doc.url}
                                            className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-[#5E7ADD]/20 text-[#162360] rounded hover:bg-[#5E7ADD] font-semibold"
                                        >
                                            Lihat file
                                        </a>
                                        <button
                                            onClick={() =>
                                                handleDelete(doc.type)
                                            }
                                            className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-[#162360] text-white hover:bg-blue-800 rounded"
                                        >
                                            Delete
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type="file"
                                            ref={(el) =>
                                                (fileInputRefs.current[
                                                    doc.type
                                                ] = el)
                                            }
                                            onChange={(e) =>
                                                handleFileChange(doc.type, e)
                                            }
                                            className="hidden"
                                        />
                                        <button
                                            onClick={() =>
                                                triggerFileInput(doc.type)
                                            }
                                            className="text-xs sm:text-sm px-2 sm:px-3 py-1 bg-[#5E7ADD]/20 text-[#162360] rounded hover:bg-[#5E7ADD] font-semibold"
                                        >
                                            Upload file
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dokumen;
