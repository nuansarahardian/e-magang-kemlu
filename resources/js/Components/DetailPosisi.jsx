import React from 'react';
import { Link } from '@inertiajs/react';

export default function DetailPosisi({ selectedPosition }) {
  return (
    <div className="w-full h-full bg-white border border-gray-200 rounded-lg p-8">
      {selectedPosition ? (
        <div className="space-y-8">
          {/* Section 1: Heading and Apply Now Button */}
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <h1 className="text-3xl font-extrabold text-[#162360] mb-4 lg:mb-0">
              {selectedPosition.title}
            </h1>
            <Link
              href="/apply"
              className="bg-gradient-to-r from-[#5E7ADD] to-[#384AA0] text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 hover:from-[#384AA0] hover:to-[#5E7ADD] hover:shadow-xl"
            >
              Apply Now
            </Link>
          </div>

          {/* Divider */}
          <hr className="border-t-2 border-gray-200 my-4" />

          {/* Section 2: Position Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-50 p-6 rounded-lg shadow-inner">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Posisi</span>
                <span className="text-gray-800">{selectedPosition.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Batch</span>
                <span className="text-gray-800">{selectedPosition.batch}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Kota</span>
                <span className="text-gray-800">{selectedPosition.location}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Issue</span>
                <span className="text-gray-800">{selectedPosition.issue}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Durasi</span>
                <span className="text-gray-800">2 Bulan</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Kuota</span>
                <span className="text-gray-800">{selectedPosition.kuota} Orang</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-t-2 border-gray-200 my-4" />

          {/* Section 3: Descriptions */}
          <div className="space-y-8">
            {/* Tentang Posisi */}
            <div className="p-6 bg-white border-l-4 border-[#5E7ADD] rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-[#162360] mb-2">Tentang Posisi</h3>
              <p className="text-gray-600">{selectedPosition.description || 'Deskripsi tidak tersedia'}</p>
            </div>

            {/* Tentang Issue */}
            <div className="p-6 bg-white border-l-4 border-[#FFB900] rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-[#162360] mb-2">Tentang Issue</h3>
              <p className="text-gray-600">{selectedPosition.issue}</p>
            </div>

            {/* Tentang Organisasi */}
            <div className="p-6 bg-white border-l-4 border-[#6BBBAA] rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-[#162360] mb-2">Tentang Organisasi</h3>
              <p className="text-gray-600">{selectedPosition.organization}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full text-center">
          <p className="text-lg text-gray-500">Silakan pilih aktivitas di sebelah kiri untuk melihat detailnya</p>
        </div>
      )}
    </div>
  );
}
