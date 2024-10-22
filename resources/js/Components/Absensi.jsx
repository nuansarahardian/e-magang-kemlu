import { useState } from 'react';

export default function Absensi() {
    const [attendanceStatus, setAttendanceStatus] = useState({
        hadir: 10,
        sakit: 2,
        izin: 1,
        alpha: 0
    });

    const handleStatusChange = (status) => {
        alert(`Anda memilih: ${status}`);
    };

    return (
        <div className="min-h-screen flex flex-col space-y-6"> {/* Jarak antar container dibuat konsisten */}
            {/* Container atas: Heading dengan background gradient */}
            <div className="bg-gradient-to-r from-[#384AA0] to-[#5E7ADD] text-white text-center rounded-t-lg">
                <h2 className="text-4xl font-bold py-8">Absensi</h2>
            </div>

            {/* Container kedua: Status absensi (Hadir, Sakit, Izin, Alpha) */}
            <div className="bg-gray-100 p-6 border border-gray-300 rounded-lg shadow-md mx-8">
                <div className="grid grid-cols-4 gap-4 text-center">
                    <div className="p-4 bg-white rounded-lg border border-gray-300">
                        <h3 className="text-lg font-semibold text-gray-700">Hadir</h3>
                        <p className="text-2xl font-bold text-green-500">{attendanceStatus.hadir}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-gray-300">
                        <h3 className="text-lg font-semibold text-gray-700">Sakit</h3>
                        <p className="text-2xl font-bold text-yellow-500">{attendanceStatus.sakit}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-gray-300">
                        <h3 className="text-lg font-semibold text-gray-700">Izin</h3>
                        <p className="text-2xl font-bold text-orange-500">{attendanceStatus.izin}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-gray-300">
                        <h3 className="text-lg font-semibold text-gray-700">Alpha</h3>
                        <p className="text-2xl font-bold text-red-500">{attendanceStatus.alpha}</p>
                    </div>
                </div>
            </div>

            {/* Container ketiga: Tabel absensi tanpa border */}
            <div className="bg-white p-0 rounded-lg shadow-md mx-8">
                <div className="overflow-x-auto rounded-lg">
                    <table className="min-w-full bg-white text-center rounded-lg text-sm"> {/* Ukuran font ditetapkan menjadi 14px (text-sm) */}
                        <thead>
                            <tr className="bg-gradient-to-r from-[#FFB900] to-[#BB9124] text-white font-semibold"> {/* Berat font 600 */}
                                <th className="px-4 py-3 text-[14px] font-semibold tracking-wider rounded-tl-lg">TATAP MUKA</th>
                                <th className="px-4 py-3 text-[14px] font-semibold tracking-wider">JADWAL</th>
                                <th className="px-4 py-3 text-[14px] font-semibold tracking-wider">KEHADIRAN</th>
                                <th className="px-4 py-3 text-[14px] font-semibold tracking-wider rounded-tr-lg">ABSENSI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Baris 1 */}
                            <tr className="border-t border-gray-200"> {/* Border antara baris */}
                                <td className="px-4 py-4 text-[14px]">1</td>
                                <td className="px-4 py-4 text-[14px]">
                                    Senin, 1 Januari 2024<br />
                                    08:00 - 16:00<br />
                                    Lokasi: SK IKAD
                                </td>
                                <td className="px-4 py-4 text-[14px]">Belum Absen</td>
                                <td className="px-4 py-4">
                                    <button
                                        onClick={() => handleStatusChange('Hadir')}
                                        className="bg-[#384AA0] text-white px-3 py-1 rounded hover:bg-blue-700 text-[14px]"
                                    >
                                        Hadir
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange('Izin')}
                                        className="bg-[#328945] text-white px-3 py-1 rounded ml-2 hover:bg-green-700 text-[14px]"
                                    >
                                        Izin
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange('Sakit')}
                                        className="bg-[#FFB900] text-white px-3 py-1 rounded ml-2 hover:bg-yellow-600 text-[14px]"
                                    >
                                        Sakit
                                    </button>
                                </td>
                            </tr>

                            {/* Baris 2 */}
                            <tr className="border-t border-gray-200"> {/* Border antara baris */}
                                <td className="px-4 py-4 text-[14px]">2</td>
                                <td className="px-4 py-4 text-[14px]">
                                    Selasa, 2 Januari 2024<br />
                                    08:00 - 16:00<br />
                                    Lokasi: SK IKAD
                                </td>
                                <td className="px-4 py-4 text-[14px]">Belum Absen</td>
                                <td className="px-4 py-4">
                                    <button
                                        onClick={() => handleStatusChange('Hadir')}
                                        className="bg-[#384AA0] text-white px-3 py-1 rounded hover:bg-blue-700 text-[14px]"
                                    >
                                        Hadir
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange('Izin')}
                                        className="bg-[#328945] text-white px-3 py-1 rounded ml-2 hover:bg-green-700 text-[14px]"
                                    >
                                        Izin
                                    </button>
                                    <button
                                        onClick={() => handleStatusChange('Sakit')}
                                        className="bg-[#FFB900] text-white px-3 py-1 rounded ml-2 hover:bg-yellow-600 text-[14px]"
                                    >
                                        Sakit
                                    </button>
                                </td>
                            </tr>

                            {/* Tambahkan lebih banyak baris sesuai kebutuhan */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
