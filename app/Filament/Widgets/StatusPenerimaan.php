<?php

namespace App\Filament\Widgets;

use App\Models\Pengaturan;
use Filament\Widgets\Widget;
use App\Filament\Resources\PengaturanResource; 

class StatusPenerimaan extends Widget
{
    protected static string $view = 'filament.widgets.status-penerimaan';

    // Override method viewData untuk meneruskan data ke view
    protected function getViewData(): array
    {
        $pengaturan = Pengaturan::first();
        $statusPenerimaan = $pengaturan ? $pengaturan->sistem_penerimaan : 'Manual';
                // Gunakan helper getUrl() dari Filament Resource
                $pengaturanUrl = PengaturanResource::getUrl('index');

        return [
            'statusPenerimaan' => $statusPenerimaan,
            'pengaturanUrl' => $pengaturanUrl,

        ];
    }
}
