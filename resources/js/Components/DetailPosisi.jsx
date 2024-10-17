import React from 'react';
import { Link } from '@inertiajs/react';

export default function DetailPosisi({ selectedPosition }) {
  return (
    <div className="w-full h-full bg-white border border-gray-300 rounded-lg p-6">
      {selectedPosition ? (
        <div>
          {/* Apply Now button at the top */}
          <div className="text-center mb-6">
            <Link
              href="/apply"
              className="bg-[#5E7ADD] hover:bg-[#384AA0] text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
            >
              Apply Now
            </Link>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-extrabold text-[#162360] mb-4">{selectedPosition.title}</h2>

          {/* Posisi Section */}
          <p className="text-lg text-gray-500 mb-4">
            <span className="font-bold">Posisi:</span> {selectedPosition.title}
          </p>

          {/* Batch Section */}
          <p className="text-lg text-gray-500 mb-4">
            <span className="font-bold">Batch:</span> {selectedPosition.batch}
          </p>

          {/* Tentang Organisasi */}
          <p className="text-lg text-gray-500 mb-4">
            <span className="font-bold">Tentang Organisasi:</span> {selectedPosition.organization}
          </p>

          {/* Tentang Issue */}
          <p className="text-lg text-gray-500 mb-4">
            <span className="font-bold">Tentang Issue:</span> {selectedPosition.issue}
          </p>

          {/* Deskripsi Posisi */}
          <p className="text-lg text-gray-500 mb-6">
            <span className="font-bold">Deskripsi Posisi:</span> {selectedPosition.description || 'Deskripsi tidak tersedia'}
          </p>

          {/* Divider */}
          <hr className="border-t-2 border-gray-200 my-6" />

          {/* Apply Now button at the bottom */}
          <div className="text-center">
            <Link
              href="/apply"
              className="bg-[#5E7ADD] hover:bg-[#384AA0] text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
            >
              Apply Now
            </Link>
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
