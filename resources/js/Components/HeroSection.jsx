import React from 'react';
import { motion } from 'framer-motion'; // For smooth animations

export default function HeroSection() {
  return (
    <section className="relative h-auto lg:h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#f0f4f8] to-[#dfe3f6]">
      
      {/* Subtle Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#FFB900] to-[#FFDD57] rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-gradient-to-br from-[#5E7ADD] to-[#384AA0] rounded-full blur-3xl opacity-30"></div>

      {/* Container */}
      <div className="relative container mx-auto px-6 py-12 lg:py-16 flex flex-col lg:grid lg:grid-cols-2 items-center justify-between gap-8 lg:gap-x-12">
        
        {/* Left Column: Heading, Description, Button */}
        <motion.div
          className="text-gray-900 space-y-6 w-full text-center lg:text-left font-sans"  // Increased space-y to 6
          initial={{ opacity: 0, y: 40 }}  // Smooth fade-in from below
          animate={{ opacity: 1, y: 0 }}  // Fade in with a slight upward movement
          transition={{ duration: 0.8 }}
        >
          <h1
            className="font-extrabold text-3xl sm:text-4xl lg:text-5xl"
            style={{
              lineHeight: '1.2', // Tighter line height for headings
              color: '#07080A',  // Modern dark blue for heading
            }}
          >
            Inovasi 
            <span 
              style={{
                backgroundColor: '#FED35F',  // Stabilo effect on "Karier Global"
                padding: '0 4px',            // Padding for spacing around the text
                borderRadius: '2px'          // Slightly rounded corners
              }}>
              Karier Global
            </span> 
            di Kementerian Luar Negeri!
          </h1>
          <p
            className="text-[#86858D] text-sm sm:text-base lg:text-lg"  // Changed description text color
            style={{
              lineHeight: '1.6', // Slightly more relaxed line height for readability
              fontWeight: 600,    // Increased font weight for description to make it bolder
            }}
          >
            Ikuti program magang berkelas internasional yang menawarkan pengalaman berharga dan jaringan profesional global.
          </p>
          <motion.a
            href="/register"
            className="inline-block bg-[#384AA0] text-white font-bold rounded-lg px-4 py-2 sm:px-6 sm:py-3 transition-transform hover:scale-105"
            style={{
              fontSize: '14px',  // Slightly smaller button text
              fontWeight: 700,   // Made the button text bold
            }}
            whileHover={{ scale: 1.05 }}
          >
            Daftar Sekarang
          </motion.a>
        </motion.div>

        {/* Right Column: Horizontal Scrolling Carousel */}
        <motion.div
          className="w-full flex justify-center relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Horizontal Scrolling Container */}
          <div className="flex space-x-4 animate-scroll">
            <motion.img
              src="/images/1.jpeg"
              alt="Image 1"
              className="w-[300px] h-[70vh] object-cover rounded-xl shadow-lg"
              whileHover={{ scale: 1.05 }}  // Minor scale animation on hover
              transition={{ duration: 0.5 }}
            />
            <motion.img
              src="/images/2.jpeg"
              alt="Image 2"
              className="w-[300px] h-[70vh] object-cover rounded-xl shadow-lg"
              whileHover={{ scale: 1.05 }}  // Minor scale animation on hover
              transition={{ duration: 0.5 }}
            />
            <motion.img
              src="/images/3.jpeg"
              alt="Image 3"
              className="w-[300px] h-[70vh] object-cover rounded-xl shadow-lg"
              whileHover={{ scale: 1.05 }}  // Minor scale animation on hover
              transition={{ duration: 0.5 }}
            />
            <motion.img
              src="/images/4.jpeg"
              alt="Image 4"
              className="w-[300px] h-[70vh] object-cover rounded-xl shadow-lg"
              whileHover={{ scale: 1.05 }}  // Minor scale animation on hover
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
