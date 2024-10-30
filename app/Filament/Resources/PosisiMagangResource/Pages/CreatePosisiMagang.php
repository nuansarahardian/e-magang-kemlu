<?php

namespace App\Filament\Resources\PosisiMagangResource\Pages;

use App\Filament\Resources\PosisiMagangResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreatePosisiMagang extends CreateRecord
{
    protected static string $resource = PosisiMagangResource::class;
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index'); // Mengarahkan ke halaman index setelah create
    }
}

