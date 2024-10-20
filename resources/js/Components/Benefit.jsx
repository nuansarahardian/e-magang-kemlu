import React from 'react';
import { BriefcaseIcon, AcademicCapIcon, UserGroupIcon, LightBulbIcon } from '@heroicons/react/24/outline';

export default function BenefitSection() {
  return (
    <section className="py-20 relative overflow-hidden bg-white">
      <div className="relative z-10 container mx-auto px-10 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#162360] tracking-wide">
            Benefit Peserta
          </h2>
          <p className="text-[#5E7ADD] text-lg mt-4 max-w-3xl mx-auto" style={{ lineHeight: '1.6', fontWeight: 600 }}>
            Berikut adalah beberapa benefit yang akan didapatkan oleh peserta magang di Kementerian Luar Negeri.
          </p>
        </div>

        {/* Benefit Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-8">
          {/* Card 1 */}
          <div className="group relative bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 hover:scale-110 hover:rotate-6 hover:shadow-3xl hover:bg-opacity-40 transform hover:skew-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-[#5E7ADD] group-hover:to-[#384AA0] rounded-3xl animate-neonPulse"></div>
            <div className="relative z-10">
              <BriefcaseIcon className="h-12 w-12 text-[#5E7ADD] mb-4 mx-auto group-hover:text-white transition-all duration-700" />
              <h3 className="text-xl font-bold text-[#162360] mb-2 group-hover:text-white transition-colors duration-700">
                Pengalaman Kerja
              </h3>
              <p className="text-gray-600 group-hover:text-white transition-colors duration-700" style={{ fontWeight: 500 }}>
                Kesempatan untuk mendapatkan pengalaman kerja langsung di lingkungan kementerian.
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 hover:scale-110 hover:rotate-6 hover:shadow-3xl hover:bg-opacity-40 transform hover:skew-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-[#5E7ADD] group-hover:to-[#384AA0] rounded-3xl animate-neonPulse"></div>
            <div className="relative z-10">
              <AcademicCapIcon className="h-12 w-12 text-[#5E7ADD] mb-4 mx-auto group-hover:text-white transition-all duration-700" />
              <h3 className="text-xl font-bold text-[#162360] mb-2 group-hover:text-white transition-colors duration-700">
                Sertifikat Magang
              </h3>
              <p className="text-gray-600 group-hover:text-white transition-colors duration-700" style={{ fontWeight: 500 }}>
                Setiap peserta akan mendapatkan sertifikat resmi sebagai bukti partisipasi magang.
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 hover:scale-110 hover:rotate-6 hover:shadow-3xl hover:bg-opacity-40 transform hover:skew-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-[#5E7ADD] group-hover:to-[#384AA0] rounded-3xl animate-neonPulse"></div>
            <div className="relative z-10">
              <UserGroupIcon className="h-12 w-12 text-[#5E7ADD] mb-4 mx-auto group-hover:text-white transition-all duration-700" />
              <h3 className="text-xl font-bold text-[#162360] mb-2 group-hover:text-white transition-colors duration-700">
                Networking
              </h3>
              <p className="text-gray-600 group-hover:text-white transition-colors duration-700" style={{ fontWeight: 500 }}>
                Kesempatan untuk membangun relasi dengan profesional dan staf di Kementerian Luar Negeri.
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
          </div>

          {/* Card 4 */}
          <div className="group relative bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 hover:scale-110 hover:rotate-6 hover:shadow-3xl hover:bg-opacity-40 transform hover:skew-y-1 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-[#5E7ADD] group-hover:to-[#384AA0] rounded-3xl animate-neonPulse"></div>
            <div className="relative z-10">
              <LightBulbIcon className="h-12 w-12 text-[#5E7ADD] mb-4 mx-auto group-hover:text-white transition-all duration-700" />
              <h3 className="text-xl font-bold text-[#162360] mb-2 group-hover:text-white transition-colors duration-700">
                Pengembangan Soft Skills
              </h3>
              <p className="text-gray-600 group-hover:text-white transition-colors duration-700" style={{ fontWeight: 500 }}>
                Pengembangan keterampilan seperti komunikasi, kepemimpinan, dan kolaborasi.
              </p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
