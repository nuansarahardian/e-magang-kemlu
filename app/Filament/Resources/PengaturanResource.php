<?php


namespace App\Filament\Resources;

use App\Filament\Resources\PengaturanResource\Pages;
use App\Models\Pengaturan;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Forms\Form;
use Filament\Tables\Table;
use App\Filament\Widgets\WelcomeText; // Pastikan untuk mengimpor widget kustom

class PengaturanResource extends Resource
{
    protected static ?string $model = Pengaturan::class;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';
    public static function getNavigationLabel(): string
    {
        return 'Pengaturan'; // Custom singular label
    }

    public static function getPluralModelLabel(): string
    {
        return 'Pengaturan '; // Ubah sesuai dengan label yang diinginkan tanpa 's'
    }
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Card::make()
                    ->schema([
                        Forms\Components\Radio::make('sistem_penerimaan')
                            ->label(false)
                            ->options([
                                'Manual' => 'Manual',
                                'Otomatis' => 'Otomatis',
                            ])
                            ->required()
                            ->default(fn ($record) => $record ? $record->sistem_penerimaan : 'Manual') // Set default sesuai data aktif
                            ->columns(2) // Menampilkan opsi berdampingan
                            ->descriptions([
                                'Manual' => 'Pilih sistem penerimaan manual untuk verifikasi.',
                                'Otomatis' => 'Pilih sistem penerimaan otomatis untuk alur cepat.',
                            ])
                            ->extraAttributes([
                                'class' => 'px-6 pb-4 border rounded-lg shadow-md '
                            ]),
                    ])
                    ->extraAttributes([
                        'class' => 'border rounded-lg shadow-md pt-4' // Menambah padding di dalam card
                    ])
                    ->label('cek cek') // Menghapus label default untuk card
                    ->columnSpan('full') // Memastikan card menggunakan seluruh lebar
            ]);
    }

    /**
     * Tambahkan custom widget di halaman tabel.
     */
    public static function getWidgets(): array
    {
        return [
            WelcomeText::class, // Pastikan widget ini sudah dibuat di App\Filament\Widgets
        ];
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                // Kolom Sistem Penerimaan dengan format
                Tables\Columns\TextColumn::make('sistem_penerimaan')
                    ->label('Sistem Penerimaan')
                    ->formatStateUsing(fn($state) => $state === 'Otomatis' ? 'Otomatis' : 'Manual')
                    ->extraAttributes([
                        'class' => 'text-lg font-semibold' // Menambah styling untuk teks
                    ]),
                
                // Kolom Created At
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Dibuat Pada')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                
                // Kolom Updated At
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Diperbarui Pada')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                // Tambahkan filter jika diperlukan
            ])
            ->actions([
                Tables\Actions\EditAction::make(), // Aksi Edit
            ])
            ->defaultSort('created_at', 'desc') // Menambahkan sorting default
            ->striped(); // Menambahkan striping pada baris tabel
    }

    public static function canCreate(): bool
    {
        // Hanya izinkan create jika belum ada data di tabel Pengaturan
        return Pengaturan::count() === 0;
    }

    public static function getRelations(): array
    {
        return [
            // Tambahkan relasi di sini jika ada
        ];
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
