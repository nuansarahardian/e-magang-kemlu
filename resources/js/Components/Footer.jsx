import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#5E7ADD] to-[#384AA0] text-white py-8">
      {/* Add padding on the x-axis to ensure whitespace on both sides on mobile */}
      <div className="container mx-auto px-8 md:px-4">
        {/* Flex container for logo and text */}
        <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
          
          {/* Logo Container */}
          <div className="flex-shrink-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/96/Seal_of_the_Ministry_of_Foreign_Affairs_of_the_Republic_of_Indonesia.svg"
              alt="Logo"
              className="h-16"
            />
          </div>

          {/* Text Container */}
          <div className="flex flex-col space-y-8 w-full">
            {/* Heading and Tagline */}
            <div className="space-y-2">
              <span className="font-bold text-2xl block" style={{ fontWeight: 800 }}>
                E - Magang
              </span>
              <span className="text-sm font-light" style={{ fontWeight: 600 }}>
                Sistem Pendaftaran Magang Badan Strategi Kebijakan Luar Negeri, Kementerian Luar Negeri Republik Indonesia
              </span>
            </div>

            {/* Address and Contact Information */}
            <div className="space-y-1">
              <p className="font-semibold">
                Gedung Roeslan Abdulgani Kementerian Luar Negeri RI.
              </p>
              <p>Jl. Taman Pejambon No. 6, Senen, Jakarta Pusat, DKI Jakarta, 10410</p>
              <p>08.00 - 16.00 (Senin-Kamis) | 08.00 - 16.30 (Jum’at)</p>
              <div className="flex items-center space-x-2">
                <p>(021) 344 1508</p>
              </div>
            </div>

            {/* Credit Section */}
            <div>
              <p className="text-sm font-bold">
                © 2024 BSKLN & MSIB Batch 7. Hak cipta dilindungi Undang-Undang.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;