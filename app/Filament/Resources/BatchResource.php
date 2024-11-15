<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BatchResource\Pages;
use App\Filament\Resources\BatchResource\RelationManagers;
use App\Models\Batch;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Models\PendaftaranMagang;
use Filament\Tables\Actions\BulkAction;
use Carbon\Carbon;

class BatchResource extends Resource
{
    protected static ?string $model = Batch::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar-date-range';
    
    public static function getNavigationLabel(): string
    {
        return 'Periode Magang';
    }

    public static function getPluralModelLabel(): string
    {
        return 'Periode Magang';
    }

    public static function form(Form $form): Form
    {
        return $form
        ->schema([
            Forms\Components\TextInput::make('nama_batch')
                ->label('Nama Batch')
                ->required()
                ->maxLength(255),
            Forms\Components\DatePicker::make('tanggal_pendaftaran')
                ->label('Tanggal Pendaftaran')
                ->required()
              
                     ->native(false)
    ->displayFormat('d/m/Y')
                ->locale('id'), // Set locale to Indonesian
            Forms\Components\DatePicker::make('tanggal_mulai')
                ->label('Tanggal Mulai')
                ->required()
              
                     ->native(false)
    ->displayFormat('d/m/Y')
                ->locale('id'),
            Forms\Components\DatePicker::make('tanggal_berakhir')
                ->label('Tanggal Berakhir')
                ->required()
              
                     ->native(false)
    ->displayFormat('d/m/Y')
                ->locale('id'),
            Forms\Components\Toggle::make('is_open')
                ->label('Dibuka')
                ->required(),
            Forms\Components\Toggle::make('is_active')
                ->label('Aktif')
                ->required()
                ->reactive()
                ->afterStateUpdated(function ($state, $set, $record) {
                    if ($record && $state) {
                        PendaftaranMagang::where('posisi_magang_per_batch_id', $record->id)
                            ->update(['status' => 'aktif']);
                    }
                }),
        ]);
    
    }
    

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('nama_batch')
                    ->label('Nama Batch')
                    ->searchable(),
                Tables\Columns\TextColumn::make('tanggal_mulai')
                    ->label('Tanggal Mulai')
                 ->formatStateUsing(fn ($state) => Carbon::parse($state)->translatedFormat('d F Y'))
                    ->sortable(),
                Tables\Columns\TextColumn::make('tanggal_berakhir')
                    ->label('Tanggal Berakhir')
                 ->formatStateUsing(fn ($state) => Carbon::parse($state)->translatedFormat('d F Y'))
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_open')
                    ->label('Pendaftaran Dibuka')
                    ->boolean(),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean(),
                Tables\Columns\TextColumn::make('tanggal_pendaftaran')
                    ->label('Tanggal Pendaftaran')
                 ->formatStateUsing(fn ($state) => Carbon::parse($state)->translatedFormat('d F Y'))
                    ->sortable(),
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
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
    
                // Bulk Action to Set is_open to True
                BulkAction::make('Set Pendaftaran Dibuka')
                    ->action(function ($records) {
                        $batches = Batch::whereIn('id', $records->pluck('id')->toArray())->get();
    
                        foreach ($batches as $batch) {
                            $batch->update(['is_open' => true]);
                        }
                    })
                    ->requiresConfirmation()
                    ->color('success')
                    ->label('Set Pendaftaran Dibuka'),
    
                // Bulk Action to Set is_open to False
                BulkAction::make('Set Pendaftaran Ditutup')
                    ->action(function ($records) {
                        $batches = Batch::whereIn('id', $records->pluck('id')->toArray())->get();
    
                        foreach ($batches as $batch) {
                            $batch->update(['is_open' => false]);
                        }
                    })
                    ->requiresConfirmation()
                    ->color('danger')
                    ->label('Set Pendaftaran Ditutup'),
    
                    BulkAction::make('Set Aktif')
                    ->action(function ($records) {
                        $batches = Batch::whereIn('id', $records->pluck('id')->toArray())->get();
                
                        foreach ($batches as $batch) {
                            // Check the current status and set is_active accordingly
                            if ($batch->is_active) {
                                $batch->update(['is_active' => false]);
                                // Update related records in PendaftaranMagang to 'diterima' if is_active is false
                                PendaftaranMagang::where('posisi_magang_per_batch_id', $batch->id)
                                    ->update(['status' => 'diterima']);
                            } else {
                                $batch->update(['is_active' => true]);
                                // Update related records in PendaftaranMagang to 'aktif' if is_active is true
                                PendaftaranMagang::where('posisi_magang_per_batch_id', $batch->id)
                                    ->update(['status' => 'aktif']);
                            }
                        }
                    })
                    ->requiresConfirmation()
                    ->color('primary')
                    ->label('Set Aktif'),
                
    
                // Bulk Action to Set is_active to False
                BulkAction::make('Set Tidak Aktif')
                    ->action(function ($records) {
                        $batches = Batch::whereIn('id', $records->pluck('id')->toArray())->get();
    
                        foreach ($batches as $batch) {
                            $batch->update(['is_active' => false]);
                        }
                    })
                    ->requiresConfirmation()
                    ->color('danger')
                    ->label('Set Tidak Aktif'),
        
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
            'index' => Pages\ListBatches::route('/'),
            'create' => Pages\CreateBatch::route('/create'),
            'edit' => Pages\EditBatch::route('/{record}/edit'),
        ];
    }
}
