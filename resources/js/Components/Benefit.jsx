import React from 'react';

export default function BenefitSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Heading and Short Description */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: '#162360' }}>
            Benefit Peserta
          </h2>
          <p className="text-lg text-gray-500 mt-4">
            Berikut adalah beberapa benefit yang akan didapatkan oleh peserta magang di Kementerian Luar Negeri.
          </p>
        </div>

        {/* Benefit Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Benefit Card 1 */}
          <div className="bg-white border border-gray-300 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Pengalaman Kerja</h3>
            <p className="text-gray-500">
              Kesempatan untuk mendapatkan pengalaman kerja langsung di lingkungan kementerian.
            </p>
          </div>

          {/* Benefit Card 2 */}
          <div className="bg-white border border-gray-300 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Sertifikat Magang</h3>
            <p className="text-gray-500">
              Setiap peserta akan mendapatkan sertifikat resmi sebagai bukti partisipasi magang.
            </p>
          </div>

          {/* Benefit Card 3 */}
          <div className="bg-white border border-gray-300 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Networking</h3>
            <p className="text-gray-500">
              Kesempatan untuk membangun relasi dengan profesional dan staf di Kementerian Luar Negeri.
            </p>
          </div>

          {/* Benefit Card 4 */}
          <div className="bg-white border border-gray-300 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Pengembangan Soft Skills</h3>
            <p className="text-gray-500">
              Pengembangan keterampilan seperti komunikasi, kepemimpinan, dan kolaborasi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
