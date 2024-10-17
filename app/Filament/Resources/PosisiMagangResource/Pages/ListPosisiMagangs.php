<?php

namespace App\Filament\Resources\PosisiMagangResource\Pages;

use App\Filament\Resources\PosisiMagangResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPosisiMagangs extends ListRecords
{
    protected static string $resource = PosisiMagangResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
