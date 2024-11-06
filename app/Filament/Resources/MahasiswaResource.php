<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MahasiswaResource\Pages;
use App\Models\ProfilMahasiswa;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Infolists;
use Filament\Infolists\Infolist;
use Filament\Infolists\Components\TextEntry;
use Filament\Actions\Action; // Ensure Action is imported correctly
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\BulkActionGroup;

class MahasiswaResource extends Resource
{
    protected static ?string $model = ProfilMahasiswa::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
   
    public static function getNavigationLabel(): string
    {
        return 'Profil Mahasiswa'; // Custom singular label
    }
    public static function getPluralModelLabel(): string
    {
        return 'Profil Mahasiswa '; // Ubah sesuai dengan label yang diinginkan tanpa 's'
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('NIM')->label('NIM')->required(),
                Forms\Components\TextInput::make('user.name')->label('Nama Mahasiswa')->required()->disabled(),
                Forms\Components\DatePicker::make('tanggal_lahir')->label('Tanggal Lahir')->required(),
                Forms\Components\TextInput::make('jenis_kelamin')->label('Jenis Kelamin')->required(),
                Forms\Components\TextInput::make('universitas')->label('Universitas')->required(),
                Forms\Components\TextInput::make('fakultas')->label('Fakultas')->required(),
                Forms\Components\TextInput::make('alamat_KTP')->label('Alamat KTP')->required(),
                Forms\Components\TextInput::make('alamat_domisili')->label('Alamat Domisili')->required(),
                Forms\Components\TextInput::make('jurusan')->label('Jurusan')->required(),
                Forms\Components\TextInput::make('IPK')->label('IPK')->numeric()->required(),
                Forms\Components\TextInput::make('no_telepon')->label('No Telepon')->required(),
                Forms\Components\TextInput::make('semester')->label('Semester')->numeric()->required(),
                Forms\Components\FileUpload::make('KTM')->label('KTM')->image(),
                Forms\Components\FileUpload::make('pas_foto')->label('Pas Foto')->image(),
                Forms\Components\FileUpload::make('surat_permohonan')->label('Surat Permohonan')->image(),
                Forms\Components\FileUpload::make('transkrip_nilai')->label('Transkrip Nilai')->image(),
                Forms\Components\TextInput::make('status_data')->label('Status Data')->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('NIM')
                    ->label('NIM')
                    ->wrapHeader()
                    ->extraAttributes(['style' => 'white-space: normal; word-wrap: break-word; width: 100px;']),
                    
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Nama Mahasiswa')
                    ->extraAttributes(['style' => 'white-space: normal; word-wrap: break-word; width: 150px;']),

                Tables\Columns\TextColumn::make('tanggal_lahir')
                    ->label('Tanggal Lahir')
                    ->date()
                    ->extraAttributes(['style' => 'white-space: normal; word-wrap: break-word; width: 100px;']),
                    
                Tables\Columns\TextColumn::make('jenis_kelamin')
                    ->label('Jenis Kelamin')
                    ->extraAttributes(['style' => 'white-space: normal; word-wrap: break-word; width: 100px;']),

                Tables\Columns\TextColumn::make('universitas')
                    ->label('Universitas')
                    ->wrapHeader()
                    ->extraAttributes(['style' => 'white-space: normal; word-wrap: break-word; width: 120px;']),
                    
                Tables\Columns\TextColumn::make('fakultas')
                    ->label('Fakultas')
                    ->extraAttributes(['style' => 'white-space: normal; word-wrap: break-word; width: 120px;']),

                Tables\Columns\TextColumn::make('alamat_KTP')
                    ->label('Alamat KTP')
                    ->extraAttributes(['style' => 'white-space: normal; word-wrap: break-word; width: 150px;']),

                Tables\Columns\TextColumn::make('alamat_domisili')
                    ->label('Alamat Domisili')
                    ->extraAttributes(['style' => 'white-space: normal; word-wrap: break-word; width: 150px;']),

                Tables\Columns\TextColumn::make('jurusan')
                    ->label('Jurusan')
                    ->extraAttributes(['style' => 'white-space: normal; word-wrap: break-word; width: 100px;']),

                Tables\Columns\TextColumn::make('IPK')
                    ->label('IPK')
                    ->extraAttributes(['style' => 'width: 60px;']),

                Tables\Columns\TextColumn::make('no_telepon')
                    ->label('No Telepon')
                    ->extraAttributes(['style' => 'width: 120px;']),

                Tables\Columns\TextColumn::make('semester')
                    ->label('Semester')
                    ->extraAttributes(['style' => 'width: 80px;']),

                Tables\Columns\ImageColumn::make('KTM')
                    ->label('KTM')
                    ->disk('public')
                    ->extraAttributes(['style' => 'width: 80px;']),

                Tables\Columns\ImageColumn::make('pas_foto')
                    ->label('Pas Foto')
                    ->disk('public')
                    ->extraAttributes(['style' => 'width: 80px;']),

                Tables\Columns\TextColumn::make('surat_permohonan')
                    ->label('Surat Permohonan')
                    ->formatStateUsing(fn ($state) => $state 
                        ? "<a href='".asset('storage/' . $state)."' target='_blank'>View</a> | <a href='".asset('storage/' . $state)."' download>Download</a>" 
                        : 'Tidak ada file')
                    ->html()
                    ->extraAttributes(['style' => 'white-space: normal; word-wrap: break-word; width: 150px;']),

                Tables\Columns\TextColumn::make('transkrip_nilai')
                    ->label('Transkrip Nilai')
                    ->formatStateUsing(fn ($state) => $state 
                        ? "<a href='".asset('storage/' . $state)."' target='_blank'>View</a> | <a href='".asset('storage/' . $state)."' download>Download</a>" 
                        : 'Tidak ada file')
                    ->html()
                    ->extraAttributes(['style' => 'white-space: normal; word-wrap: break-word; width: 150px;']),
            
            ])
            ->filters([/* Tambahkan filter jika diperlukan */])
            ->actions([
                ViewAction::make(),
                EditAction::make(),
               
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Infolists\Components\TextEntry::make('NIM')->label('NIM'),
                Infolists\Components\TextEntry::make('user.name')->label('Nama Mahasiswa'),
                Infolists\Components\TextEntry::make('tanggal_lahir')->label('Tanggal Lahir')->date(),
                Infolists\Components\TextEntry::make('jenis_kelamin')->label('Jenis Kelamin'),
                Infolists\Components\TextEntry::make('universitas')->label('Universitas'),
                Infolists\Components\TextEntry::make('fakultas')->label('Fakultas'),
                Infolists\Components\TextEntry::make('alamat_KTP')->label('Alamat KTP'),
                Infolists\Components\TextEntry::make('alamat_domisili')->label('Alamat Domisili'),
                Infolists\Components\TextEntry::make('jurusan')->label('Jurusan'),
                Infolists\Components\TextEntry::make('IPK')->label('IPK'),
                Infolists\Components\TextEntry::make('no_telepon')->label('No Telepon'),
                Infolists\Components\TextEntry::make('semester')->label('Semester'),
                Infolists\Components\ImageEntry::make('KTM')->label('KTM')->disk('public'),
                Infolists\Components\ImageEntry::make('pas_foto')->label('Pas Foto')->disk('public'),
                Infolists\Components\TextEntry::make('surat_permohonan')
                    ->label('Surat Permohonan')
                    ->formatStateUsing(fn ($state) => $state
                        ? "<a href='".asset('storage/' . $state)."' target='_blank' class='btn btn-primary' style='margin-right: 5px;'>View</a>
                           <a href='".asset('storage/' . $state)."' download class='btn btn-secondary'>Download</a>"
                        : 'Tidak ada file')
                    ->html(),
                Infolists\Components\TextEntry::make('transkrip_nilai')
                    ->label('Transkrip Nilai')
                    ->formatStateUsing(fn ($state) => $state
                        ? "<a href='".asset('storage/' . $state)."' target='_blank' class='btn btn-primary' style='margin-right: 5px;'>View</a>
                           <a href='".asset('storage/' . $state)."' download class='btn btn-secondary'>Download</a>"
                        : 'Tidak ada file')
                    ->html(),
                Infolists\Components\TextEntry::make('keterampilan')
                    ->label('Keterampilan')
                    ->formatStateUsing(fn ($record) =>
                        $record->keterampilan->isNotEmpty()
                            ? $record->keterampilan->map(fn ($keterampilan) => 
                                "{$keterampilan->nama_keterampilan} - Level {$keterampilan->level}"
                              )->join('<br>')
                            : 'Belum Input Keterampilan'
                    )
                    ->html(),
                Infolists\Components\TextEntry::make('pengalaman')
                    ->label('Pengalaman')
                    ->formatStateUsing(fn ($record) => 
                        $record->pengalaman->isNotEmpty()
                            ? $record->pengalaman->map(fn ($pengalaman) => 
                                "<strong>{$pengalaman->posisi}</strong> di {$pengalaman->instansi}<br>
                                {$pengalaman->tanggal_mulai} - {$pengalaman->tanggal_berakhir}<br>
                                {$pengalaman->deskripsi}"
                              )->join('<br><br>')
                            : 'Belum Input Pengalaman'
                    )
                    ->html(),
                    
            ]);
    }

    public static function getRelations(): array
    {
        return [
            // Tambahkan relasi lain jika ada
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMahasiswas::route('/'),
            'create' => Pages\CreateMahasiswa::route('/create'),
            'view' => Pages\ViewMahasiswa::route('/{record}'),
            'edit' => Pages\EditMahasiswa::route('/{record}/edit'),
        ];
    }
}
