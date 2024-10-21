<x-filament-panels::page>
    @extends('filament::layouts.app')

    @section('content')
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-6">Pengaturan</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach ($pengaturans as $pengaturan)
                <div class="bg-white border rounded-lg shadow-md p-6">
                    <h2 class="text-xl font-bold mb-4">
                        Sistem Penerimaan: {{ ucfirst($pengaturan->sistem_penerimaan) }}
                    </h2>
                    <p class="text-sm text-gray-500 mb-2">
                        Dibuat Pada: {{ $pengaturan->created_at->format('d M Y H:i') }}
                    </p>
                    <p class="text-sm text-gray-500 mb-2">
                        Diperbarui Pada: {{ $pengaturan->updated_at->format('d M Y H:i') }}
                    </p>
                    <a href="{{ route('filament.resources.pengaturans.edit', $pengaturan) }}" class="text-blue-500 hover:underline">
                        Edit
                    </a>
                </div>
            @endforeach
        </div>
    </div>
    @endsection
    
</x-filament-panels::page>
