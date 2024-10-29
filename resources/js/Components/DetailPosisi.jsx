import React from "react";
import { Disclosure } from "@headlessui/react";
import { Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function DetailPosisi({ selectedPosition }) {
    const { isLoggedIn } = usePage().props;
    if (!selectedPosition) {
        return (
            <div className="flex items-center justify-center text-gray-600 text-lg h-full">
                Silakan pilih posisi magang untuk melihat detail.
            </div>
        );
    }

    // Tentukan label dan style tombol berdasarkan kondisi isRegistered dan isFull
    let applyButtonText = "Apply Now";
    let applyButtonStyle = "bg-[#2D3985] hover:bg-[#24306e]";
    let isButtonDisabled = false;

    if (selectedPosition.isRegistered) {
        applyButtonText = "Sudah Daftar";
        applyButtonStyle = "bg-gray-400 cursor-not-allowed";
        isButtonDisabled = true;
    }

    if (selectedPosition.isFull) {
        applyButtonText = selectedPosition.isRegistered
            ? "Sudah Daftar (Kuota Penuh)"
            : "Kuota Sudah Penuh";
        applyButtonStyle = "bg-red-400 cursor-not-allowed";
        isButtonDisabled = true;
    }

    const handleApplyClick = (e) => {
        if (!isLoggedIn) {
            e.preventDefault();
            Swal.fire({
                title: "Anda harus login!",
                text: "Silakan login untuk melanjutkan pendaftaran.",
                icon: "warning",
                confirmButtonText: "Login",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/login";
                }
            });
        } else if (isButtonDisabled) {
            e.preventDefault();
        }
    };
    return (
        <div className="w-full h-full bg-white border border-gray-300">
            <div className="relative w-full h-64">
                <img
                    src={selectedPosition.gambar || "/images/3.jpeg"}
                    alt="Detail Image"
                    className="object-cover w-full h-full"
                />
            </div>

            <div className="p-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-black mb-2">
                        Informasi Kegiatan
                    </h1>
                    <p className="text-[#86858D] text-[15px] font-semibold">
                        Berikut adalah rincian lengkap mengenai kegiatan yang
                        Anda pilih, termasuk posisi, batch, dan deskripsi
                        lengkap.
                    </p>
                </div>
            </div>

            <hr className="border-t-2 border-gray-200" />

            <div className="p-8">
                <div className="mb-0">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <h2 className="text-2xl font-bold text-black">
                            {selectedPosition.nama_posisi}
                        </h2>
                        <Link
                            href={`/pendaftaran/create/${selectedPosition.id}`}
                            className={`${applyButtonStyle} text-white font-bold py-2 px-6 rounded-lg w-full lg:w-auto text-center transition-all ease-in-out duration-300 transform ${
                                !isButtonDisabled ? "hover:scale-105" : ""
                            }`}
                            onClick={handleApplyClick}
                        >
                            {applyButtonText}
                        </Link>
                    </div>

                    {/* Status Kuota dan Pendaftaran */}
                    {selectedPosition.isRegistered && (
                        <p className="text-green-600 font-semibold mt-2">
                            Anda sudah terdaftar untuk posisi ini.
                        </p>
                    )}
                    {selectedPosition.isFull && (
                        <p className="text-red-600 font-semibold mt-2">
                            Kuota sudah penuh.
                        </p>
                    )}
                </div>
            </div>

            <hr className="border-t-2 border-gray-200" />

            <div className="p-8">
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead className="bg-[#2D3985] text-white">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-left text-[15px] font-semibold">
                                    Informasi
                                </th>
                                <th className="border border-gray-300 px-4 py-2 text-left text-[15px] font-semibold">
                                    Detail
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 text-gray-600 text-[15px]">
                                    Batch
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-gray-800 text-[15px]">
                                    {selectedPosition.nama_batch}
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 text-gray-600 text-[15px]">
                                    Durasi
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-gray-800 text-[15px]">
                                    {selectedPosition.tanggal_mulai} -{" "}
                                    {selectedPosition.tanggal_berakhir}
                                </td>
                            </tr>
                            <tr className="bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2 text-gray-600 text-[15px]">
                                    Kuota
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-gray-800 text-[15px]">
                                    {selectedPosition.kuota} Orang
                                </td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2 text-gray-600 text-[15px]">
                                    Jumlah Pendaftar
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-gray-800 text-[15px]">
                                    {selectedPosition.jumlah_pendaftar} Orang
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <hr className="border-t-2 border-gray-200" />

            <div className="p-8">
                <div>
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-semibold text-left text-black bg-gray-100 hover:bg-gray-200">
                                    <span>Tentang Issue</span>
                                    <svg
                                        className={`${
                                            open ? "transform rotate-180" : ""
                                        } w-5 h-5 text-gray-500`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-600 text-[15px]">
                                    {selectedPosition.deskripsi}
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>
            </div>
        </div>
    );
}
