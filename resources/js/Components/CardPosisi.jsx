import React, { useState } from 'react';
import { MapPinIcon, ClockIcon, UsersIcon, TagIcon, ChevronDownIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'; // Import Exclamation Icon

export default function CardPosisi({ positions, setSelectedPosition }) {
  const [selectedBatch, setSelectedBatch] = useState('Semua Batch');
  const [selectedIssue, setSelectedIssue] = useState('Semua Isu');

  // Data filter untuk Batch dan Isu
  const batches = ['Semua Batch', 'Batch 1', 'Batch 2'];
  const issues = [
    'Semua Isu',
    'Strategi Asia Pasifik & Afrika',
    'Strategi Amerika & Eropa',
    'Strategi Kebijakan Multilateral',
    'Isu Khusus & Analisis Data',
  ];

  // Filter posisi berdasarkan batch dan isu
  const filteredPositions = positions.filter((position) => {
    const matchBatch = selectedBatch === 'Semua Batch' || position.batch === selectedBatch;
    const matchIssue = selectedIssue === 'Semua Isu' || position.issue === selectedIssue;
    return matchBatch && matchIssue;
  });

  return (
    <div className="w-full h-full overflow-y-auto rounded-lg">
      <h2 className="text-[24px] font-extrabold mb-6 text-[#162360]">Posisi Magang</h2>

      {/* Filter Controls */}
      <div className="flex justify-between mb-6 gap-4">
        {/* Filter Batch */}
        <div className="relative w-full lg:w-1/2">
          <select
            className="appearance-none border border-gray-300 rounded-lg p-3 text-sm focus:ring focus:ring-blue-500 focus:outline-none w-full shadow-sm"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            {batches.map((batch) => (
              <option key={batch} value={batch}>
                {batch}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
        </div>

        {/* Filter Isu */}
        <div className="relative w-full lg:w-1/2">
          <select
            className="appearance-none border border-gray-300 rounded-lg p-3 text-sm focus:ring focus:ring-blue-500 focus:outline-none w-full shadow-sm"
            value={selectedIssue}
            onChange={(e) => setSelectedIssue(e.target.value)}
          >
            {issues.map((issue) => (
              <option key={issue} value={issue}>
                {issue}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Wrapper untuk card */}
      <div className="max-h-[320px] md:max-h-[640px] overflow-y-auto space-y-4">
        {filteredPositions.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-16">
            {/* Icon */}
            <ExclamationCircleIcon className="h-12 w-12 text-gray-400 mb-4" />
            {/* Message */}
            <p className="text-lg font-semibold text-gray-600">Maaf, posisi yang Anda cari tidak ditemukan.</p>
            <p className="text-sm text-gray-500 mt-2">Coba sesuaikan filter atau hubungi tim kami untuk informasi lebih lanjut.</p>
            <button
              onClick={() => {
                setSelectedBatch('Semua Batch');
                setSelectedIssue('Semua Isu');
              }}
              className="mt-4 px-6 py-2 bg-[#162360] text-white rounded-lg hover:bg-[#0F245B] focus:outline-none transition-colors duration-300"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          filteredPositions.map((position) => (
            <div
              key={position.id}
              onClick={() => setSelectedPosition(position)}
              className="cursor-pointer border border-gray-300 rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
            >
              {/* Bagian atas: Heading dan Batch */}
              <div>
                <h3
                  className="text-base font-bold text-black truncate mb-1"
                  style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {position.title}
                </h3>

                {/* Batch */}
                <p className="text-sm text-gray-600 mb-2">{position.batch}</p>
              </div>

              {/* Garis pemisah */}
              <hr className="-mx-4 my-2 border-gray-300" />

              {/* Bagian bawah: Issue, Kota Jakarta Pusat, Durasi, Kuota */}
              <div className="space-y-0.5">
                {/* Issue */}
                <div className="flex items-center text-[#86858D] text-sm font-medium">
                  <TagIcon className="h-4 w-4 mr-1" />
                  <span>{position.issue}</span>
                </div>

                {/* Kota Jakarta Pusat */}
                <div className="flex items-center text-[#86858D] text-sm font-medium">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  <span>Kota Jakarta Pusat</span>
                </div>

                {/* Durasi */}
                <div className="flex items-center text-[#86858D] text-sm font-medium">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  <span>Durasi, 2 Bulan</span>
                </div>

                {/* Kuota */}
                <div className="flex items-center text-[#86858D] text-sm font-medium">
                  <UsersIcon className="h-4 w-4 mr-1" />
                  <span>Kuota, {position.kuota} Orang</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
