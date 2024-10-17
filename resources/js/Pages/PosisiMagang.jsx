import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import CardPosisi from '@/Components/CardPosisi';
import DetailPosisi from '@/Components/DetailPosisi';

export default function PosisiMagang() {
  const [selectedPosition, setSelectedPosition] = useState(null);

  const positions = [
    {
      id: 1,
      title: 'Programmer Dan Dokumentasi IT',
      batch: 'Batch 1',
      issue: 'Strategi Asia Pasifik & Afrika',
      status: 'Belum Lolos',
      location: 'Kota Surabaya',
      organization: 'Badan Strategi Kebijakan Luar Negeri (BSKLN), Kementerian Luar Negeri',
      kuota: 6,
      description: 'Bertanggung jawab atas dokumentasi dan pengembangan program IT.',
    },
    {
      id: 2,
      title: 'Fullstack Developer',
      batch: 'Batch 2',
      issue: 'Strategi Amerika & Eropa',
      status: 'Tidak Diambil',
      location: 'Kota Jakarta Pusat',
      organization: 'Badan Strategi Kebijakan Luar Negeri (BSKLN), Kementerian Luar Negeri',
      kuota: 8,
      description: 'Membantu pengembangan aplikasi web dan integrasi dengan backend.',
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      batch: 'Batch 1',
      issue: 'Strategi Kebijakan Multilateral',
      status: 'Proses Seleksi',
      location: 'Kota Bandung',
      organization: 'Badan Strategi Kebijakan Luar Negeri (BSKLN), Kementerian Luar Negeri',
      kuota: 4,
      description: 'Merancang antarmuka dan pengalaman pengguna untuk produk digital.',
    },
    {
      id: 4,
      title: 'Data Scientist',
      batch: 'Batch 2',
      issue: 'Isu Khusus & Analisis Data',
      status: 'Tidak Diambil',
      location: 'Kota Yogyakarta',
      organization: 'Badan Strategi Kebijakan Luar Negeri (BSKLN), Kementerian Luar Negeri',
      kuota: 10,
      description: 'Menganalisis data dan memberikan insight untuk keputusan strategis.',
    },
    {
      id: 5,
      title: 'Network Engineer',
      batch: 'Batch 1',
      issue: 'Strategi Asia Pasifik & Afrika',
      status: 'Diterima',
      location: 'Kota Semarang',
      organization: 'Badan Strategi Kebijakan Luar Negeri (BSKLN), Kementerian Luar Negeri',
      kuota: 5,
      description: 'Merancang dan memelihara infrastruktur jaringan perusahaan.',
    },
  ];

  return (
    <div className="relative bg-white min-h-screen overflow-hidden">
      <Head title="Posisi Magang" />
      <Header />

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#FFB900] to-[#FFDD57] rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-br from-[#5E7ADD] to-[#384AA0] rounded-full blur-3xl opacity-30"></div>

      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-6 relative z-10">
        {/* CardPosisi for the left container */}
        <div className="lg:w-1/3 bg-[#F7F6F8] border border-gray-400 shadow-md rounded-lg p-8">
          <CardPosisi positions={positions} setSelectedPosition={setSelectedPosition} />
        </div>

        {/* DetailPosisi for the right container */}
        <div className="lg:w-2/3 bg-[#F7F6F8] border border-gray-400 shadow-md rounded-lg p-6">
          <DetailPosisi selectedPosition={selectedPosition} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
