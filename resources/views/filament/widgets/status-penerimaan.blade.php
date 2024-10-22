<x-filament-widgets::widget>
    <x-filament::section>
        <div class="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
                <h2 class="text-xl font-bold">Status Penerimaan</h2>
                <p class="text-lg mt-2">
                    {{ $statusPenerimaan === 'Otomatis' ? 'Penerimaan Otomatis Aktif' : 'Penerimaan Manual Aktif' }}
                </p>
            </div>
            <a href="{{ $pengaturanUrl }}" class="text-blue-500 hover:text-blue-700">
                <button class="flex items-center bg-blue-500 text-white px-3 py-2 rounded-lg shadow hover:bg-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Pengaturan
                </button>
            </a>
        </div>
        
        
        
    </x-filament::section>
</x-filament-widgets::widget>
