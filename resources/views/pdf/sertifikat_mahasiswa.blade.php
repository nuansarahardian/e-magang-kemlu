<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Sertifikat Mahasiswa</title>
    <style>
        @page {
            size: A4 landscape;
            margin: 0;
        }
        body {
            font-family: 'Candara', sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f0f3f5;
        }
        .certificate-container {
            width: 278mm;
            height: 188mm;
            padding: 10mm;
            background: url('{{ storage_path('app/public/images/sertif.png') }}') no-repeat center center;
            background-size: cover;
            position: relative;
            text-align: center;
            color: #333;
            /* border: 6px solid #0056a3; */
            box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
            box-sizing: border-box;
        }
        .header {
            text-align: center;
            margin-bottom: 15px;
        }
        .header img {
            width: 60px;
            margin-bottom: 8px;
        }
        .header h1 {
            font-size: 22px;
            color: #0056a3;
            font-weight: bold;
            margin: 0;
        }
        .header p {
            font-size: 14px;
            color: #333;
            margin: 0;
        }
        .title {
            font-size: 32px;
            font-weight: bold;
            margin: 15px 0;
            color: #d32f2f;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .main-content {
            font-size: 16px;
            color: #555;
            line-height: 1.6;
            width: 85%;
            margin: 0 auto;
            text-align: justify;
        }
        .info-section {
            margin: 15px auto;
            width: 75%;
            text-align: left;
        }
        .info-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;
        }
        .label {
            font-weight: bold;
            width: 45%;
        }
        .value {
            color: #333;
            width: 55%;
            text-align: right;
        }
        .footer {
            position: absolute;
        
            bottom: 6mm;
            right: 26mm;
            font-size: 14px;
            text-align: right;
            color: #333;
        }
        .signature {
            text-align: center;
            margin-top: 5px;
        }
        .signature img {
            width: 90px;
            margin-bottom: 5px;
        }
        .signature-name {
            font-weight: bold;
            margin-top: 5px;
        }
        .foto {
            top: 60px;
            right: 280px;
            width: 90px;
            height: 130px;
            margin-bottom: 10px;
            object-fit: cover;
            position: fixed;
            border: 1px solid #ccc;
        }
    </style>
</head>
<body>

<div class="certificate-container">
    <!-- Header with Logo and Title -->
    <div class="header">
        <img src="{{ storage_path('app/public/images/logo-kemlu.png') }}" alt="Logo Kemlu">
        <h1>Kementerian Luar Negeri</h1>
        <p>REPUBLIK INDONESIA</p>
    </div>

    <p class="title">Sertifikat</p>

    <!-- Certificate Content -->
    <div class="main-content">
        <p>Dengan ini menerangkan dengan sesungguhnya bahwa:</p>

        <!-- Student Info Section -->
        <div class="info-section">
            <div class="info-item">
                <span class="label">Nama</span>
                <span class="value">{{ $certificateData['nama'] }}</span>
            </div>
            <div class="info-item">
                <span class="label">NIM</span>
                <span class="value">{{ $certificateData['nim'] }}</span>
            </div>
            <div class="info-item">
                <span class="label">Jurusan/Prodi</span>
                <span class="value">{{ $certificateData['jurusan'] }}</span>
            </div>
            <div class="info-item">
                <span class="label">Fakultas</span>
                <span class="value">{{ $certificateData['fakultas'] }}</span>
            </div>
            <div class="info-item">
                <span class="label">Universitas</span>
                <span class="value">{{ $certificateData['universitas'] }}</span>
            </div>
        </div>

        <p>Yang bersangkutan telah menyelesaikan magang di unit kerja Badan Strategi Kebijakan Luar Negeri (BSKLN), Kementerian Luar Negeri RI, pada tanggal <strong>{{ $certificateData['tanggal_mulai'] }}</strong> sampai dengan <strong>{{ $certificateData['tanggal_berakhir'] }}</strong> pada <strong>{{ $certificateData['posisi_magang'] }}</strong></p>
    </div>

    <!-- Footer with Signature, Date, and Photo -->
    <div class="footer">
        <div class="pas-foto">
            <img class="foto" src="{{ $certificateData['pas_foto'] }}" alt="Pas Foto">
        </div>
        <p>Jakarta, {{ $certificateData['tanggal_berakhir'] }}</p>
        <p>Sekretaris BSKLN, Kemlu RI</p>
        <div class="signature">
            <img src="{{ storage_path('app/public/images/ttd.png') }}" alt="Tanda Tangan">
            <p class="signature-name">Nina Kurnia Widhi</p>
            <p>NIP. 19691029 199503 2 001</p>
        </div>
    </div>
</div>

</body>
</html>
