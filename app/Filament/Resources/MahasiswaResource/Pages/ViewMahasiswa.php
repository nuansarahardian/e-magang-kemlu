<?php

namespace App\Filament\Resources\MahasiswaResource\Pages;

use App\Filament\Resources\MahasiswaResource;
use Filament\Pages\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewMahasiswa extends ViewRecord
{
    protected static string $resource = MahasiswaResource::class;

    protected function getActions(): array
    {
        return [
            Actions\EditAction::make(),
            Actions\Action::make('download_cv')
                ->label('Download CV')
                ->url(fn ($record) => route('mahasiswa.download_cv', $record->NIM)),
            Actions\Action::make('download_sertifikat')
                ->label('Download Sertifikat')
                ->url(fn ($record) => route('mahasiswa.download_sertifikat', $record->NIM))
                ->color('success')
                ->visible(fn ($record) => !empty($record->nomor_registrasi)), // Show button only if nomor_registrasi is set
        ];
    }
}
