import React from 'react';

export default function HeroSection() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center"
      style={{
        backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/4/41/Gedpancasila.jpg')",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

      <div className="relative container mx-auto px-6 py-24 flex flex-col lg:flex-row items-center justify-between lg:py-32 space-y-12 lg:space-y-0 gap-x-12">
        
        {/* Left Column: Heading, Description, Button */}
        <div className="text-white space-y-6 w-full lg:w-1/2 text-center lg:text-left font-sans">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Kesempatan Emas untuk Berkarier<br /> di Kementerian Luar Negeri!
          </h1>
          <p className="text-lg lg:text-xl">
            Temukan pengalaman magang yang tak ternilai bersama para profesional terbaik Indonesia. Bangun jaringan, tingkatkan kemampuan, dan persiapkan diri untuk masa depan karier global.
          </p>
          <a
            href="/register"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Daftar Sekarang
          </a>
        </div>

        {/* Right Column: Taller Embedded Video */}
        <div className="w-full lg:w-1/2">
          <div className="aspect-w-16 aspect-h-12">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/Kth_fbiPJQ8"
              title="YouTube Video"
              frameBorder="0"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
