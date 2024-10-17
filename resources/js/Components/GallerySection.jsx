import React from 'react';

const cards = [
  {
    title: "Mempresentasikan proyek akhir",
    subtitle: "Presentasi Proyek",
    background: "bg-gradient-to-br from-[#FF5F6D] to-[#FFC371]",
    image: "url('/images/1.jpeg')", // Replace with actual image paths
  },
  {
    title: "Melakukan kegiatan team building",
    subtitle: "Kegiatan Team Building",
    background: "bg-gradient-to-br from-[#2193b0] to-[#6dd5ed]",
    image: "url('/images/2.jpeg')",
  },
  {
    title: "Menghadiri pertemuan diplomatik",
    subtitle: "",
    background: "bg-gradient-to-br from-[#8360c3] to-[#2ebf91]",
    image: "url('/images/3.jpeg')",
  },
  {
    title: "Berlatih keterampilan komunikasi",
    subtitle: "",
    background: "bg-gradient-to-br from-[#f7ff00] to-[#db36a4]",
    image: "url('/images/4.jpeg')",
  },
];

const AppleStyleGallery = () => {
  return (
    <section className="py-16 lg:pb-0 bg-white sm:pb-16 pb-0">
      <div className="w-full px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`relative rounded-none w-full h-[60vh] lg:h-[70vh] overflow-hidden ${card.background} transform hover:scale-105 transition-all duration-300`}
          >
            {/* Card Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: card.image,
              }}
            />
            {/* Lighter Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
            {/* Text Content */}
            <div className="relative z-10 p-6 flex flex-col justify-end h-full">
              <h2 className="text-white text-3xl font-bold mb-4">{card.title}</h2>
              <p className="text-gray-300 font-medium text-lg">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AppleStyleGallery;
