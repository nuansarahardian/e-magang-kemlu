import React from 'react';
import { Disclosure } from '@headlessui/react';
import { Link } from '@inertiajs/react';

export default function DetailPosisi() {
  return (
    <div className="w-full h-full bg-white border border-gray-300">
      {/* Section 0: Full-Width Image */}
      <div className="relative w-full h-64">
        <img
          src="/images/3.jpeg"
          alt="Detail Image"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content Container */}
      <div className="p-8">
        {/* Section 1: Informasi Kegiatan */}
        <div>
          <h1 className="text-3xl font-extrabold text-black mb-2">Informasi Kegiatan</h1>
          <p className="text-[#86858D] text-[15px] font-semibold">
            Berikut adalah rincian lengkap mengenai kegiatan yang Anda pilih, termasuk posisi, batch, dan deskripsi lengkap.
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t-2 border-gray-200" />

      <div className="p-8">
        {/* Section 2: Posisi Overview */}
        <div className="mb-0">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <h2 className="text-2xl font-bold text-black">Strategi Amerika & Eropa</h2>
            <Link
              href="/apply"
              className="bg-[#2D3985] text-white font-bold py-2 px-6 rounded-lg w-full lg:w-auto text-center transition-all ease-in-out duration-300 transform hover:scale-105 hover:bg-[#24306e]"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t-2 border-gray-200" />

      <div className="p-8">
        {/* Section 3: Tabel Informasi */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-[#2D3985] text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-[15px] font-semibold">Informasi</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-[15px] font-semibold">Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-gray-600 text-[15px]">Batch</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800 text-[15px]">Batch 2</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-gray-600 text-[15px]">Kota</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800 text-[15px]">Kota Jakarta Pusat</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-gray-600 text-[15px]">Issue</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800 text-[15px]">Strategi Amerika & Eropa</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-gray-600 text-[15px]">Durasi</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800 text-[15px]">2 Bulan (18 Agustus 2024 - 18 Oktober 2024)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-gray-600 text-[15px]">Kuota</td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800 text-[15px]">8 Orang</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t-2 border-gray-200" />

      <div className="p-8">
        {/* Section 4: Accordion for Deskripsi */}
        <div>
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-semibold text-left text-black bg-gray-100 hover:bg-gray-200">
                  <span>Tentang Issue</span>
                  <svg
                    className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-gray-500`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-600 text-[15px]">
                  Strategi Amerika & Eropa adalah salah satu fokus utama dalam pengembangan kebijakan luar negeri.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <hr className="border-t-2 border-gray-200 my-6" />

          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-semibold text-left text-black bg-gray-100 hover:bg-gray-200">
                  <span>Tentang Organisasi</span>
                  <svg
                    className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-gray-500`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-600 text-[15px]">
                  Badan Strategi Kebijakan Luar Negeri (BSKLN) adalah lembaga di bawah Kementerian Luar Negeri yang berfokus pada pengembangan strategi kebijakan luar negeri Indonesia.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <hr className="border-t-2 border-gray-200 my-6" />

          {/* Accordion for Tugas Individu */}
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-semibold text-left text-black bg-gray-100 hover:bg-gray-200">
                  <span>Tugas Individu</span>
                  <svg
                    className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-gray-500`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-600 text-[15px]">
                  Setiap peserta akan diberikan tugas individu untuk menyelesaikan laporan terkait perkembangan kebijakan luar negeri di wilayah strategis Amerika dan Eropa.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <hr className="border-t-2 border-gray-200 my-6" />

          {/* Accordion for Tugas Kelompok */}
          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-semibold text-left text-black bg-gray-100 hover:bg-gray-200">
                  <span>Tugas Kelompok</span>
                  <svg
                    className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-gray-500`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-600 text-[15px]">
                  Para peserta akan bekerja sama dalam kelompok untuk mengembangkan rekomendasi kebijakan strategis yang sesuai dengan isu yang diangkat, dengan mempresentasikan hasilnya di akhir program.
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

        </div>
      </div>
    </div>
  );
}
