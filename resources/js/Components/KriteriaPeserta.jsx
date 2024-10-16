import React from 'react';
import { AcademicCapIcon, GlobeAltIcon, ChartBarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function KriteriaPeserta() {
  return (
    <section className="relative py-24 bg-white">
      {/* Animated and Layered Abstract Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white"></div>
      <div className="absolute bottom-0 right-0 w-[120%] h-[50%] bg-white"></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#162360] tracking-wide"> {/* Membuat heading lebih besar dan tebal */}
            Kriteria Peserta
          </h2>
          <p className="text-[#5E7ADD] text-lg mt-4 max-w-3xl mx-auto" style={{ lineHeight: '1.6', fontWeight: 600 }}>
            Berikut adalah kriteria yang harus dipenuhi oleh peserta magang di Kementerian Luar Negeri.
          </p>
        </div>

        {/* Asymmetrical Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Card 1 */}
          <div className="group relative bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 hover:scale-110 hover:-rotate-6 hover:shadow-3xl hover:bg-opacity-40 transform hover:skew-y-1 overflow-hidden">
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Neon Pulse Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-[#5E7ADD] group-hover:to-[#384AA0] rounded-3xl animate-neonPulse"></div>
            <div className="relative z-10">
              <AcademicCapIcon className="h-12 w-12 text-[#5E7ADD] mb-4 mx-auto group-hover:text-white transition-all duration-700" />
              <h3 className="text-xl font-bold text-[#162360] mb-2 group-hover:text-white transition-colors duration-700">Mahasiswa Aktif</h3>
              <p className="text-gray-600 group-hover:text-white transition-colors duration-700" style={{ fontWeight: 500 }}>
                Peserta harus terdaftar sebagai mahasiswa aktif di universitas atau perguruan tinggi.
              </p>
            </div>
            {/* Bottom Neon Line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 hover:scale-110 hover:-rotate-6 hover:shadow-3xl hover:bg-opacity-40 transform hover:skew-y-1 overflow-hidden">
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-[#5E7ADD] group-hover:to-[#384AA0] rounded-3xl animate-neonPulse"></div>
            <div className="relative z-10">
              <ChartBarIcon className="h-12 w-12 text-[#5E7ADD] mb-4 mx-auto group-hover:text-white transition-all duration-700" />
              <h3 className="text-xl font-bold text-[#162360] mb-2 group-hover:text-white transition-colors duration-700">IPK Minimal 3.0</h3>
              <p className="text-gray-600 group-hover:text-white transition-colors duration-700" style={{ fontWeight: 500 }}>
                IPK minimal peserta yang berhak mendaftar adalah 3.0 atau lebih.
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 hover:scale-110 hover:-rotate-6 hover:shadow-3xl hover:bg-opacity-40 transform hover:skew-y-1 overflow-hidden">
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-[#5E7ADD] group-hover:to-[#384AA0] rounded-3xl animate-neonPulse"></div>
            <div className="relative z-10">
              <GlobeAltIcon className="h-12 w-12 text-[#5E7ADD] mb-4 mx-auto group-hover:text-white transition-all duration-700" />
              <h3 className="text-xl font-bold text-[#162360] mb-2 group-hover:text-white transition-colors duration-700">Kemampuan Berbahasa Inggris</h3>
              <p className="text-gray-600 group-hover:text-white transition-colors duration-700" style={{ fontWeight: 500 }}>
                Peserta diharapkan memiliki kemampuan berbahasa Inggris yang baik, baik lisan maupun tulisan.
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
          </div>

          {/* Card 4 */}
          <div className="group relative bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 hover:scale-110 hover:-rotate-6 hover:shadow-3xl hover:bg-opacity-40 transform hover:skew-y-1 overflow-hidden">
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-[#5E7ADD] group-hover:to-[#384AA0] rounded-3xl animate-neonPulse"></div>
            <div className="relative z-10">
              <UserGroupIcon className="h-12 w-12 text-[#5E7ADD] mb-4 mx-auto group-hover:text-white transition-all duration-700" />
              <h3 className="text-xl font-bold text-[#162360] mb-2 group-hover:text-white transition-colors duration-700">Kepemimpinan & Organisasi</h3>
              <p className="text-gray-600 group-hover:text-white transition-colors duration-700" style={{ fontWeight: 500 }}>
                Peserta memiliki pengalaman dalam organisasi atau pernah memegang posisi kepemimpinan.
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}