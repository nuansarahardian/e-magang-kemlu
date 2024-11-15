<?php

namespace App\Filament\Exports;

use App\Models\PendaftaranMagang;
use Filament\Actions\Exports\ExportColumn;
use Filament\Actions\Exports\Exporter;
use Filament\Actions\Exports\Models\Export;
use OpenSpout\Common\Entity\Style\CellAlignment;
use OpenSpout\Common\Entity\Style\CellVerticalAlignment;
use OpenSpout\Common\Entity\Style\Color;
use OpenSpout\Common\Entity\Style\Style;

class PendaftaranMagangExporter extends Exporter
{
    protected static ?string $model = PendaftaranMagang::class;

    public static function getColumns(): array
    {
        return [
            ExportColumn::make('id')
                ->label('ID'),
            ExportColumn::make('unique_id')       ->label('Nomor Registrasi'),
            ExportColumn::make('NIM')        ->label('NIM'),
            ExportColumn::make('user.name')  ->label('Nama Lengkap'),
            ExportColumn::make('user.profilMahasiswa.universitas')  ->label('Universitas'),
            ExportColumn::make('user.profilMahasiswa.jurusan')  ->label('Jurusan'),
            ExportColumn::make('posisiMagangPerBatch.posisiMagang.nama_posisi') ->label('Penempatan Magang'),
            ExportColumn::make('posisiMagangPerBatch.batch.nama_batch')  ->label('Periode Magang'),

            ExportColumn::make('tanggal_pendaftaran') ->label('Tanggal Pendaftaran'),
            ExportColumn::make('status'),

        ];
    }
    public function getFileName(Export $export): string
    {
        return "MahasiswaMagangBSKLNKemlu-{$export->getKey()}.xlsx";
    }

    public function getXlsxHeaderCellStyle(): ?Style
{
    return (new Style())
        ->setFontBold()

        ->setFontSize(12)

        ->setFontColor(Color::rgb(255,255,255))
        ->setBackgroundColor(Color::rgb(30,144,255))
        ->setCellAlignment(CellAlignment::CENTER)
        ->setShouldWrapText(true)
        ->setCellVerticalAlignment(CellVerticalAlignment::CENTER);
}
    public static function getCompletedNotificationBody(Export $export): string
    {
        $body = 'Your pendaftaran magang export has completed and ' . number_format($export->successful_rows) . ' ' . str('row')->plural($export->successful_rows) . ' exported.';

        if ($failedRowsCount = $export->getFailedRowsCount()) {
            $body .= ' ' . number_format($failedRowsCount) . ' ' . str('row')->plural($failedRowsCount) . ' failed to export.';
        }
      
        return $body;
    }
}
