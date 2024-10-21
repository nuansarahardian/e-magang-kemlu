<?php

namespace App\Filament\Resources\BatchResource\Pages;

use App\Filament\Resources\BatchResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditBatch extends EditRecord
{
    protected static string $resource = BatchResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
    protected function getRedirectUrl(): string
    {
        // Redirect ke halaman tabel (index)
        return $this->getResource()::getUrl('index');
    }
}
