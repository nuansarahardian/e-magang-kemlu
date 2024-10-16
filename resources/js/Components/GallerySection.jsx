import React, { useState } from 'react';
import { motion } from 'framer-motion';

const images = [
  {
    src: '/images/1.jpeg',
    title: 'Team Spirit in Action',
    description: 'Collaborate with like-minded individuals and contribute to real-world projects.',
  },
  {
    src: '/images/2.jpeg',
    title: 'Learning by Doing',
    description: 'Experience hands-on learning that prepares you for a successful career.',
  },
  {
    src: '/images/3.jpeg',
    title: 'Creative Brainstorms',
    description: 'Innovate and ideate with diverse teams working toward impactful solutions.',
  },
  {
    src: '/images/4.jpeg',
    title: 'Networking Opportunities',
    description: 'Build lasting connections with industry professionals and peers.',
  },
];

export default function Gallery() {
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

  const handleCardClick = (index) => {
    setExpandedCardIndex(index === expandedCardIndex ? null : index);
  };

  return (
    <section className="py-20 relative bg-gradient-to-r from-[#1C1F2A] to-[#2D2F41] text-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-extrabold text-4xl text-white">Explore the Internship Experience</h2>
          <p className="text-lg text-gray-300 mt-4 max-w-3xl mx-auto">
            Dive into the vibrant, hands-on learning journey with our internship program.
          </p>
        </div>

        {/* Modern Grid Layout with Expanding Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`relative cursor-pointer rounded-lg overflow-hidden shadow-lg transform transition-transform duration-500 ${
                expandedCardIndex === index ? 'col-span-2 row-span-2 scale-110' : 'hover:scale-105'
              }`}
              onClick={() => handleCardClick(index)}
            >
              {/* Image */}
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-64 object-cover rounded-lg"
              />

              {/* Hover Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-90 transition duration-500 ${expandedCardIndex === index ? 'opacity-90' : ''}`}>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{image.title}</h3>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedCardIndex === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-70 p-6"
                >
                  <h3 className="text-3xl font-bold mb-4">{image.title}</h3>
                  <p className="text-lg text-gray-300">{image.description}</p>
                  <button className="mt-6 px-6 py-3 bg-[#5E7ADD] text-white rounded-lg shadow-lg">
                    Find out more
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
