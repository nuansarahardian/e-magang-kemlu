<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>CV Mahasiswa</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .section {
            margin-bottom: 15px;
        }
        .section h3 {
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
        }
        .section p {
            margin: 5px 0;
        }
        .keterampilan, .pengalaman {
            margin-left: 20px;
        }
        .keterampilan li, .pengalaman li {
            margin-bottom: 5px;
        }
        .photo {
            width: 100px; /* Set desired width */
            height: auto; /* Maintain aspect ratio */
            border-radius: 50%; /* Optional: make it circular */
            margin-bottom: 10px; /* Space below the photo */
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>CV Mahasiswa</h1>
    </div>

    <div class="section">
        <h3>Informasi Umum</h3>
        <p><strong>NIM:</strong> {{ $mahasiswa->NIM }}</p>
        <p><strong>Nama Mahasiswa:</strong> {{ $mahasiswa->user->name }}</p>
        <p><strong>Tanggal Lahir:</strong> {{ $mahasiswa->tanggal_lahir->format('d-m-Y') }}</p>
        <p><strong>Jenis Kelamin:</strong> {{ $mahasiswa->jenis_kelamin }}</p>
        <p><strong>Universitas:</strong> {{ $mahasiswa->universitas }}</p>
        <p><strong>Fakultas:</strong> {{ $mahasiswa->fakultas }}</p>
        <p><strong>Alamat KTP:</strong> {{ $mahasiswa->alamat_KTP }}</p>
        <p><strong>Alamat Domisili:</strong> {{ $mahasiswa->alamat_domisili }}</p>
        <p><strong>Jurusan:</strong> {{ $mahasiswa->jurusan }}</p>
        <p><strong>IPK:</strong> {{ $mahasiswa->IPK }}</p>
        <p><strong>No Telepon:</strong> {{ $mahasiswa->no_telepon }}</p>
        <p><strong>Semester:</strong> {{ $mahasiswa->semester }}</p>
        
        @if($mahasiswa->pas_foto)
        <img src="{{ storage_path('app/public/' . $mahasiswa->pas_foto) }}" alt="Pas Foto" class="photo">
    @else
        <p>Pas Foto tidak tersedia.</p>
    @endif
    
         
    </div>

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

    <div class="section">
        <h3>Pengalaman</h3>
        @if($mahasiswa->pengalaman->isNotEmpty())
            <ul class="pengalaman">
                @foreach($mahasiswa->pengalaman as $pengalaman)
                    <li>
                        <strong>{{ $pengalaman->posisi }}</strong> di {{ $pengalaman->instansi }}<br>
                        {{ \Carbon\Carbon::parse($pengalaman->tanggal_mulai)->format('d-m-Y') }} - 
                        {{ \Carbon\Carbon::parse($pengalaman->tanggal_berakhir)->format('d-m-Y') }}<br>
                        {{ $pengalaman->deskripsi }}
                    </li>
                @endforeach
            </ul>
        @else
            <p>Belum Input Pengalaman</p>
        @endif
    </div>
</body>
</html>
