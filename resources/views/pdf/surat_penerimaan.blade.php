<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Surat Penerimaan Magang</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            font-size: 12pt;
        }
        .container {
            width: 90%;
            margin: auto;
            padding: 20px;
        }
        .header, .footer {
            text-align: center;
            font-weight: bold;
        }
        .footer {
            margin-top: 50px;
            text-align: right;
        }
        .content {
            margin-top: 30px;
            line-height: 1.8;
        }
        .label {
            width: 150px;
            display: inline-block;
        }
        .title {
            font-size: 16pt;
            text-align: center;
            font-weight: bold;
            margin-top: 20px;
        }
        .date {
            text-align: right;
        }
        .signature {
            margin-top: 50px;
            text-align: right;
        }
        .logo {
            display: block;
            margin: 0 auto;
            width: 80px;
            height: auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <p class="date">Jakarta, {{ \Carbon\Carbon::now()->format('d F Y') }}</p>

        <!-- Logo di bagian atas tengah -->
        <div class="header">
            <img src="{{ base_path('storage/app/public/images/logo-kemlu.png') }}" alt="Logo Kemlu" class="logo">


        </div>

        <div class="title">SURAT PENERIMAAN MAGANG</div>

        <p>Nomor Registrasi : {{ $unique_id ?? 'ID tidak tersedia' }} </p>

        <p>Kepada Yth.</p>
        <p>Kepala Jurusan {{$jurusan}}<br>
            {{$fakultas}}<br>
           {{$universitas}}
        </p>

        <p class="content">Dengan hormat,</p>
        
        <p class="content">Bersama surat ini</p>
    
        <p>Menerangkan bahwa:</p>
        <p>
            <span class="label">Nama</span>: {{ $nama }}<br>
            <span class="label">Status</span>: Mahasiswa Aktif<br>
            <span class="label">Institusi</span>: {{ $universitas }}<br>
            <span class="label">NIM</span>: {{ $nim }}
        </p>

        <p>Dengan persetujuan Kementerian Luar Negeri dapat diterima di kementerian sebagai 
        <strong>{{ $posisi }}</strong> sejak {{ $tanggal_mulai }} s.d. {{ $tanggal_berakhir }}. 
        Demikian surat keterangan ini kami buat atas permintaan yang bersangkutan sebagai surat 
        izin magang atas syarat kelulusan. Atas perhatian dan kerjasamanya kami ucapkan terimakasih.
        </p>

        <div class="signature">
            <p>Sekretariat BSKLN Kementerian Luar Negeri</p>
        </div>
    </div>
</body>
</html>
