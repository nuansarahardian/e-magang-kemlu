import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import CardPosisi from '@/Components/CardPosisi';  // Import komponen CardPosisi
import DetailPosisi from '@/Components/DetailPosisi';  // Import komponen DetailPosisi

export default function PosisiMagang() {
  // Simulasi detail posisi magang
  const [selectedPosition, setSelectedPosition] = useState(null);

  // Data posisi magang
  const positions = [
    {
      id: 1,
      title: 'Programmer Dan Dokumentasi IT',
      status: 'Belum Lolos',
      location: 'Kota Surabaya',
      organization: 'Badan Pendapatan Daerah Kota Surabaya',
      image: 'https://awsimages.detik.net.id/visual/2019/03/06/8ed61b4f-c30a-4658-bd18-3ea8cdf9d082_169.jpeg?w=450&q=90',
      wilayah: '6 Wilayah',
      komoditas: '2 Komoditas',
    },
    {
      id: 2,
      title: 'Fullstack Developer',
      status: 'Tidak Diambil',
      location: 'Kota Jakarta Pusat',
      organization: 'Badan Strategi Kebijakan Luar Negeri (BSKLN), Kementerian Luar Negeri',
      image: 'https://awsimages.detik.net.id/visual/2019/03/06/8ed61b4f-c30a-4658-bd18-3ea8cdf9d082_169.jpeg?w=450&q=90',
      wilayah: '8 Wilayah',
      komoditas: '4 Komoditas',
    },
  ];

  return (
    <div>
      <Head title="Posisi Magang" />
      <Header />

      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-6">
        {/* Komponen CardPosisi untuk container kiri */}
        <div className="lg:w-1/3 bg-white shadow-md rounded-lg p-8">  {/* Tambahkan style container kiri */}
          <CardPosisi positions={positions} setSelectedPosition={setSelectedPosition} />
        </div>

        {/* Komponen DetailPosisi untuk container kanan */}
        <div className="lg:w-2/3 bg-gray-50 shadow-md rounded-lg p-6"> {/* Tambahkan style container kanan */}
          <DetailPosisi selectedPosition={selectedPosition} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
