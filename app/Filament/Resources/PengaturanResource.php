<?php
namespace App\Filament\Resources;

use App\Filament\Resources\PengaturanResource\Pages;
use App\Models\Pengaturan;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class PengaturanResource extends Resource
{
    protected static ?string $model = Pengaturan::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Forms\Form $form): Forms\Form
    {
        return $form
            ->schema([
                Forms\Components\Card::make()
                    ->schema([
                        Forms\Components\Radio::make('sistem_penerimaan')
                            ->label('Sistem Penerimaan')
                            ->options([
                                'Manual' => 'Manual',
                                'Otomatis' => 'Otomatis',
                            ])
                            ->required()
                            ->default('Manual') // Set default pilihan
                            ->columns(2) // Menampilkan opsi berdampingan
                            ->descriptions([
                                'Manual' => 'Pilih sistem penerimaan manual untuk verifikasi.',
                                'Otomatis' => 'Pilih sistem penerimaan otomatis untuk alur cepat.',
                            ])
                            ->extraAttributes([
                                'class' => 'px-6 pb-4 border rounded-lg shadow-md'
                            ]),
                    ])
                    ->extraAttributes([
                        'class' => 'border rounded-lg shadow-md mt-4 p-6'
                    ])
                    ->label('') // Menghapus label default untuk card
                    ->columnSpan('full')
                    ->extraAttributes(['style' => 'margin-top: 20px;']),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('sistem_penerimaan')
                    ->label('Sistem Penerimaan')
                    ->formatStateUsing(fn($state) => $state === 'Otomatis' ? 'Otomatis' : 'Manual')
                    ->extraAttributes([
                        'class' => 'text-lg font-semibold'
                    ]),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat Pada')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Diperbarui Pada')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->striped()
        
            ->actions([
                Tables\Actions\EditAction::make(), // Aksi Edit
            ]);
    }

    public static function canCreate(): bool
    {
        // Hanya izinkan create jika belum ada data di tabel Pengaturan
        return Pengaturan::count() === 0; // Create button hidden if there is already a record
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPengaturans::route('/'),
            'create' => Pages\CreatePengaturan::route('/create'),
            'edit' => Pages\EditPengaturan::route('/{record}/edit'),
        ];
    }
}
