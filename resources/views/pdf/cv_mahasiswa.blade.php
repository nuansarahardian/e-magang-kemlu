<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>CV Mahasiswa</title>
    <style>
        /* Ensure A4 page size and add margins */
        @page {
            size: A4;
            margin: 20mm;
        }
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            color: #333;
        }
        .container {
            width: 100%;
            max-width: 800px;
            margin: auto;
            padding: 20px;
            padding-right: 5px;
            border: 1px solid #ddd;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            background: #fff;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1 {
            font-size: 24px;
            margin: 0;
            font-weight: bold;
            color: #333;
        }
        .photo-container {
            text-align: center;
            margin-bottom: 20px;
        }
        .photo {
            width: 120px;
            height: 120px;
            object-fit: cover;
            border-radius: 50%;
            border: 2px solid #000;
        }
        .section {
            margin-bottom: 20px;
        }
        .section h3 {
            font-size: 16px;
            font-weight: bold;
            color: #333;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
            margin-bottom: 10px;
            text-transform: uppercase;
        }
        .info-table {
            width: 100%;
            border-collapse: collapse;
        }
        .info-table td {
            padding: 5px 10px;
            vertical-align: top;
        }
        .info-table td.label {
            width: 150px;
            font-weight: bold;
            color: #555;
        }
        .info-table td.value {
            width: calc(100% - 150px);
            word-wrap: break-word;
        }
        .keterampilan, .pengalaman {
            list-style-type: disc;
            padding-left: 20px;
        }
        .keterampilan li, .pengalaman li {
            margin-bottom: 8px;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Photo Section -->
        <div class="photo-container">
            @if($mahasiswa->pas_foto)
                <img src="{{ storage_path('app/public/' . $mahasiswa->pas_foto) }}" alt="Pas Foto" class="photo">
            @else
                <p>Pas Foto tidak tersedia.</p>
            @endif
        </div>

        <!-- Header -->
        <div class="header">
            <h1>CV Mahasiswa</h1>
        </div>

        <!-- Informasi Umum Section -->
        <div class="section">
            <h3>Informasi Umum</h3>
            <table class="info-table">
                <tr>
                    <td class="label">NIM</td>
                    <td class="value">{{ $mahasiswa->NIM }}</td>
                </tr>
                <tr>
                    <td class="label">Nama Mahasiswa</td>
                    <td class="value">{{ $mahasiswa->user->name }}</td>
                </tr>
                <tr>
                    <td class="label">Tempat, Tanggal Lahir</td>
                    <td class="value">{{ $mahasiswa->tempat_lahir }}, {{ $mahasiswa->tanggal_lahir->translatedFormat('d, F Y') }}</td>
                </tr>
                <tr>
                    <td class="label">Jenis Kelamin</td>
                    <td class="value">{{ $mahasiswa->jenis_kelamin }}</td>
                </tr>
                <tr>
                    <td class="label">Alamat KTP</td>
                    <td class="value">{{ $mahasiswa->alamat_KTP }}</td>
                </tr>
                <tr>
                    <td class="label">Alamat Domisili</td>
                    <td class="value">{{ $mahasiswa->alamat_domisili }}</td>
                </tr>
                <tr>
                    <td class="label">Universitas</td>
                    <td class="value">{{ $mahasiswa->universitas }}</td>
                </tr>
                <tr>
                    <td class="label">Fakultas</td>
                    <td class="value">{{ $mahasiswa->fakultas }}</td>
                </tr>
                
                <tr>
                    <td class="label">Jurusan</td>
                    <td class="value">{{ $mahasiswa->jurusan }}</td>
                </tr>
                <tr>
                    <td class="label">Semester</td>
                    <td class="value">{{ $mahasiswa->semester }}</td>
                </tr>
                <tr>
                    <td class="label">IPK</td>
                    <td class="value">{{ $mahasiswa->IPK }}</td>
                </tr>
                <tr>
                    <td class="label">No Telepon</td>
                    <td class="value">{{ $mahasiswa->no_telepon }}</td>
                </tr>
              
            </table>
        </div>

        <!-- Keterampilan Section -->
        <div class="section">
            <h3>Keterampilan</h3>
            @if($mahasiswa->keterampilan->isNotEmpty())
                <ul class="keterampilan">
                    @foreach($mahasiswa->keterampilan as $keterampilan)
                        <li>{{ $keterampilan->nama_keterampilan }} - Level {{ $keterampilan->level }}</li>
                    @endforeach
                </ul>
            @else
                <p>Belum Input Keterampilan</p>
            @endif
        </div>

        <!-- Pengalaman Section -->
        <div class="section">
            <h3>Pengalaman</h3>
            @if($mahasiswa->pengalaman->isNotEmpty())
                <ul class="pengalaman">
                    @foreach($mahasiswa->pengalaman as $pengalaman)
                        <li>
                            <strong>{{ $pengalaman->posisi }}</strong> di {{ $pengalaman->instansi }}<br>
                            {{ \Carbon\Carbon::parse($pengalaman->tanggal_mulai)->translatedFormat('d, F Y') }} - 
                            {{ \Carbon\Carbon::parse($pengalaman->tanggal_berakhir)->translatedFormat('d, F Y') }}<br>
                            {{ $pengalaman->deskripsi }}
                        </li>
                    @endforeach
                </ul>
            @else
                <p>Belum Input Pengalaman</p>
            @endif
        </div>
    </div>
</body>
</html>
