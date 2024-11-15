import React from "react";
import { motion } from "framer-motion"; // Import framer-motion
import {
    AcademicCapIcon,
    BookOpenIcon,
    ClipboardDocumentIcon,
    PresentationChartBarIcon,
    LanguageIcon,
} from "@heroicons/react/24/outline";

export default function KriteriaPeserta() {
    return (
        <section className="relative py-24 bg-white">
            {/* Animated and Layered Abstract Background */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-white"></div>
            <div className="absolute bottom-0 right-0 w-[120%] h-[50%] bg-white"></div>

            <motion.div
                className="relative z-10 container mx-auto px-10 lg:px-12"
                initial={{ opacity: 0, y: 50 }} // Initial state
                whileInView={{ opacity: 1, y: 0 }} // Animate when in view
                transition={{ duration: 0.6, ease: "easeInOut" }} // Duration of animation
                viewport={{ once: true }} // Play animation once when in view
            >
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#162360] tracking-wide">
                        Kriteria Peserta
                    </h2>
                    <p
                        className="text-[#5E7ADD] text-lg mt-4 max-w-3xl mx-auto"
                        style={{ lineHeight: "1.6", fontWeight: 600 }}
                    >
                        Berikut adalah kriteria yang harus dipenuhi oleh peserta
                        magang di Kementerian Luar Negeri.
                    </p>
                </div>

                {/* Asymmetrical Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-7 lg:gap-8">
                    {/* Card 1 */}
                    <div className="group relative bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 hover:scale-110 hover:-rotate-6 hover:shadow-3xl hover:bg-opacity-40 transform hover:skew-y-1 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-[#5E7ADD] group-hover:to-[#384AA0] rounded-3xl animate-neonPulse"></div>
                        <div className="relative z-10">
                            <AcademicCapIcon className="h-12 w-12 text-[#5E7ADD] mb-4 mx-auto group-hover:text-white transition-all duration-700" />
                            <h3 className="text-xl font-bold text-[#162360] mb-2 group-hover:text-white transition-colors duration-700">
                                Jenjang Pendidikan
                            </h3>
                            <p
                                className="text-gray-600 group-hover:text-white transition-colors duration-700 min-h-[60px]"
                                style={{ fontWeight: 500 }}
                            >
                                Peserta harus berada pada jenjang pendidikan S1.
                            </p>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
                    </div>

                    {/* Card 2 */}
                    <div className="group relative bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 hover:scale-110 hover:-rotate-6 hover:shadow-3xl hover:bg-opacity-40 transform hover:skew-y-1 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-[#5E7ADD] group-hover:to-[#384AA0] rounded-3xl animate-neonPulse"></div>
                        <div className="relative z-10">
                            <BookOpenIcon className="h-12 w-12 text-[#5E7ADD] mb-4 mx-auto group-hover:text-white transition-all duration-700" />
                            <h3 className="text-xl font-bold text-[#162360] mb-2 group-hover:text-white transition-colors duration-700">
                                Semester Minimal
                            </h3>
                            <p
                                className="text-gray-600 group-hover:text-white transition-colors duration-700 min-h-[60px]"
                                style={{ fontWeight: 500 }}
                            >
                                Minimal semester 4.
                            </p>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
                    </div>

                    {/* Card 3 */}
                    <div className="group relative bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 hover:scale-110 hover:-rotate-6 hover:shadow-3xl hover:bg-opacity-40 transform hover:skew-y-1 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-[#5E7ADD] group-hover:to-[#384AA0] rounded-3xl animate-neonPulse"></div>
                        <div className="relative z-10">
                            <ClipboardDocumentIcon className="h-12 w-12 text-[#5E7ADD] mb-4 mx-auto group-hover:text-white transition-all duration-700" />
                            <h3 className="text-xl font-bold text-[#162360] mb-2 group-hover:text-white transition-colors duration-700">
                                Bidang Studi
                            </h3>
                            <p
                                className="text-gray-600 group-hover:text-white transition-colors duration-700 min-h-[60px]"
                                style={{ fontWeight: 500 }}
                            >
                                Hubungan Internasional, Ilmu Ekonomi, Ilmu
                                Komunikasi, Hukum, Sastra, dan Ilmu Politik.
                            </p>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
                    </div>

                    {/* Card 4 */}
                    <div className="group relative bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 hover:scale-110 hover:-rotate-6 hover:shadow-3xl hover:bg-opacity-40 transform hover:skew-y-1 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-[#5E7ADD] group-hover:to-[#384AA0] rounded-3xl animate-neonPulse"></div>
                        <div className="relative z-10">
                            <PresentationChartBarIcon className="h-12 w-12 text-[#5E7ADD] mb-4 mx-auto group-hover:text-white transition-all duration-700" />
                            <h3 className="text-xl font-bold text-[#162360] mb-2 group-hover:text-white transition-colors duration-700">
                                Office Tools
                            </h3>
                            <p
                                className="text-gray-600 group-hover:text-white transition-colors duration-700 min-h-[60px]"
                                style={{ fontWeight: 500 }}
                            >
                                Menguasai aplikasi perkantoran untuk menunjang
                                tugas-tugas administrasi.
                            </p>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
                    </div>

                    {/* Card 5 */}
                    <div className="group relative bg-white border border-gray-200 rounded-3xl p-8 text-center shadow-lg transition-transform duration-700 hover:scale-110 hover:-rotate-6 hover:shadow-3xl hover:bg-opacity-40 transform hover:skew-y-1 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-[#5E7ADD] group-hover:to-[#384AA0] rounded-3xl animate-neonPulse"></div>
                        <div className="relative z-10">
                            <LanguageIcon className="h-12 w-12 text-[#5E7ADD] mb-4 mx-auto group-hover:text-white transition-all duration-700" />
                            <h3 className="text-xl font-bold text-[#162360] mb-2 group-hover:text-white transition-colors duration-700">
                                Kemampuan Bahasa Inggris
                            </h3>
                            <p
                                className="text-gray-600 group-hover:text-white transition-colors duration-700 min-h-[60px]"
                                style={{ fontWeight: 500 }}
                            >
                                Kemampuan berbahasa Inggris, baik lisan maupun
                                tulisan.
                            </p>
                        </div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#5E7ADD] to-[#384AA0]"></div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
