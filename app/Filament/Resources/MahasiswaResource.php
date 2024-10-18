<?php
namespace App\Filament\Resources;

use App\Models\ProfilMahasiswa;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Illuminate\Support\Facades\Hash;

class MahasiswaResource extends Resource
{
    protected static ?string $model = ProfilMahasiswa::class;

    protected static ?string $navigationIcon = 'heroicon-o-academic-cap';
    protected static ?string $navigationLabel = 'Mahasiswa';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('NIM')
                    ->required()
                    ->maxLength(50),
                TextInput::make('user_name')
                    ->label('Nama Pengguna')
                    ->required()
                    ->afterStateUpdated(function ($state, $set, $get) {
                        $user = User::firstOrCreate(
                            ['email' => $get('user_email') ?? $state . '@example.com'],
                            [
                                'name' => $state,
                                'password' => $get('user_password') ? Hash::make($get('user_password')) : Hash::make('defaultpassword')
                            ]
                        );
                        $set('user_id', $user->id);
                    })
                    ->afterStateHydrated(function ($state, $set, $record) {
                        if ($record && $record->user) {
                            $set('user_name', $record->user->name);
                            $set('user_email', $record->user->email);
                            $set('user_id', $record->user->id);
                        }
                    }),
                TextInput::make('user_email')
                    ->label('Email Pengguna')
                    ->required(),
                TextInput::make('user_password')
                    ->label('Password Pengguna')
                    ->password()
                    ->required(),
                TextInput::make('user_id')
                    ->hidden()
                    ->required(),
                DatePicker::make('tanggal_lahir')
                    ->required(),
                Select::make('jenis_kelamin')
                    ->options([
                        'Laki-laki' => 'Laki-laki',
                        'Perempuan' => 'Perempuan',
                    ])
                    ->required(),
                TextInput::make('universitas')
                    ->required()
                    ->maxLength(255),
                TextInput::make('fakultas')
                    ->required()
                    ->maxLength(255),
                TextInput::make('jurusan')
                    ->required()
                    ->maxLength(255),
                TextInput::make('IPK')
                    ->numeric()
                    ->required(),
                TextInput::make('no_telepon')
                    ->label('No Telepon')
                    ->required()
                    ->maxLength(15),
                TextInput::make('semester')
                    ->label('Semester')
                    ->numeric()
                    ->required(),
                TextInput::make('KTM')
                    ->label('Kartu Tanda Mahasiswa')
                    ->required()
                    ->maxLength(255),
                TextInput::make('pas_foto')
                    ->label('Pas Foto')
                    ->required()
                    ->maxLength(255),
                TextInput::make('surat_permohonan')
                    ->label('Surat Permohonan')
                    ->required()
                    ->maxLength(255),
                TextInput::make('transkrip_nilai')
                    ->label('Transkrip Nilai')
                    ->required()
                    ->maxLength(255),
                TextInput::make('status_data')
                    ->label('Status Data')
                    ->required()
                    ->maxLength(50),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('NIM')->label('NIM')->sortable()->searchable(),
                TextColumn::make('user.name')
                    ->label('Nama Pengguna')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('tanggal_lahir')
                    ->label('Tanggal Lahir')
                    ->dateTime('d/m/Y') // Format tanggal
                    ->sortable(),
                TextColumn::make('jenis_kelamin')->label('Jenis Kelamin')->sortable(),
                TextColumn::make('universitas')->label('Universitas')->sortable(),
                TextColumn::make('fakultas')->label('Fakultas')->sortable(),
                TextColumn::make('jurusan')->label('Jurusan')->sortable(),
                TextColumn::make('IPK')->label('IPK')->sortable(),
                TextColumn::make('no_telepon')->label('No Telepon')->sortable(),
                TextColumn::make('semester')->label('Semester')->sortable(),
                TextColumn::make('KTM')->label('Kartu Tanda Mahasiswa')->sortable(),
                TextColumn::make('pas_foto')->label('Pas Foto')->sortable(),
                TextColumn::make('surat_permohonan')->label('Surat Permohonan')->sortable(),
                TextColumn::make('transkrip_nilai')->label('Transkrip Nilai')->sortable(),
                TextColumn::make('status_data')->label('Status Data')->sortable(),
            ])
            ->filters([
                // Anda bisa menambahkan filter di sini jika diperlukan
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => MahasiswaResource\Pages\ListMahasiswas::route('/'),
            'create' => MahasiswaResource\Pages\CreateMahasiswa::route('/create'),
            'edit' => MahasiswaResource\Pages\EditMahasiswa::route('/{record}/edit'),
        ];
    }
}
