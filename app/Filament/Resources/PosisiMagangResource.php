<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PosisiMagangResource\Pages;
use App\Models\PosisiMagang;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\DeleteBulkAction;

class PosisiMagangResource extends Resource
{
    protected static ?string $model = PosisiMagang::class;

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';
    public static function getNavigationLabel(): string
    {
        return 'Posisi Magang'; // Custom singular label
    }

    public static function getPluralModelLabel(): string
    {
        return 'Posisi Magang '; // Ubah sesuai dengan label yang diinginkan tanpa 's'
    }
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('kode_posisi')
                    ->label('Kode Posisi')
                    ->required()
                    ->maxLength(10)
                    ->unique(ignoreRecord: true), // Pastikan kode_posisi unik
                Forms\Components\TextInput::make('nama_posisi')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Textarea::make('deskripsi')
                    ->required()
                    ->columnSpanFull(),
            
                FileUpload::make('gambar') // Upload gambar
                    ->image()
                    ->directory('posisi-magang') // Direktori penyimpanan
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('kode_posisi') // Tambahkan kolom kode_posisi di tabel
                    ->label('Kode Posisi')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('nama_posisi')
                    ->searchable(),
                TextColumn::make('deskripsi') // Menambahkan deskripsi di tabel
                    ->limit(50) // Membatasi tampilan deskripsi di tabel (opsional)
                    ->label('Deskripsi'),
                ImageColumn::make('gambar') // Menampilkan gambar di tabel
                    ->label('Gambar')
                    ->sortable(),
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
                EditAction::make(),
            ])
            ->bulkActions([
                DeleteBulkAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            // Definisikan relasi jika ada
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPosisiMagangs::route('/'),
            'create' => Pages\CreatePosisiMagang::route('/create'),
            'edit' => Pages\EditPosisiMagang::route('/{record}/edit'),
        ];
    }
}
