import React from 'react';
import { MapPinIcon, ClockIcon, UsersIcon } from '@heroicons/react/24/outline';

export default function CardPosisi({ positions, setSelectedPosition }) {
  return (
    <div className="w-full h-full overflow-y-auto bg-white rounded-lg">
      <h2 className="text-[24px] font-extrabold mb-6 text-[#2D3985]">Posisi Magang</h2>
      {positions.map((position) => (
        <div
          key={position.id}
          onClick={() => setSelectedPosition(position)}
          className="cursor-pointer mb-4 border border-gray-300 rounded-lg flex overflow-hidden h-36 w-full" // Menggunakan h-36 agar sesuai dengan tingginya
        >
          {/* Bagian kiri: Gambar full */}
          <div className="w-1/3 h-full">
            <img
              src={position.image}
              alt={position.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Bagian kanan: Heading dan Detail dengan justify-between */}
          <div className="w-2/3 p-4 flex flex-col justify-between">
            {/* Bagian atas: Nama posisi */}
            <h3
              className="text-base font-bold text-black truncate mb-1"
              style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {position.title}
            </h3>

            {/* Bagian bawah: Detail */}
            <div className="space-y-0.5">
              {/* Lokasi */}
              <div className="flex items-center text-[#86858D] text-sm font-medium">
                <MapPinIcon className="h-4 w-4 mr-1" />
                <span>{position.location}</span>
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
        </div>
      ))}
    </div>
  );
}
