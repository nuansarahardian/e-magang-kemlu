<!DOCTYPE html>
<html>
<head>
    <title>Profil Mahasiswa</title>
</head>
<body>
    <h1>Data Mahasiswa</h1>
    <table border="1" cellspacing="0" cellpadding="5">
        <tr>
            <th>NIM</th>
            <th>Nama Mahasiswa</th>
            <th>Tanggal Lahir</th>
            <th>Jenis Kelamin</th>
            <!-- Tambahkan kolom lain yang ingin ditampilkan -->
        </tr>
        @foreach($records as $record)
        <tr>
            <td>{{ $record->NIM }}</td>
            <td>{{ $record->user->name }}</td>
            <td>{{ \Carbon\Carbon::parse($record->tanggal_lahir)->format('d M Y') }}</td>
            <td>{{ $record->jenis_kelamin }}</td>
            <!-- Tambahkan data lainnya sesuai kebutuhan -->
        </tr>
        @endforeach
    </table>
</body>
</html>
