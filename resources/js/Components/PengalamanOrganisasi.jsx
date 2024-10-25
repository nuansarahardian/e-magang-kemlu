import React from "react";
import { usePage } from "@inertiajs/react";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function PengalamanOrganisasi({ switchComponent }) {
    // Mengambil data dari Inertia page props
    const { profilData } = usePage().props;

    // Function untuk switch ke mode edit
    const handleEditClick = () => {
        switchComponent("editpengalaman"); // Panggil fungsi untuk mengaktifkan EditPengalaman
    };

    // Mengambil data pengalaman dan keterampilan dari props
    const pengalamanList = profilData?.pengalaman || [];
    const keterampilanList = profilData?.keterampilan || [];

    return (
        <div className="px-3 ">
            <div className="flex items-center justify-between mb-1">
                <h3 className="text-2xl font-bold text-gray-800">
                    Pengalaman Organisasi & Keterampilan
                </h3>

                <button
                    type="button"
                    onClick={handleEditClick}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <PencilIcon className="w-6 h-6" />
                </button>
            </div>
            <p className="text-gray-600  mb-8 border-b pb-6 border-gray-300">
                Pastikan data pengalaman dan keterampilan benar untuk
                mempermudah proses pendaftaran
            </p>

            {/* Section 1: Keterampilan */}
            <div className="mb-2">
                <h4 className="text-xl font-medium text-gray-700 mb-3">
                    Keterampilan
                </h4>
                <p className="text-sm text-gray-500 mb-5">
                    Berikut adalah daftar keterampilan yang telah Anda
                    tambahkan:
                </p>

                <div className="space-y-4">
                    {keterampilanList.length > 0 ? (
                        keterampilanList.map((skill, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-12 gap-4 items-center"
                            >
                                <div className="col-span-6">
                                    <p className="text-lg font-semibold text-gray-700">
                                        {skill.nama_keterampilan}
                                    </p>
                                </div>
                                <div className="col-span-6">
                                    <p className="text-lg text-gray-700">
                                        {skill.level}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">
                            Belum ada keterampilan yang ditambahkan.
                        </p>
                    )}
                </div>
            </div>
            <div className=" mb-8 border-b pb-6 border-gray-300"></div>
            {/* Section 2: Pengalaman Organisasi */}
            <div>
                <h4 className="text-xl font-medium text-gray-700 mb-3">
                    Pengalaman Organisasi & Profesional
                </h4>
                <div className="space-y-6">
                    {pengalamanList.length > 0 ? (
                        pengalamanList.map((experience, index) => (
                            <div key={index} className="mb-6">
                                <div className="bg-gray-100 px-4 py-3 border border-gray-200 rounded-lg mb-3">
                                    <h5 className="text-lg font-semibold text-gray-800">
                                        {experience.instansi} -{" "}
                                        {experience.posisi}
                                    </h5>
                                    <p className="text-sm text-gray-600">
                                        {new Date(
                                            experience.tanggal_mulai
                                        ).toLocaleDateString("id-ID")}{" "}
                                        -{" "}
                                        {experience.tanggal_berakhir
                                            ? new Date(
                                                  experience.tanggal_berakhir
                                              ).toLocaleDateString("id-ID")
                                            : "Sekarang"}
                                    </p>
                                    <p className="mt-2 text-gray-700">
                                        {experience.deskripsi}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">
                            Belum ada pengalaman yang ditambahkan.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
