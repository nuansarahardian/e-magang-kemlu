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
                // ->icon('heroicon-o-document-download')
                ->url(fn ($record) => route('mahasiswa.download_cv', $record->NIM))
            
        ];
    }
}
