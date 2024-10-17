import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Custom hook for lazy loading
const useOnScreen = (options) => {
  const [isVisible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect(); // Stop observing once in view
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isVisible];
};

export default function BSKLNSection() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  // Hooks for lazy loading
  const [cardRef1, isVisible1] = useOnScreen(options);
  const [cardRef2, isVisible2] = useOnScreen(options);
  const [cardRef3, isVisible3] = useOnScreen(options);
  const [cardRef4, isVisible4] = useOnScreen(options);
  const [cardRef5, isVisible5] = useOnScreen(options);
  const [cardRef6, isVisible6] = useOnScreen(options);

  return (
    <section className="py-20 relative bg-white">
      <div className="container mx-auto px-10 lg:px-12">
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
          {/* First Row - 2 cards spanning 2 columns each */}
          <motion.div
            ref={cardRef1}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative col-span-12 lg:col-span-6 bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 overflow-hidden"
          >
            <h3 className="text-2xl font-bold text-[#162360] mb-4">Apa itu BSKLN?</h3>
            <p className="text-gray-600" style={{ fontWeight: 500 }}>
              BSKLN adalah lembaga strategis yang bertugas merumuskan kebijakan luar negeri Indonesia serta memberikan rekomendasi diplomatik dan strategi untuk kepentingan nasional.
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
          </motion.div>

          <motion.div
            ref={cardRef2}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative col-span-12 lg:col-span-6 bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 overflow-hidden"
          >
            <h3 className="text-2xl font-bold text-[#162360] mb-4">Tugas BSKLN</h3>
            <p className="text-gray-600" style={{ fontWeight: 500 }}>
              BSKLN bertanggung jawab dalam menganalisis isu-isu global, merumuskan kebijakan luar negeri, serta memfasilitasi kerja sama internasional yang sesuai dengan kepentingan nasional.
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
          </motion.div>

          {/* Second Row - 4 cards each spanning 1 column */}
          <motion.div
            ref={cardRef3}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible3 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative col-span-12 lg:col-span-3 bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 overflow-hidden"
          >
            <h3 className="text-xl font-bold text-[#162360] mb-4">Strategi Asia Pasifik & Afrika</h3>
            <p className="text-gray-600" style={{ fontWeight: 500 }}>
              Mengembangkan hubungan diplomatik dengan negara-negara di Asia Pasifik dan Afrika untuk meningkatkan kerja sama politik, ekonomi, dan keamanan.
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
          </motion.div>

          <motion.div
            ref={cardRef4}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative col-span-12 lg:col-span-3 bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 overflow-hidden"
          >
            <h3 className="text-xl font-bold text-[#162360] mb-4">Strategi Amerika & Eropa</h3>
            <p className="text-gray-600" style={{ fontWeight: 500 }}>
              Fokus pada hubungan bilateral dengan negara-negara Amerika dan Eropa untuk memperkuat kerja sama politik, ekonomi, dan sosial.
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
          </motion.div>

          <motion.div
            ref={cardRef5}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible5 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative col-span-12 lg:col-span-3 bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 overflow-hidden"
          >
            <h3 className="text-xl font-bold text-[#162360] mb-4">Strategi Kebijakan Multilateral</h3>
            <p className="text-gray-600" style={{ fontWeight: 500 }}>
              Berperan aktif di organisasi multilateral seperti PBB, ASEAN, dan forum internasional lainnya untuk menyuarakan kepentingan Indonesia.
            </p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
          </motion.div>

          <motion.div
            ref={cardRef6}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible6 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative col-span-12 lg:col-span-3 bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 overflow-hidden"
          >
            <h3 className="text-xl font-bold text-[#162360] mb-4">Isu Khusus & Analisis Data</h3>
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
