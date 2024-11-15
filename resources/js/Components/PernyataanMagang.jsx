import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const PernyataanMagang = ({ onAllItemsChecked }) => {
    const [checkedItems, setCheckedItems] = useState({
        item1: false,
        item2: false,
        item3: false,
        item4: false,
        item5: false,
        item6: false,
    });

    const handleCheck = (item) => {
        setCheckedItems((prevState) => ({
            ...prevState,
            [item]: !prevState[item],
        }));
    };

    // Menggunakan useEffect untuk mengirim status checklist ke parent setiap kali checkedItems berubah
    useEffect(() => {
        const allItemsChecked = Object.values(checkedItems).every(Boolean);
        onAllItemsChecked(allItemsChecked); // Mengirim status ke parent
    }, [checkedItems, onAllItemsChecked]);

    return (
        <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                Pernyataan Disiplin dan Komitmen Peserta
            </h3>
            <p className="text-gray-600 mb-6">
                Dengan ini saya menyatakan setuju dan berkomitmen dengan
                kepesertaan dalam proses rekrutmen magang Badan Strategi
                Kebijakan Luar Negeri Kementerian Luar Negeri:
            </p>

            <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                    <input
                        type="checkbox"
                        checked={checkedItems.item1}
                        onChange={() => handleCheck("item1")}
                        className="mr-3 mt-1 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">
                        Mematuhi semua peraturan dan tata tertib yang berlaku di
                        Badan Strategi Kebijakan Luar Negeri, Kementerian Luar
                        Negeri.
                    </span>
                </li>
                <li className="flex items-start">
                    <input
                        type="checkbox"
                        checked={checkedItems.item2}
                        onChange={() => handleCheck("item2")}
                        className="mr-3 mt-1 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">
                        Menjaga disiplin waktu dengan hadir tepat waktu setiap
                        hari dan menyelesaikan tugas-tugas sesuai dengan tenggat
                        yang diberikan.
                    </span>
                </li>
                <li className="flex items-start">
                    <input
                        type="checkbox"
                        checked={checkedItems.item3}
                        onChange={() => handleCheck("item3")}
                        className="mr-3 mt-1 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">
                        Bersikap professional dalam menjalankan tugas serta
                        menjaga etika kerja dan hubungan baik dengan rekan
                        kerja.
                    </span>
                </li>
                <li className="flex items-start">
                    <input
                        type="checkbox"
                        checked={checkedItems.item4}
                        onChange={() => handleCheck("item4")}
                        className="mr-3 mt-1 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">
                        Menghormati dan menjaga kerahasiaan informasi serta aset
                        milik Badan Strategi Kebijakan Luar Negeri, Kementerian
                        Luar Negeri.
                    </span>
                </li>
                <li className="flex items-start">
                    <input
                        type="checkbox"
                        checked={checkedItems.item5}
                        onChange={() => handleCheck("item5")}
                        className="mr-3 mt-1 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">
                        Berpartisipasi aktif dalam kegiatan atau program yang
                        berhubungan dengan pekerjaan dan meningkatkan
                        keterampilan serta pengetahuan saya untuk kemajuan
                        bersama
                    </span>
                </li>
                <li className="flex items-start">
                    <input
                        type="checkbox"
                        checked={checkedItems.item6}
                        onChange={() => handleCheck("item6")}
                        className="mr-3 mt-1 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">
                        Menerima sanksi atas pelanggaran yang saya lakukan
                        sesuai dengan aturan dan ketentuan yang berlaku di
                        Kementerian Luar Negeri.
                    </span>
                </li>
                <li className="flex items-start">
                    <span className="text-gray-700">
                        Dengan ini pendaftar dengan penuh kesadaran dan tanpa
                        paksaan dari pihak manapun menyatakan siap dan dapat
                        bertanggung jawab atas segala tindakan selama nantinya
                        mengikuti program Magang di Badan Strategi Kebijakan
                        Luar Negeri (BSKLN), Kementerian Luar Negeri.
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default PernyataanMagang;
