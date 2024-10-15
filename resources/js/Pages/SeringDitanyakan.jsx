import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import Footer from '@/Components/Footer';  // Import Footer component
import Header from '@/Components/Header';  // Import Header component

const faqs = [
  {
    category: "Akun",
    questions: [
      {
        question: "Bagaimana cara mengubah password?",
        answer: "Anda dapat mengubah password melalui pengaturan akun."
      },
      {
        question: "Siapa yang bisa mengakses akun?",
        answer: "Hanya pengguna terdaftar yang dapat mengakses akun."
      },
    ]
  },
  {
    category: "Registrasi",
    questions: [
      {
        question: "Bagaimana cara mendaftar?",
        answer: "Pendaftaran dilakukan melalui situs resmi kami."
      },
      {
        question: "Apakah ada biaya untuk mendaftar?",
        answer: "Tidak, pendaftaran adalah gratis."
      },
    ]
  },
  {
    category: "Administrasi",
    questions: [
      {
        question: "Apa yang harus saya lakukan jika data saya salah?",
        answer: "Silakan hubungi layanan pelanggan untuk memperbaiki data."
      },
    ]
  },
  {
    category: "Interview",
    questions: [
      {
        question: "Apa yang perlu dipersiapkan untuk interview?",
        answer: "Siapkan CV dan pengetahuan tentang perusahaan."
      },
    ]
  },
  {
    category: "On Job",
    questions: [
      {
        question: "Berapa lama masa magang?",
        answer: "Masa magang berlangsung antara 6 hingga 12 bulan."
      },
      {
        question: "Apa saja manfaat magang?",
        answer: "Peserta akan mendapatkan pengalaman praktis dan sertifikat setelah menyelesaikan program."
      },
    ]
  },
  {
    category: "Graduate",
    questions: [
      {
        question: "Apa yang harus dilakukan setelah lulus?",
        answer: "Pastikan semua dokumen dan sertifikat diselesaikan."
      },
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
    <div className="bg-white">
      <Head title="FAQ" />
      <Header />

      <div className="container mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#162360]">Frequently Asked Questions (FAQ)</h1>

        {/* Filter Section */}
        <div className="flex justify-center mb-6">
          <select
            className="border border-gray-300 rounded-lg p-2"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">Semua Kategori</option>
            <option value="Akun">Akun</option>
            <option value="Registrasi">Registrasi</option>
            <option value="Administrasi">Administrasi</option>
            <option value="Interview">Interview</option>
            <option value="On Job">On Job</option>
            <option value="Graduate">Graduate</option>
          </select>
        </div>

        {/* Accordion Section */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <Disclosure key={faq.category}>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-6 py-4 text-left text-lg font-medium text-[#162360] bg-[#A5B1E8] rounded-lg shadow-md hover:bg-[#384AA0] focus:outline-none focus:ring focus:ring-[#384AA0] transition-all duration-200 ease-in-out">
                    <span>{faq.category}</span>
                    <ChevronUpIcon className={`${open ? 'transform rotate-180' : ''} h-5 w-5 text-[#162360] transition-transform duration-200`} />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-6 pt-2 pb-4 text-sm text-gray-600 border-b border-gray-300">
                    {faq.questions.map((item, index) => (
                      <div key={index} className="mb-4">
                        <strong className="text-[#162360]">{item.question}</strong>
                        <p className="mt-1">{item.answer}</p>
                      </div>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
