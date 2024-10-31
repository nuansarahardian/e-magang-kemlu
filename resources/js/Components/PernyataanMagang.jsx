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
        item7: false,
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
                Pernyataan Ketentuan dan Komitmen Peserta
            </h3>
            <p className="text-gray-600 mb-6">
                Dengan ini saya menyatakan setuju dan komitmen dengan
                kepesertaan dalam proses rekrutmen Badan Strategi Kebijakan Luar
                Negeri Kementerian Luar Negeri:
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
                        Menjalankan seluruh rangkaian proses yang berjalan di
                        Badan Strategi Kebijakan Luar Negeri Kementerian Luar
                        Negeri dengan penuh tanggung jawab, termasuk namun tidak
                        terbatas pada proses seleksi, pembekalan, pelaksanaan,
                        dan pembuatan laporan akhir program.
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
                        Menjaga kerahasiaan data Perusahaan atas pihak manapun,
                        serta tidak mengungkapkan/mempublikasikan informasi
                        rahasia kepada siapapun tanpa persetujuan tertulis dari
                        Perusahaan.
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
                        Menyediakan segala dokumen yang diperlukan sehubungan
                        dengan pelaksanaan dan proses rekrutmen dan/atau program
                        yang disediakan.
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
                        Bersedia ditempatkan di lokasi penempatan program yang
                        telah ditetapkan oleh Perusahaan.
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
                        Menggunakan dana bantuan yang diterima sehubungan dengan
                        pelaksanaan program (apabila ada) dengan sebaik-baiknya
                        sesuai dengan maksud dan tujuan yang telah ditetapkan
                        oleh kebijakan Perusahaan yang berlaku.
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
                        Menjaga nama baik, etika, dan citra diri sendiri,
                        perguruan tinggi, dan Perusahaan dan/atau institusi yang
                        dilamar.
                    </span>
                </li>
                <li className="flex items-start">
                    <input
                        type="checkbox"
                        checked={checkedItems.item7}
                        onChange={() => handleCheck("item7")}
                        className="mr-3 mt-1 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">
                        Dengan ini Pengguna menyatakan telah membaca, mengerti,
                        setuju dan patuh pada Syarat dan Ketentuan Penggunaan
                        serta Kebijakan Privasi Badan Strategi Kebijakan Luar
                        Negeri Kementerian Luar Negeri.
                    </span>
                </li>
            </ul>
        </div>
    );
};

export default PernyataanMagang;
