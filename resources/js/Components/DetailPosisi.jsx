import React from 'react';
import { Link } from '@inertiajs/react';

export default function DetailPosisi({ selectedPosition }) {
  return (
    <div>
      {selectedPosition ? (
        <div>
          <h2>{selectedPosition.title}</h2>
          <p>{selectedPosition.organization}</p>
          <p>{selectedPosition.location}</p>

          <div>
            <Link href="/apply">
              Apply Now
            </Link>
          </div>
        </div>
      ) : (
        <p>Silakan pilih aktivitas di sebelah kiri untuk melihat detailnya</p>
      )}
    </div>
  );
}
