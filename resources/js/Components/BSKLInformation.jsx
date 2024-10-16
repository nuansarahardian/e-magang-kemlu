import React from 'react';
import { motion } from 'framer-motion';

export default function BSKLNSection() {
  return (
    <section className="py-20 relative bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#162360] tracking-wide">
            Strategi Kebijakan BSKLN
          </h2>
          <p className="text-[#5E7ADD] text-lg mt-4 max-w-3xl mx-auto" style={{ lineHeight: '1.6', fontWeight: 600 }}>
            Memahami kebijakan strategis yang dirancang oleh BSKLN untuk kawasan global dan isu-isu strategis lainnya.
          </p>
        </div>

        {/* Asymmetrical Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* First Row - Larger cards */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative col-span-7 bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 hover:scale-110 hover:shadow-3xl overflow-hidden"
          >
            <h3 className="text-2xl font-bold text-[#162360] mb-4">Apa itu BSKLN?</h3>
            <p className="text-gray-600" style={{ fontWeight: 500 }}>
              BSKLN adalah lembaga strategis yang bertugas merumuskan kebijakan luar negeri Indonesia serta memberikan rekomendasi diplomatik dan strategi untuk kepentingan nasional.
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative col-span-5 bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 hover:scale-110 hover:shadow-3xl overflow-hidden"
          >
            <h3 className="text-2xl font-bold text-[#162360] mb-4">Tugas BSKLN</h3>
            <p className="text-gray-600" style={{ fontWeight: 500 }}>
              BSKLN bertanggung jawab dalam menganalisis isu-isu global, merumuskan kebijakan luar negeri, serta memfasilitasi kerja sama internasional yang sesuai dengan kepentingan nasional.
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
          </motion.div>

          {/* Second Row - Smaller cards */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative col-span-4 bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 hover:scale-110 hover:shadow-3xl overflow-hidden"
          >
            <h3 className="text-xl font-bold text-[#162360] mb-4">Strategi Asia Pasifik & Afrika</h3>
            <p className="text-gray-600" style={{ fontWeight: 500 }}>
              Mengembangkan hubungan diplomatik dengan negara-negara di Asia Pasifik dan Afrika untuk meningkatkan kerja sama politik, ekonomi, dan keamanan.
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative col-span-4 bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 hover:scale-110 hover:shadow-3xl overflow-hidden"
          >
            <h3 className="text-xl font-bold text-[#162360] mb-4">Strategi Amerika & Eropa</h3>
            <p className="text-gray-600" style={{ fontWeight: 500 }}>
              Fokus pada hubungan bilateral dengan negara-negara Amerika dan Eropa untuk memperkuat kerja sama politik, ekonomi, dan sosial.
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative col-span-4 bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 hover:scale-110 hover:shadow-3xl overflow-hidden"
          >
            <h3 className="text-xl font-bold text-[#162360] mb-4">Strategi Kebijakan Multilateral</h3>
            <p className="text-gray-600" style={{ fontWeight: 500 }}>
              Berperan aktif di organisasi multilateral seperti PBB, ASEAN, dan forum internasional lainnya untuk menyuarakan kepentingan Indonesia.
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
          </motion.div>

          {/* Third Row - Single Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative col-span-12 bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 hover:scale-110 hover:shadow-3xl overflow-hidden"
          >
            <h3 className="text-2xl font-bold text-[#162360] mb-4">Isu Khusus & Analisis Data</h3>
            <p className="text-gray-600" style={{ fontWeight: 500 }}>
              Menangani isu-isu khusus seperti terorisme, HAM, serta menganalisis data untuk mendukung kebijakan luar negeri.
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
