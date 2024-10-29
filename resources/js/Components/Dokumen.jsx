import React, { useRef } from "react";
import { usePage, router } from "@inertiajs/react";
import Swal from "sweetalert2";

const Dokumen = () => {
    // Mengambil data dari Inertia props
    const { profilData } = usePage().props;

    // Pastikan data dokumen selalu ada dengan memberikan nilai default
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
            category: "Surat Permohonan",
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

                    onSuccess: () => {
                        Swal.fire(
                            "Berhasil!",
                            response.props.flash.success,
                            "success"
                        ).then(() => {
                            window.location.reload(); // Refresh halaman setelah berhasil dihapus
                        });
                    },
                    onError: (errors) => {
                        console.log("Terjadi kesalahan: ", errors);
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

    // Referensi input file untuk masing-masing dokumen
    const fileInputRefs = {
        KTM: useRef(null),
        surat_permohonan: useRef(null),
        transkrip_nilai: useRef(null),
    };

    // Fungsi untuk membuka file explorer
    const triggerFileInput = (type) => {
        if (fileInputRefs[type]) {
            fileInputRefs[type].current.click();
        }
    };

    const handleFileChange = (type, event) => {
        const file = event.target.files[0];
        if (file) {
            const maxFileSize = 2 * 1024 * 1024; // 10MB dalam bytes
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
                    console.log("Terjadi kesalahan: ", errors);
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
        <div className="px-3 ">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Kelengkapan Dokumen
            </h3>
            <p className="text-sm text-gray-600 mb-6">
                Lengkapi dokumen untuk mempermudah proses pendaftaran magang.
            </p>
            <div className="space-y-8">
                {documents.map((doc, index) => (
                    <div key={index} className="space-y-2">
                        <h4 className="text-lg font-medium text-gray-700">
                            {doc.category}
                        </h4>
                        <div className="flex items-center justify-between border border-gray-200 p-4 rounded-lg bg-gray-50">
                            <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-500 mr-3"
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
                                    <p className="font-semibold text-gray-700">
                                        {doc.name}
                                    </p>
                                    {doc.date && (
                                        <p className="text-sm text-gray-500">
                                            {doc.date}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                {doc.isUploaded ? (
                                    <>
                                        <a
                                            href={doc.url}
                                            className="px-3 py-1 bg-[#5E7ADD]/20 text-[#162360] rounded hover:bg-[#5E7ADD] font-semibold"
                                        >
                                            Lihat file
                                        </a>
                                        <button
                                            onClick={() =>
                                                handleDelete(doc.type)
                                            }
                                            className="px-3 py-1 bg-[#162360] text-white hover:bg-blue-800 rounded"
                                        >
                                            Delete
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type="file"
                                            ref={fileInputRefs[doc.type]}
                                            onChange={(e) =>
                                                handleFileChange(doc.type, e)
                                            }
                                            className="hidden"
                                        />
                                        <button
                                            onClick={() =>
                                                triggerFileInput(doc.type)
                                            }
                                            className="px-3 py-1 bg-[#5E7ADD]/20 text-[#162360] rounded hover:bg-[#5E7ADD] font-semibold"
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
