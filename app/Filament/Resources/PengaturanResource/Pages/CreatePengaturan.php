<?php

namespace App\Filament\Resources\PengaturanResource\Pages;

use App\Filament\Resources\PengaturanResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreatePengaturan extends CreateRecord
{
    protected static string $resource = PengaturanResource::class;
    protected function getRedirectUrl(): string
    {
        // Redirect ke halaman tabel (index)
        return $this->getResource()::getUrl('index');
    }
}
