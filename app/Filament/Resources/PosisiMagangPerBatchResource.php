<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PosisiMagangPerBatchResource\Pages;
use App\Models\PosisiMagangPerBatch;
use App\Models\Batch;
use App\Models\PosisiMagang;
use App\Models\Pengaturan; // Import model Pengaturan
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\Hidden;
use Illuminate\Database\Eloquent\Model;

class PosisiMagangPerBatchResource extends Resource
{
    protected static ?string $model = PosisiMagangPerBatch::class;


    public static function getNavigationLabel(): string
    {
        return 'Posisi Magang Per Batch'; // Custom singular label
    }
    public static function getPluralModelLabel(): string
{
    return 'Posisi Magang Per Batch'; // Ubah sesuai dengan label yang diinginkan tanpa 's'
}

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        $pengaturanGlobal = Pengaturan::first(); // Ambil pengaturan global

        return $form
            ->schema([
                Select::make('batch_id')
                    ->label('Batch')
                    ->relationship('batch', 'nama_batch')
                    ->required(),

                Select::make('posisi_magang_id')
                    ->label('Posisi Magang')
                    ->relationship('posisiMagang', 'nama_posisi')
                    ->required(),

                Forms\Components\TextInput::make('kuota')
                    ->required()
                    ->numeric(),

                Select::make('sistem_penerimaan')
                    ->label('Sistem Penerimaan')
                    ->options([
                        'Manual' => 'Manual',
                        'Otomatis' => 'Otomatis',
                    ])
                    ->required()
                    ->hidden($pengaturanGlobal->sistem_penerimaan === 'Otomatis')
                    ->default(function() use ($pengaturanGlobal) {
                        // Set default ke "Otomatis" jika pengaturan global Otomatis
                        return $pengaturanGlobal->sistem_penerimaan === 'Otomatis' ? 'Otomatis' : 'Manual';
                    }),

                Forms\Components\Hidden::make('pengaturan_id')
                    ->default($pengaturanGlobal->id), // Set pengaturan_id secara otomatis

                Toggle::make('is_full')
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
                
                TextColumn::make('sistem_penerimaan')
                    ->label('Sistem Penerimaan'),

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

    // Override the save process to enforce "Otomatis" sistem_penerimaan
    protected static function boot()
    {
        parent::boot();

        // Force the 'sistem_penerimaan' field to 'Otomatis' if the global setting is 'Otomatis'
        static::saving(function (Model $model) {
            $pengaturanGlobal = Pengaturan::first();
            if ($pengaturanGlobal && $pengaturanGlobal->sistem_penerimaan === 'Otomatis') {
                $model->sistem_penerimaan = 'Otomatis';
            }
        });
    }
}
