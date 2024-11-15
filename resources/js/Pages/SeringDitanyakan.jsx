import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { Disclosure } from "@headlessui/react";
import {
    ChevronDownIcon,
    AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";
import Footer from "@/Components/Footer";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const faqs = [
    {
        category: "Akun",
        questions: [
            {
                question: "Bagaimana cara mengubah password ?",
                answer: "Gunakan fitur lupa password atau hubungi layanan Hotline.",
            },
            {
                question: "Siapa yang bisa mengakses akun?",
                answer: "Hanya pengguna terdaftar yang dapat mengakses akun dan email sudah terverifikasi.",
            },
            {
                question: "Bagaimana cara memulihkan akun yang lupa password?",
                answer: "Gunakan fitur lupa password atau hubungi layanan pelanggan.",
            },
        ],
    },
    {
        category: "Registrasi Akun",
        questions: [
            {
                question: "Bagaimana cara mendaftarkan akun?",
                answer: "Gunakan akun google aktif anda, karena kami akan mengirimkan email verifikasi dan email penerimaan magang melalui email anda",
            },
            {
                question: "Apakah ada biaya untuk mendaftar?",
                answer: "Semua proses magang dan pendaftaran tidak dipungut biaya",
            },
        ],
    },
    {
        category: "Kelengkapan Dokumen",
        questions: [
            {
                question: "Bagaimana cara memperbarui informasi akun/dokumen?",
                answer: "Anda dapat memperbarui informasi akun di pengaturan profil Anda.",
            },
            {
                question:
                    "Kapan saya bisa mengisi CV dan dokumen yang dibutuhkan?",
                answer: "Pengisian CV dan dokumen dapat dilakukan kapan saja. Namun, pendaftaran magang hanya bisa dilakukan selama periode pendaftaran berlangsung.",
            },
        ],
    },
    {
        category: "Batch dan Periode",
        questions: [
            {
                question:
                    "Bagaimana ketika kuota pendaftaran batch saat ini telah penuh?",
                answer: " Jika berkenan, Anda dapat mendaftar untuk posisi yang sama pada batch setelahnya",
            },
            {
                question:
                    "Dalam satu periode pendaftaran berapa batch yang dibuka?",
                answer: "2 batch saja, untuk batch saat ini dan batch selanjutnya.",
            },
        ],
    },
    {
        category: "Pendaftaran Magang",
        questions: [
            {
                question: "Bagaimana cara melakukan pendaftaran magang?",
                answer: "Untuk mendaftar magang, silakan lengkapi terlebih dahulu data-data yang diperlukan di bagian CV hingga statusnya mencapai 100%. Setelah CV Anda terisi lengkap, Anda dapat melanjutkan proses pendaftaran magang melalui halaman Posisi Magang.",
            },
            {
                question: "Apakah ada biaya untuk mendaftar?",
                answer: "Tidak, pendaftaran adalah gratis.",
            },
        ],
    },
    {
        category: "On Job",
        questions: [
            {
                question: "Berapa lama masa magang?",
                answer: "Masa magang berlangsung 2 bulan dalam satu batch",
            },
            {
                question:
                    "Apakah selama masa magang mendapatkan bantuan biaya hidup?",
                answer: "Selama magang tidak menerima bantuan biaya hidup",
            },
            {
                question: "Apa saja manfaat magang?",
                answer: "Anda akan mendapatkan pengalaman praktis dan sertifikat setelah menyelesaikan program.",
            },
            {
                question: "Apakah peserta magang mendapatkan mentor?",
                answer: "Ya, setiap peserta magang akan diberikan mentor untuk membantu selama program.",
            },
            {
                question:
                    "Apakah saya bisa pindah ke satuan kerja lain setelah diterima di satuan kerja tertentu?",
                answer: "Diharapkan, Anda tidak berpindah ke satuan kerja lain setelah diterima. Oleh karena itu, pastikan untuk memilih posisi atau satuan kerja yang tepat, sesuai dengan minat dan keahlian Anda.",
            },
        ],
    },
];

export default function FAQ() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Function to filter FAQs based on selected category
    const filteredFaqs =
        selectedCategory === "All"
            ? faqs
            : faqs.filter((faq) => faq.category === selectedCategory);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Head title="FAQ" />
            <AuthenticatedLayout />

            {/* Hero Section */}
            <section
                className="relative w-full bg-[#162360] py-24 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/images/3.jpeg')",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#162360] opacity-80"></div>

                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#FFB900] to-[#FFDD57] rounded-full blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-br from-[#5E7ADD] to-[#384AA0] rounded-full blur-3xl opacity-30"></div>

                <div className="container mx-auto px-6 text-center relative z-10 text-white">
                    <h1
                        className="font-extrabold text-3xl sm:text-4xl lg:text-5xl"
                        style={{
                            lineHeight: "1.2",
                            color: "#FFFFFF",
                        }}
                    >
                        Frequently Asked Questions (FAQ)
                    </h1>
                    <p
                        className="text-[#FFFFFF] text-sm sm:text-base lg:text-lg mt-4"
                        style={{
                            lineHeight: "1.6",
                            fontWeight: 600,
                        }}
                    >
                        Temukan jawaban untuk pertanyaan umum terkait layanan
                        kami di sini.
                    </p>
                </div>
            </section>

            {/* Filter Section */}
            <div className="container mx-auto py-6 flex justify-end px-8 md:px-12">
                {" "}
                {/* Padding adjustments for mobile */}
                <div className="relative w-full max-w-[300px]">
                    <select
                        className="appearance-none border border-gray-300 rounded-md px-5 py-3 shadow-sm focus:ring focus:ring-blue-500 focus:outline-none text-sm text-gray-600 pr-10 w-full"
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="All">Semua Kategori</option>
                        {faqs.map((faq) => (
                            <option key={faq.category} value={faq.category}>
                                {faq.category}
                            </option>
                        ))}
                    </select>
                    <AdjustmentsHorizontalIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
            </div>

            {/* Accordion Section in Bento Grid */}
            <div
                className={`grid ${
                    filteredFaqs.length === 1
                        ? "grid-cols-1"
                        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                } gap-6 container mx-auto pb-12 px-8 md:px-12`}
            >
                {" "}
                {/* Added padding for mobile */}
                {filteredFaqs.map((faq, idx) => (
                    <div
                        key={idx}
                        className={`bg-gray-100 border border-gray-300 rounded-lg shadow-sm p-4 space-y-4`}
                    >
                        {/* Section Title */}
                        <div className="pb-4 border-b border-gray-300">
                            <h2 className="text-xl font-bold text-[#162360]">
                                {faq.category}
                            </h2>
                        </div>

                        {/* Accordion for Questions */}
                        {faq.questions.map((item, index) => (
                            <Disclosure key={index}>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex justify-between w-full text-left text-[15px] font-medium text-[#162360] focus:outline-none">
                                            <span>{item.question}</span>
                                            <ChevronDownIcon
                                                className={`${
                                                    open
                                                        ? "rotate-180 transform"
                                                        : ""
                                                } h-5 w-5 text-[#162360]`}
                                            />
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="mt-2">
                                            {/* Wrapping answer in a card with outline */}
                                            <div className="border border-gray-300 rounded-lg p-3 bg-white text-gray-600 text-[15px]">
                                                {item.answer}
                                            </div>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
}
