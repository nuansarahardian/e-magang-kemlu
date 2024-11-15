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
            margin-top: 20px;
            line-height: 1.8;
        }
        .content1 {
            margin-top: 4px;
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
            width: 120px;
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

        <p>Nomor Registrasi : {{ $nomor_registrasi ?? 'ID tidak tersedia' }} </p>

        <p>Kepada Yth.</p>
        <p>Kepala Jurusan {{$jurusan}}<br>
            {{$fakultas}}<br>
           {{$universitas}} <br>
           di Tempat
        </p>

        <p class="content">Dengan hormat,</p>
        
        <p class="content1">Bersama surat ini menerangkan bahwa:</p>

        <p>
            <span class="label">Nama</span>: {{ $nama }}<br>
            <span class="label">Status</span>: Mahasiswa Aktif<br>
            <span class="label">Institusi</span>: {{ $universitas }}<br>
            <span class="label">NIM</span>: {{ $nim }}
        </p>

        <p>Telah diterima sebagai peserta magang di <strong>{{ $posisi }}</strong> Badan Strategi Kebijakan Luar Negeri (BSKLN), Kementerian Luar Negeri, untuk periode magang <b>{{ $tanggal_mulai }} </b>s.d. <b>{{ $tanggal_berakhir }}</b> . 
            <br> <br>
            Demikian Surat Penerimaan Magang ini diterbitkan untuk dapat dipergunakan sebagai mana mestinya.
        </p>

        <div class="signature">
            <p>Sekretariat BSKLN Kementerian Luar Negeri</p>
        </div>
    </div>
</body>
</html>
