<?php

namespace App\Filament\Resources\PosisiMagangPerBatchResource\Pages;

use App\Filament\Resources\PosisiMagangPerBatchResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPosisiMagangPerBatch extends EditRecord
{
    protected static string $resource = PosisiMagangPerBatchResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
