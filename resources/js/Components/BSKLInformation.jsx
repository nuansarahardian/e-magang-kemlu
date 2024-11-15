import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

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
        rootMargin: "0px",
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
                        Badan Strategi Kebijakan Luar Negeri (BSKLN) <br />
                        Kementerian Luar Negeri
                    </h2>
                </div>

                {/* Asymmetrical Card Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <motion.div
                        ref={cardRef2}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible2 ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="relative col-span-12 lg:col-span-12 bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 overflow-hidden"
                    >
                        <h3 className="text-2xl font-bold text-[#162360] mb-4">
                            Tugas dan Wewenang Badan Strategi Kebijakan Luar
                            Negeri (BSKLN)
                        </h3>
                        <p
                            className="text-gray-600"
                            style={{ fontWeight: 500 }}
                        >
                            BSKLN bertanggung jawab menyelenggarakan perumusan,
                            penyusunan, dan pemberian rekomendasi strategi
                            kebijakan di bidang penyelenggaraan hubungan luar
                            negeri dan politik luar negeri.
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
                        <h3 className="text-xl font-bold text-[#162360] mb-4">
                            Pusat Strategi Kebijakan Kawasan Aspasaf
                        </h3>
                        <p
                            className="text-gray-600"
                            style={{ fontWeight: 500 }}
                        >
                            Melaksanakan penyusunan kebijakan teknis, rencana,
                            dan program analisis, serta penetapan dan pemberian
                            rekomendasi strategi kebijakan di bidang
                            penyelangaraan hubungan luar negeri dan politik luar
                            negeri dalam lingkup kawasan Asia, Pasifik dan
                            Afrika.
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
                        <h3 className="text-xl font-bold text-[#162360] mb-4">
                            Pusat Strategi Kebijakan Kawasan Amerop
                        </h3>
                        <p
                            className="text-gray-600"
                            style={{ fontWeight: 500 }}
                        >
                            Melaksanakan penyusunan kebijakan teknis, rencana,
                            dan program analisis, serta penetapan dan pemberian
                            rekomendasi strategi kebijakan di bidang
                            penyelangaraan hubungan luar negeri dan politik luar
                            negeri dalam lingkup kawasan Amerika dan Eropa.
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
                        <h3 className="text-xl font-bold text-[#162360] mb-4">
                            Pusat Strategi Kebijakan Multilateral
                        </h3>
                        <p
                            className="text-gray-600"
                            style={{ fontWeight: 500 }}
                        >
                            Melaksanakan penyusunan kebijakan teknis, rencana,
                            dan program analisis, serta penetapan dan pemberian
                            rekomendasi strategi kebijakan di bidang
                            penyelangaraan hubungan luar negeri dan politik luar
                            negeri dalam lingkup Multilateral.
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
                        <h3 className="text-xl font-bold text-[#162360] mb-4">
                            Pusat Strategi Kebijakan Isu Khusus & Analisis Data
                        </h3>
                        <p
                            className="text-gray-600"
                            style={{ fontWeight: 500 }}
                        >
                            Melaksanakan penyusunan kebijakan teknis, rencana,
                            dan program analisis data, serta sinkronisasi
                            perumusan, penetapan dan pemberian rekomendasi
                            strategi kebijakan terhadap isu khusus di bidang
                            penyelanggaraan hubungan luar negeri dan politik
                            luar negeri.
                        </p>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
