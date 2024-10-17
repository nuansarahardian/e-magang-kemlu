import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import Footer from '@/Components/Footer';
import Header from '@/Components/Header';

const faqs = [
  {
    category: "Akun",
    questions: [
      { question: "Bagaimana cara mengubah password?", answer: "Anda dapat mengubah password melalui pengaturan akun." },
      { question: "Siapa yang bisa mengakses akun?", answer: "Hanya pengguna terdaftar yang dapat mengakses akun." },
      { question: "Bagaimana cara memulihkan akun?", answer: "Gunakan fitur lupa password atau hubungi layanan pelanggan." },
    ]
  },
  {
    category: "Registrasi",
    questions: [
      { question: "Bagaimana cara mendaftar?", answer: "Pendaftaran dilakukan melalui situs resmi kami." },
      { question: "Apakah ada biaya untuk mendaftar?", answer: "Tidak, pendaftaran adalah gratis." },
      { question: "Berapa lama proses registrasi?", answer: "Proses registrasi biasanya memakan waktu 1-2 hari." },
    ]
  },
  {
    category: "Administrasi",
    questions: [
      { question: "Apa yang harus saya lakukan jika data saya salah?", answer: "Silakan hubungi layanan pelanggan untuk memperbaiki data Anda." },
      { question: "Bagaimana cara memperbarui informasi akun?", answer: "Anda dapat memperbarui informasi akun di pengaturan profil Anda." },
      { question: "Apakah saya bisa menghapus akun saya?", answer: "Ya, Anda dapat menghubungi layanan pelanggan untuk permintaan penghapusan akun." },
    ]
  },
  {
    category: "Interview",
    questions: [
      { question: "Apa yang perlu dipersiapkan untuk interview?", answer: "Siapkan CV dan pengetahuan tentang perusahaan sebelum interview." },
      { question: "Apakah ada tips untuk sukses dalam interview?", answer: "Berlatih komunikasi yang baik dan kenali visi perusahaan." },
      { question: "Apakah interview dilakukan secara online?", answer: "Ya, sebagian besar interview dilakukan secara online melalui platform virtual." },
    ]
  },
  {
    category: "On Job",
    questions: [
      { question: "Berapa lama masa magang?", answer: "Masa magang berlangsung antara 6 hingga 12 bulan, tergantung posisi." },
      { question: "Apa saja manfaat magang?", answer: "Anda akan mendapatkan pengalaman praktis dan sertifikat setelah menyelesaikan program." },
      { question: "Apakah peserta magang mendapatkan mentor?", answer: "Ya, setiap peserta magang akan diberikan mentor untuk membantu selama program." },
    ]
  },
  {
    category: "Graduate",
    questions: [
      { question: "Apa yang harus dilakukan setelah lulus?", answer: "Pastikan semua dokumen dan sertifikat diselesaikan dan diserahkan." },
      { question: "Apakah ada peluang untuk bekerja setelah magang?", answer: "Beberapa peserta magang ditawarkan posisi penuh waktu setelah lulus." },
      { question: "Bagaimana cara mengajukan sertifikat?", answer: "Anda dapat mengajukan sertifikat melalui dashboard akun Anda setelah menyelesaikan magang." },
    ]
  },
];

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Function to filter FAQs based on selected category
  const filteredFaqs = selectedCategory === "All"
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head title="FAQ" />
      <Header />

      {/* Hero Section */}
      <section className="relative w-full bg-[#162360] py-24 bg-cover bg-center" 
        style={{
          backgroundImage: "url('/images/3.jpeg')",
        }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#162360] opacity-80"></div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#FFB900] to-[#FFDD57] rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-br from-[#5E7ADD] to-[#384AA0] rounded-full blur-3xl opacity-30"></div>

        <div className="container mx-auto px-6 text-center relative z-10 text-white">
          <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl"
            style={{
              lineHeight: '1.2', 
              color: '#FFFFFF', 
            }}>
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="text-[#FFFFFF] text-sm sm:text-base lg:text-lg mt-4"
            style={{
              lineHeight: '1.6',
              fontWeight: 600,    
            }}>
            Temukan jawaban untuk pertanyaan umum terkait layanan kami di sini.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <div className="container mx-auto py-6 flex justify-end">
        <div className="relative w-full max-w-[300px]"> {/* Adjust width of filter to make it longer */}
          <select
            className="appearance-none border border-gray-300 rounded-md px-5 py-3 shadow-sm focus:ring focus:ring-blue-500 focus:outline-none text-sm text-gray-600 pr-10 w-full"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">Semua Kategori</option>
            {faqs.map(faq => (
              <option key={faq.category} value={faq.category}>{faq.category}</option>
            ))}
          </select>
          <AdjustmentsHorizontalIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Accordion Section in Bento Grid */}
      <div className={`grid ${filteredFaqs.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6 container mx-auto pb-12`}>
        {filteredFaqs.map((faq, idx) => (
          <div key={idx} className={`bg-gray-100 border border-gray-300 rounded-lg shadow-sm p-4 space-y-4 ${filteredFaqs.length === 1 ? 'w-full' : ''}`}>
            {/* Section Title */}
            <div className="pb-4 border-b border-gray-300">
              <h2 className="text-xl font-bold text-[#162360]">{faq.category}</h2>
            </div>

            {/* Accordion for Questions */}
            {faq.questions.map((item, index) => (
              <Disclosure key={index}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full text-left text-sm font-medium text-[#162360] focus:outline-none">
                      <span>{item.question}</span>
                      <ChevronDownIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-[#162360]`} />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt-2">
                      {/* Wrapping answer in a card with outline */}
                      <div className="border border-gray-300 rounded-lg p-3 bg-white text-gray-600">
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
