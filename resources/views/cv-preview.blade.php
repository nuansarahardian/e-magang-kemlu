<!-- resources/views/cv-preview.blade.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV Preview</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <style>
        .download-btn {
            background-color: #328945;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 20px;
        }
    </style>
</head>
<body class="bg-gray-100 antialiased text-gray-900">
    <div class="flex justify-end p-4">
        <button class="download-btn" onclick="downloadPDF()">Download PDF</button>
    </div>

    <!-- CV Preview Section -->
    <div id="cv-content" class="bg-white p-8 mx-auto max-w-xl shadow-lg">
        <!-- Section 1: Informasi Pribadi -->
        <div class="text-center mb-6">
            <img src="{{ $profilData['foto'] }}" alt="Foto Profil" class="w-24 h-32 mx-auto mb-4">
            <h1 class="text-2xl font-bold">{{ $profilData['nama'] }}</h1>
            <p>{{ $profilData['email'] }} | {{ $profilData['noHp'] }}</p>
        </div>

        <hr class="my-4 border-gray-300" />

        <!-- Section 2: Informasi Pendidikan -->
        <div class="mb-6">
            <h2 class="text-xl font-semibold">Informasi Pendidikan</h2>
            <p><strong>{{ $profilData['asalUniversitas'] }}</strong> - {{ $profilData['jurusan'] }}</p>
            <p>{{ $profilData['fakultas'] }} | Semester {{ $profilData['semester'] }}</p>
            <p>IPK: {{ $profilData['IPK'] }}</p>
        </div>

        <hr class="my-4 border-gray-300" />

        <!-- Section 3: Keterampilan -->
        <div class="mb-6">
            <h2 class="text-xl font-semibold">Keterampilan</h2>
            <ul class="list-disc list-inside">
                @foreach ($profilData['keterampilan'] as $skill)
                    <li>{{ $skill['nama_keterampilan'] }} - Level {{ $skill['level'] }}</li>
                @endforeach
            </ul>
        </div>

        <hr class="my-4 border-gray-300" />

        <!-- Section 4: Pengalaman -->
        <div class="mb-6">
            <h2 class="text-xl font-semibold">Pengalaman</h2>
            @foreach ($profilData['pengalaman'] as $experience)
                <div class="mb-4">
                    <p><strong>{{ $experience['instansi'] }}</strong> - {{ $experience['posisi'] }}</p>
                    <p>{{ \Carbon\Carbon::parse($experience['tanggal_mulai'])->format('d M Y') }} - {{ \Carbon\Carbon::parse($experience['tanggal_berakhir'])->format('d M Y') }}</p>
                    <p>{{ $experience['deskripsi'] }}</p>
                </div>
            @endforeach
        </div>
    </div>

    <!-- Script untuk Mengunduh CV sebagai PDF -->
    <script>
        function downloadPDF() {
            const cvContent = document.getElementById('cv-content');
            html2canvas(cvContent, { scale: 2 }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4',
                });
                const pageWidth = 210;
                const pageHeight = 297;
                const margin = 10;
                const imgWidth = pageWidth - 2 * margin;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;
                let position = margin;

                pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
                heightLeft -= pageHeight - 2 * margin;

                while (heightLeft > 0) {
                    position = heightLeft - imgHeight + margin;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight - 2 * margin;
                }

                pdf.save('CV-{{ $profilData["nama"] }}.pdf');
            });
        }
    </script>
</body>
</html>
