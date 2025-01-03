<?php

namespace App\Filament\Resources\PosisiMagangResource\Pages;

use App\Filament\Resources\PosisiMagangResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPosisiMagang extends EditRecord
{
    protected static string $resource = PosisiMagangResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index'); // Mengarahkan ke halaman index setelah create
    }
}
