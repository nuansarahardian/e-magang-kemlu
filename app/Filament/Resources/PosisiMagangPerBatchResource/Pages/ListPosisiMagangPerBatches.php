<?php

namespace App\Filament\Resources\PosisiMagangPerBatchResource\Pages;

use App\Filament\Resources\PosisiMagangPerBatchResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPosisiMagangPerBatches extends ListRecords
{
    protected static string $resource = PosisiMagangPerBatchResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
