import React from 'react';

export default function StatusPendaftaran() {
    const handleDownload = () => {
        alert('Mengunduh surat penerimaan...');
        // Di sini Anda bisa menambahkan logika untuk mengunduh file, misalnya menggunakan URL file yang ada di server
    };

    return (
        <div className="bg-white min-h-screen"> {/* Container terluar berwarna putih */}

            {/* Container atas tanpa padding (header) */}
            <div className="bg-gradient-to-r from-[#384AA0] to-[#5E7ADD] text-white text-center rounded-t-lg">
                <h2 className="text-4xl font-bold py-8">Status Pendaftaran</h2>
            </div>

            {/* Container bawah dengan padding */}
            <div className="p-8 space-y-6"> {/* Container bawah dengan padding yang lebih besar */}
                
                {/* Card 1 */}
                <div className="bg-[#F7F6F8] border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between"> {/* Desain card lebih bersih dan proporsional */}
                    {/* Gambar bulat */}
                    <img
                        src="/images/1.jpeg"
                        alt="Company Logo"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    {/* Informasi */}
                    <div className="ml-6 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">Strategi Asia Pasifik & Afrika</h3> {/* Posisi */}
                        <p className="text-sm text-gray-600 mt-1">Strategi Asia Pasifik & Afrika</p> {/* Nama issue */}
                        <p className="text-sm text-gray-500 mt-1">Badan Strategi Kebijakan Luar Negeri</p> {/* Nama badan */}
                    </div>

                    {/* Status, Tanggal, Jam, dan Tombol Unduh */}
                    <div className="text-right">
                        <span className="bg-[#328945] text-white px-4 py-2 rounded-full text-sm font-medium mb-2 inline-block">Diterima</span> {/* Chip status pendaftaran */}
                        <p className="text-sm text-gray-500 mt-2">22 August 2024, 10:00 AM</p> {/* Tanggal dan Jam */}
                        <button
                            onClick={handleDownload}
                            className="bg-[#384AA0] text-white mt-4 px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Unduh Surat Penerimaan
                        </button>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-[#F7F6F8] border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between"> {/* Desain card lebih bersih dan proporsional */}
                    {/* Gambar bulat */}
                    <img
                        src="/images/1.jpeg"
                        alt="Company Logo"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    {/* Informasi */}
                    <div className="ml-6 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">Strategi Amerika & Eropa</h3> {/* Posisi */}
                        <p className="text-sm text-gray-600 mt-1">Strategi Amerika & Eropa</p> {/* Nama issue */}
                        <p className="text-sm text-gray-500 mt-1">Badan Strategi Kebijakan Luar Negeri</p> {/* Nama badan */}
                    </div>

                    {/* Status, Tanggal, Jam, dan Tombol Unduh */}
                    <div className="text-right">
                        <span className="bg-[#FFB900] text-white px-4 py-2 rounded-full text-sm font-medium mb-2 inline-block">Proses</span> {/* Chip status pendaftaran */}
                        <p className="text-sm text-gray-500 mt-2">1 September 2024, 02:00 PM</p> {/* Tanggal dan Jam */}
                        <button
                            onClick={handleDownload}
                            className="bg-[#384AA0] text-white mt-4 px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Unduh Surat Penerimaan
                        </button>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-[#F7F6F8] border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between"> {/* Desain card lebih bersih dan proporsional */}
                    {/* Gambar bulat */}
                    <img
                        src="/images/1.jpeg"
                        alt="Company Logo"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    {/* Informasi */}
                    <div className="ml-6 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">Strategi Kebijakan Multilateral</h3> {/* Posisi */}
                        <p className="text-sm text-gray-600 mt-1">Strategi Kebijakan Multilateral</p> {/* Nama issue */}
                        <p className="text-sm text-gray-500 mt-1">Badan Strategi Kebijakan Luar Negeri</p> {/* Nama badan */}
                    </div>

                    {/* Status, Tanggal, Jam, dan Tombol Unduh */}
                    <div className="text-right">
                        <span className="bg-[#FFB900] text-white px-4 py-2 rounded-full text-sm font-medium mb-2 inline-block">Proses</span> {/* Chip status pendaftaran */}
                        <p className="text-sm text-gray-500 mt-2">5 September 2024, 11:00 AM</p> {/* Tanggal dan Jam */}
                        <button
                            onClick={handleDownload}
                            className="bg-[#384AA0] text-white mt-4 px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Unduh Surat Penerimaan
                        </button>
                    </div>
                </div>

                {/* Card 4 */}
                <div className="bg-[#F7F6F8] border border-gray-200 rounded-xl p-6 shadow-sm flex items-center justify-between"> {/* Desain card lebih bersih dan proporsional */}
                    {/* Gambar bulat */}
                    <img
                        src="/images/1.jpeg"
                        alt="Company Logo"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                    {/* Informasi */}
                    <div className="ml-6 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">Isu Khusus & Analisis Data</h3> {/* Posisi */}
                        <p className="text-sm text-gray-600 mt-1">Isu Khusus & Analisis Data</p> {/* Nama issue */}
                        <p className="text-sm text-gray-500 mt-1">Badan Strategi Kebijakan Luar Negeri</p> {/* Nama badan */}
                    </div>

                    {/* Status, Tanggal, Jam, dan Tombol Unduh */}
                    <div className="text-right">
                        <span className="bg-[#B50000] text-white px-4 py-2 rounded-full text-sm font-medium mb-2 inline-block">Ditolak</span> {/* Chip status pendaftaran */}
                        <p className="text-sm text-gray-500 mt-2">10 September 2024, 09:00 AM</p> {/* Tanggal dan Jam */}
                        <button
                            onClick={handleDownload}
                            className="bg-[#384AA0] text-white mt-4 px-4 py-2 rounded-lg hover:bg-gray-600"
                        >
                            Unduh Surat Penolakan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
