import React, { useState } from 'react';

const images = [
  'https://source.unsplash.com/random/400x300?1',
  'https://source.unsplash.com/random/400x300?2',
  'https://source.unsplash.com/random/400x300?3',
  'https://source.unsplash.com/random/400x300?4',
];

export default function Gallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Embed Video */}
          <div className="flex justify-center">
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

          {/* Right Column: Carousel */}
          <div className="flex flex-col items-center">
            {/* Carousel Image */}
            <img
              src={images[currentImageIndex]}
              alt={`Gallery Image ${currentImageIndex + 1}`}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            {/* Dot Navigation */}
            <div className="flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-3 w-3 rounded-full transition duration-200 ${
                    currentImageIndex === index ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
