import React from 'react';
import { Link } from '@inertiajs/react';

export default function DetailPosisi() {
  return (
    <div className="w-full h-full bg-white border border-gray-300 rounded-lg p-8">
      {/* Section 1: Informasi Kegiatan */}
      <div>
        <h1 className="text-3xl font-extrabold text-black mb-2">Informasi Kegiatan</h1>
        <p className="text-[#B2B1BA] text-[15px] mb-4">
          Berikut adalah rincian lengkap mengenai kegiatan yang Anda pilih, termasuk posisi, batch, dan deskripsi lengkap.
        </p>
      </div>

      {/* Divider */}
      <hr className="border-t-2 border-gray-200 my-6" />

      {/* Section 2: Posisi Overview */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-black">Fullstack Developer</h2>
          <Link
            href="/apply"
            className="bg-gradient-to-r from-[#5E7ADD] to-[#384AA0] text-white font-bold py-2 px-6 rounded-lg transition-all hover:from-[#384AA0] hover:to-[#5E7ADD] ease-in-out duration-300"
            style={{ boxShadow: 'none' }} // Menghilangkan shadow pada tombol
          >
            Apply Now
          </Link>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t-2 border-gray-200 my-6" />

      {/* Section 3: Tabel Informasi */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 font-semibold">Informasi</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-gray-600 font-semibold">Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Batch</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-800">Batch 2</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Kota</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-800">Kota Jakarta Pusat</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Issue</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-800">Strategi Amerika & Eropa</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Posisi</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-800">Fullstack Developer</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Durasi</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-800">2 Bulan</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-gray-600">Kuota</td>
              <td className="border border-gray-300 px-4 py-2 text-gray-800">8 Orang</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Divider */}
      <hr className="border-t-2 border-gray-200 my-6" />

      {/* Section 4: Accordion for Deskripsi */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-black mb-2">Tentang Posisi</h3>
          <p className="text-gray-600">
            Posisi Fullstack Developer akan bertanggung jawab dalam pengembangan web dan aplikasi, termasuk frontend dan backend.
          </p>
        </div>

        {/* Divider */}
        <hr className="border-t-2 border-gray-200 my-6" />

        <div className="mb-4">
          <h3 className="text-lg font-bold text-black mb-2">Tentang Issue</h3>
          <p className="text-gray-600">
            Strategi Amerika & Eropa adalah salah satu fokus utama dalam pengembangan kebijakan luar negeri.
          </p>
        </div>

        {/* Divider */}
        <hr className="border-t-2 border-gray-200 my-6" />

        <div className="mb-4">
          <h3 className="text-lg font-bold text-black mb-2">Tentang Organisasi</h3>
          <p className="text-gray-600">
            Badan Strategi Kebijakan Luar Negeri (BSKLN) adalah lembaga di bawah Kementerian Luar Negeri yang berfokus pada pengembangan strategi kebijakan luar negeri Indonesia.
          </p>
        </div>
      </div>
    </div>
  );
}
