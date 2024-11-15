<?php

namespace App\Filament\Resources;

use App\Filament\Exports\PendaftaranMagangExporter;
use Filament\Tables\Actions\ExportBulkAction;
use App\Filament\Resources\PendaftaranMagangResource\Pages;
use App\Models\PendaftaranMagang;
use App\Models\PosisiMagangPerBatch;
use App\Models\ProfilMahasiswa;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\DateTimePicker;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Actions\BulkAction;
use Illuminate\Support\Collection;
use Filament\Notifications\Notification;
use Filament\Infolists;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components\TextEntry;
use Filament\Tables\Actions\Action;
use Filament\Actions\Exports\Enums\ExportFormat;
use Illuminate\Support\Facades\Storage;
use ZipArchive;
use Illuminate\Support\Facades\Log;

class PendaftaranMagangResource extends Resource
{
    protected static ?string $model = PendaftaranMagang::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function getNavigationLabel(): string
    {
        return 'Pendaftaran Magang';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Pendaftaran Magang';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('unique_id')
                    ->label('Nomor Registrasi')
                    ->required()
                    ->maxLength(50),
                Select::make('NIM')
                    ->label('NIM')
                    ->required()
                    ->options(ProfilMahasiswa::all()->pluck('NIM', 'NIM'))
                    ->searchable(),
                Select::make('posisi_magang_per_batch_id')
                    ->label('Posisi Magang')
                    ->required()
                    ->options(
                        PosisiMagangPerBatch::with(['posisiMagang', 'batch'])
                            ->get()
                            ->mapWithKeys(function ($item) {
                                $label = $item->posisiMagang->nama_posisi . ' - ' . $item->batch->nama_batch;
                                return [$item->id => $label];
                            })
                    )
                    ->searchable(),
                Select::make('status')
                    ->label('Status')
                    ->required()
                    ->options([
                        'aktif' => 'Aktif',
                        'diterima' => 'Diterima',
                        'lulus' => 'Lulus',
                        'tidak_lulus' => 'Tidak Lulus',
                    ]),
                DateTimePicker::make('tanggal_pendaftaran')->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('unique_id')
                    ->label('Nomor Registrasi')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Nama Pendaftar')
                    ->url(fn($record) => 
                        $record->user && $record->user->profilMahasiswa 
                            ? route('filament.admin.resources.mahasiswas.view', ['record' => $record->user->profilMahasiswa->NIM]) 
                            : '#'
                    )
                    ->openUrlInNewTab()
                    ->searchable(),
                Tables\Columns\TextColumn::make('posisiMagangPerBatch.posisiMagang.nama_posisi')
                    ->label('Posisi Magang')
                    ->sortable()
                    ->searchable()
                    ->extraAttributes(['style' => 'white-space: normal; word-wrap: break-word; width: 160px;']),
                Tables\Columns\TextColumn::make('posisiMagangPerBatch.batch.nama_batch')
                    ->label('Batch')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'warning' => 'diterima',
                        'primary' => 'aktif',
                        'success' => 'lulus',
                        'danger' => 'tidak lulus',
                    ]),
                Tables\Columns\TextColumn::make('tanggal_pendaftaran')
                    ->label('Tanggal Pendaftaran')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('posisi_magang_per_batch_id')
                    ->label('Filter by Posisi')
                    ->relationship('posisiMagangPerBatch.posisiMagang', 'nama_posisi')
                    ->placeholder('Semua Posisi'),
                Tables\Filters\SelectFilter::make('batch_id')
                    ->label('Filter by Batch')
                    ->relationship('posisiMagangPerBatch.batch', 'nama_batch')
                    ->placeholder('Semua Batch'),
            ])
            ->bulkActions([
                ExportBulkAction::make()
                    ->label('Export Data .xlsx')
                    ->icon('heroicon-m-arrow-down-tray')
                    ->exporter(PendaftaranMagangExporter::class)
                    ->formats([ExportFormat::Xlsx]),
                
                    BulkAction::make('bulkDownloadFiles')
                    ->label('Bulk Download Files')
                    ->action(function (Collection $records) {
                        $zipFileName = 'dokumen_pendaftar_magang_bskln_' . date('Ymd_His') . '.zip';
                        $zipPath = public_path("storage/dokumen/$zipFileName");
                
                        Log::info("Starting ZIP creation at path: $zipPath");
                
                        $zip = new ZipArchive;
                        if ($zip->open($zipPath, ZipArchive::CREATE) === TRUE) {
                            Log::info("ZIP file opened successfully at $zipPath.");
                            
                    
                
                            foreach ($records as $record) {
                                $profil = $record->profilMahasiswa;
                                $user = $record->user;
                
                                // Pastikan $profil tidak null
                                if ($profil || $user) {
                                    $nimFolder = $user->name . '_' . $profil->NIM . '_' . $profil->universitas; // Nama folder berdasarkan NIM
                                    $zip->addEmptyDir($nimFolder); // Buat folder dalam ZIP untuk setiap NIM
                
                                    $documents = [
                                        'KTM' => $profil->KTM,
                                        'Transkrip' => $profil->transkrip_nilai,
                                        'Surat_Permohonan' => $profil->surat_permohonan,
                                        'pas_foto' => $profil->pas_foto
                                    ];
                                    
                                    foreach ($documents as $type => $fileName) {
                                        if ($fileName) {
                                            $filePath = Storage::disk('public')->path("/" . $fileName);
                                            Log::info("Checking file at path: $filePath for type: $type");
                
                                            if (file_exists($filePath)) {
                                                // Simpan file di folder NIM dalam ZIP
                                                $archiveName = "{$nimFolder}/{$type}_{$profil->NIM}." . pathinfo($fileName, PATHINFO_EXTENSION);
                                                if ($zip->addFile($filePath, $archiveName)) {
                                                    Log::info("Added {$type} file for NIM: " . $profil->NIM);
                                                } else {
                                                    Log::error("Failed to add {$type} file for NIM: " . $profil->NIM . " at path: $filePath");
                                                }
                                            } else {
                                                Log::warning("File does not exist at path: $filePath for NIM: " . $profil->NIM);
                                            }
                                        }
                                    }
                                } else {
                                    Log::warning("No ProfilMahasiswa found for PendaftaranMagang with ID: " . $record->id);
                                }
                            }
                            
                            $zip->close();
                            Log::info("ZIP file closed successfully at $zipPath.");
                
                            clearstatcache();
                            if (file_exists($zipPath) && filesize($zipPath) > 0) {
                                Log::info("ZIP file created successfully and exists at $zipPath with size " . filesize($zipPath));
                                return response()->download($zipPath)->deleteFileAfterSend(true);
                            } else {
                                Log::error("ZIP file failed to be created or is empty at $zipPath.");
                                Notification::make()->title('ZIP file not found after creation or is empty.')->danger()->send();
                            }
                        } else {
                            Log::error("Failed to open ZIP file at $zipPath.");
                            Notification::make()->title('Gagal Membuat File ZIP')->danger()->send();
                            return;
                        }
                    })
                    ->requiresConfirmation()
                    ->color('primary'),
                
                
                

                BulkAction::make('Hapus Data')
                    ->action(function ($records) {
                        $records->each->delete();
                    })
                    ->requiresConfirmation()
                    ->color('danger')
                    ->label('Hapus Data'),

                BulkAction::make('Set Status Lulus')
                    ->action(function ($records) {
                        PendaftaranMagang::whereIn('id', $records->pluck('id')->toArray())
                            ->update(['status' => 'lulus']);
                    })
                    ->requiresConfirmation()
                    ->color('success')
                    ->label('Set Status Lulus'),

                BulkAction::make('Set Status Tidak Lulus')
                    ->action(function ($records) {
                        PendaftaranMagang::whereIn('id', $records->pluck('id')->toArray())
                            ->update(['status' => 'tidak lulus']);
                    })
                    ->requiresConfirmation()
                    ->color('danger')
                    ->label('Set Status Tidak Lulus'),

                BulkAction::make('Set Status Diterima')
                    ->action(function ($records) {
                        PendaftaranMagang::whereIn('id', $records->pluck('id')->toArray())
                            ->update(['status' => 'diterima']);
                    })
                    ->requiresConfirmation()
                    ->color('warning')
                    ->label('Set Status Diterima'),
            ]);
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                TextEntry::make('unique_id')->label('ID Pendaftaran'),
                TextEntry::make('user.name')->label('Nama Pendaftar'),
                TextEntry::make('posisiMagangPerBatch.posisiMagang.nama_posisi')->label('Posisi Magang'),
                TextEntry::make('posisiMagangPerBatch.batch.nama_batch')->label('Batch'),
                TextEntry::make('status')->label('Status'),
                TextEntry::make('tanggal_pendaftaran')->label('Tanggal Pendaftaran')->dateTime(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPendaftaranMagangs::route('/'),
            'edit' => Pages\EditPendaftaranMagang::route('/{record}/edit'),
            'view' => Pages\ViewPendaftaranMagang::route('/{record}'),
        ];
    }
}
