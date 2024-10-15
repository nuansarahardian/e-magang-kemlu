import React from 'react';

export default function KriteriaPeserta() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Heading and Short Description */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: '#162360' }}>
            Kriteria Peserta
          </h2>
          <p className="text-lg text-gray-500 mt-4">
            Berikut adalah kriteria yang harus dipenuhi oleh peserta magang di Kementerian Luar Negeri.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-white border border-gray-300 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Mahasiswa Aktif</h3>
            <p className="text-gray-500">
              Peserta harus terdaftar sebagai mahasiswa aktif di universitas atau perguruan tinggi.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-300 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">IPK Minimal 3.0</h3>
            <p className="text-gray-500">
              IPK minimal peserta yang berhak mendaftar adalah 3.0 atau lebih.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-300 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Kemampuan Berbahasa Inggris</h3>
            <p className="text-gray-500">
              Peserta diharapkan memiliki kemampuan berbahasa Inggris yang baik, baik lisan maupun tulisan.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-gray-300 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Kepemimpinan & Organisasi</h3>
            <p className="text-gray-500">
              Peserta memiliki pengalaman dalam organisasi atau pernah memegang posisi kepemimpinan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}