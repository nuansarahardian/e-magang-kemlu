<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PosisiMagangPerBatchResource\Pages;
use App\Models\PosisiMagangPerBatch;
use App\Models\Batch;
use App\Models\PosisiMagang;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\Select;
use Illuminate\Database\Eloquent\Builder;

class PosisiMagangPerBatchResource extends Resource
{
    protected static ?string $model = PosisiMagangPerBatch::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('batch_id')
                    ->label('Batch')
                    ->relationship('batch', 'nama_batch') // Menggunakan relasi ke Batch
                    ->required(),
                Select::make('posisi_magang_id')
                    ->label('Posisi Magang')
                    ->relationship('posisiMagang', 'nama_posisi') // Menggunakan relasi ke PosisiMagang
                    ->required(),
                Forms\Components\TextInput::make('kuota')
                    ->required()
                    ->numeric(),
            
                Forms\Components\Toggle::make('is_full')
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('batch.nama_batch') // Menampilkan nama batch
                    ->label('Batch')
                    ->sortable(),
                TextColumn::make('posisiMagang.nama_posisi') // Menampilkan nama posisi magang
                    ->label('Posisi Magang')
                    ->sortable(),
                TextColumn::make('kuota')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('jumlah_pendaftar')
                    ->numeric()
                    ->sortable(),
                IconColumn::make('is_full')
                    ->boolean(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                // Tambahkan filter jika diperlukan
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            // Tambahkan relasi jika ada
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPosisiMagangPerBatches::route('/'),
            'create' => Pages\CreatePosisiMagangPerBatch::route('/create'),
            'edit' => Pages\EditPosisiMagangPerBatch::route('/{record}/edit'),
        ];
    }
}
