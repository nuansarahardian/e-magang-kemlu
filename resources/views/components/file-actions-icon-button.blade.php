<div class="flex space-x-2">
    <x-filament::icon-button
        {{-- icon="heroicon-s-eye" --}}
        href="{{ $viewUrl }}"
        target="_blank"
        label="View"
        class="text-white bg-blue-500"
    />

    <x-filament::icon-button
        {{-- icon="heroicon-s-download" --}}
        href="{{ $downloadUrl }}"
        download
        label="Download"
        class="text-white bg-green-500"
    />
</div>
