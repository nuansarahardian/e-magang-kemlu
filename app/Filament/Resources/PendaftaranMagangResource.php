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

class PendaftaranMagangResource extends Resource
{
    protected static ?string $model = PendaftaranMagang::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

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
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Nama Pendaftar')
                    ->searchable(),
                Tables\Columns\TextColumn::make('posisiMagangPerBatch.posisiMagang.nama_posisi')
                    ->label('Posisi Magang')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('posisiMagangPerBatch.batch.nama_batch')
                    ->label('Batch')
                    ->sortable()
                    ->searchable(),
                Tables\Columns\TextColumn::make('status')
                    ->label('Status'),
                Tables\Columns\TextColumn::make('tanggal_pendaftaran')
                    ->label('Tanggal Pendaftaran')
                    ->dateTime()
                    ->sortable(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
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
        ];
    }
}
