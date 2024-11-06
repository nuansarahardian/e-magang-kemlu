<div>
    <h2>KTM</h2>
    @if($record->KTM)
        <img src="{{ $ktmUrl }}" alt="KTM" style="max-width: 100%; height: auto;">
        <br>
        <a href="{{ $ktmUrl }}" download class="btn btn-primary">Download KTM</a>
    @else
        <p>Tidak ada file KTM.</p>
    @endif

    <h2>Pas Foto</h2>
    @if($record->pas_foto)
        <img src="{{ $pasFotoUrl }}" alt="Pas Foto" style="max-width: 100%; height: auto;">
        <br>
        <a href="{{ $pasFotoUrl }}" download class="btn btn-primary">Download Pas Foto</a>
    @else
        <p>Tidak ada file Pas Foto.</p>
    @endif

    <h2>Surat Permohonan</h2>
    @if($record->surat_permohonan)
        <a href="{{ $suratPermohonanUrl }}" target="_blank">View Surat Permohonan</a> | 
        <a href="{{ $suratPermohonanUrl }}" download class="btn btn-primary">Download Surat Permohonan</a>
    @else
        <p>Tidak ada file Surat Permohonan.</p>
    @endif

    <h2>Transkrip Nilai</h2>
    @if($record->transkrip_nilai)
        <a href="{{ $transkripNilaiUrl }}" target="_blank">View Transkrip Nilai</a> | 
        <a href="{{ $transkripNilaiUrl }}" download class="btn btn-primary">Download Transkrip Nilai</a>
    @else
        <p>Tidak ada file Transkrip Nilai.</p>
    @endif
</div>
