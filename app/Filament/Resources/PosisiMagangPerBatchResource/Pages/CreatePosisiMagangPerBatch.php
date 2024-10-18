<?php

namespace App\Filament\Resources\PosisiMagangPerBatchResource\Pages;

use App\Filament\Resources\PosisiMagangPerBatchResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreatePosisiMagangPerBatch extends CreateRecord
{
    protected static string $resource = PosisiMagangPerBatchResource::class;
    protected function getRedirectUrl(): string
    {
        // Redirect ke halaman tabel (index)
        return $this->getResource()::getUrl('index');
    }
}
