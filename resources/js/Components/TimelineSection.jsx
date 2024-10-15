import React, { useState } from 'react';

const timelineSteps = [
  {
    title: 'Registration',
    description: 'Kamu harus melakukan pendaftaran Digistar Internship DDB Telkom dengan memilih Role yang sesuai dengan peminatan.',
  },
  {
    title: 'Administration',
    description: 'Kamu harus lengkapi data diri dan submit CV pada saat seleksi Administrasi. Jika lulus, Kamu akan memasuki tahap seleksi Interview.',
  },
  {
    title: 'Interview',
    description: 'Kamu harus submit Video Resume yang sesuai dengan Internship Role. Pada tahap ini, Kamu juga dapat diminta untuk mengikuti Interview Lanjutan dengan calon Supervisor.',
  },
  {
    title: 'On Job',
    description: 'Kamu akan melakukan On Job sesuai dengan Internship Role selama 6-12 bulan.',
  },
  {
    title: 'Graduate',
    description: 'Jika berhasil menyelesaikan On Job sesuai dengan durasi yang ditetapkan, Kamu akan dinyatakan lulus serta berhak mendapatkan sertifikat magang industri yang disahkan FHCI BUMN atau Kemendikbudristek.',
  },
];

export default function TimelineSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: '#162360' }}>
            Timeline
          </h2>
          <p className="text-lg text-gray-500 mt-4">
            Tahapan proses magang dari awal hingga kelulusan.
          </p>
        </div>

        {/* Timeline Tabs */}
        <div className="flex justify-center mb-8">
          <ol className="flex items-center space-x-4">
            {timelineSteps.map((step, index) => (
              <li key={index} className="flex flex-col items-center">
                <button
                  onClick={() => setActiveStep(index)}
                  className={`flex items-center text-sm font-medium ${activeStep === index ? 'text-blue-600' : 'text-gray-500'}`}
                >
                  <span className={`flex items-center justify-center w-8 h-8 text-xs border rounded-full ${activeStep === index ? 'border-blue-600' : 'border-gray-500'}`}>
                    {index + 1}
                  </span>
                  <span className="ml-2">{step.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* Timeline Description */}
        <div className="text-center mt-8">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">{timelineSteps[activeStep].title}</h3>
          <p className="text-gray-500">{timelineSteps[activeStep].description}</p>
        </div>
      </div>
    </section>
  );
}
