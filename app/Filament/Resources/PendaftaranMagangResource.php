<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PendaftaranMagangResource\Pages;
use App\Models\PendaftaranMagang;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Actions\BulkAction;
use Illuminate\Database\Eloquent\Builder;
use App\Notifications\PendaftaranBerhasil;
use Filament\Infolists;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components\TextEntry;
use Filament\Tables\Actions\Action;

class PendaftaranMagangResource extends Resource
{
    protected static ?string $model = PendaftaranMagang::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';


    public static function getNavigationLabel(): string
    {
        return 'Pendaftaran Magang'; // Custom singular label
    }

    public static function getPluralModelLabel(): string
    {
        return 'Pendaftaran Magang '; // Ubah sesuai dengan label yang diinginkan tanpa 's'
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('NIM')
                    ->required()
                    ->maxLength(50),
                Forms\Components\TextInput::make('posisi_magang_per_batch_id')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('status')
                    ->required(),
                Forms\Components\DateTimePicker::make('tanggal_pendaftaran')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('unique_id')
                    ->label('ID Pendaftaran')
                    ->sortable()
                    ->searchable(),
                    Tables\Columns\TextColumn::make('user.name')
                    ->label('Nama Pendaftar')
                    ->url(fn ($record) => 
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
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->label('Status'),
                Tables\Columns\TextColumn::make('tanggal_pendaftaran')
                    ->label('Tanggal Pendaftaran')
                    ->dateTime()
                    ->sortable(),
            ])
            // ->actions([
            //     Tables\Actions\Action::make('viewMahasiswa')
            //         ->label('Lihat Profil Mahasiswa')
            //         ->icon('heroicon-o-eye')
            //         ->url(fn ($record) => $record->user->profilMahasiswa 
            //             ? route('filament.admin.resources.mahasiswas.view', ['record' => $record->user->profilMahasiswa->id])
            //             : '#')
            //         ->openUrlInNewTab()
            //         ->visible(fn ($record) => $record->user->profilMahasiswa !== null)
            // ])
            
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
                BulkAction::make('Set Status Diterima')
                    ->action(function ($records) {
                        $pendaftaranMagangs = PendaftaranMagang::whereIn('id', $records->pluck('id')->toArray())->get();
    
                        foreach ($pendaftaranMagangs as $pendaftaran) {
                            $pendaftaran->update(['status' => 'diterima']);
    
                            // Muat relasi `posisiMagangPerBatch` beserta `batch` dan `posisiMagang`
                            $posisiMagang = $pendaftaran->posisiMagangPerBatch->load('batch', 'posisiMagang');
    
                            // Kirim notifikasi dengan objek `posisiMagangPerBatch` lengkap
                            $pendaftaran->user->notify(new PendaftaranBerhasil($posisiMagang));
                        }
                    })
                    ->requiresConfirmation()
                    ->color('success')
                    ->label('Set Status Diterima'),
                BulkAction::make('Set Status Ditolak')
                    ->action(function ($records) {
                        // Ubah status menjadi "ditolak" untuk setiap pendaftaran yang dipilih
                        PendaftaranMagang::whereIn('id', $records->pluck('id')->toArray())
                            ->update(['status' => 'ditolak']);
                    })
                    ->requiresConfirmation()
                    ->color('danger')
                    ->label('Set Status Ditolak'),
            ]);
    }
    
    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Infolists\Components\TextEntry::make('unique_id')
                    ->label('ID Pendaftaran'),
                Infolists\Components\TextEntry::make('user.name')
                    ->label('Nama Pendaftar'),
                Infolists\Components\TextEntry::make('posisiMagangPerBatch.posisiMagang.nama_posisi')
                    ->label('Posisi Magang'),
                Infolists\Components\TextEntry::make('posisiMagangPerBatch.batch.nama_batch')
                    ->label('Batch'),
                Infolists\Components\TextEntry::make('status')
                    ->label('Status'),
                Infolists\Components\TextEntry::make('tanggal_pendaftaran')
                    ->label('Tanggal Pendaftaran')
                    ->dateTime(),
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
            // 'create' => Pages\CreatePendaftaranMagang::route('/create'),
            'edit' => Pages\EditPendaftaranMagang::route('/{record}/edit'),
            'view' => Pages\ViewPendaftaranMagang::route('/{record}'), // Make sure to define this route
        ];
    }
}
