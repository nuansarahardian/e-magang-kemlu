<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Batch;
use Carbon\Carbon;

class BerandaController extends Controller
{
    public function index()
    {
        // Retrieve only the 2 most recent Batch records based on `tanggal_pendaftaran`
        $batches = Batch::orderBy('tanggal_pendaftaran', 'desc')->take(6)->get();

        // Format the dates using Carbon
        $batches->transform(function ($batch) {
            $batch->tanggal_pendaftaran = Carbon::parse($batch->tanggal_pendaftaran)->translatedFormat('d F Y');
            $batch->tanggal_mulai = Carbon::parse($batch->tanggal_mulai)->translatedFormat('d F Y');
            $batch->tanggal_berakhir = Carbon::parse($batch->tanggal_berakhir)->translatedFormat('d F Y');
            return $batch;
        });

        $batches = $batches->reverse()->values()->toArray();

        return inertia('Beranda', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'batches' => $batches,
        ]);
    }
}
