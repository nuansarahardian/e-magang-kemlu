<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\EnsureUserIsAdmin; // Impor middleware admin

return Application::configure(basePath: dirname(__DIR__))

    // Rute
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )

    // Middleware
    ->withMiddleware(function (Middleware $middleware) {
        // Mendaftarkan middleware EnsureUserIsAdmin
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            EnsureUserIsAdmin::class, // Tambahkan EnsureUserIsAdmin
        ]);
    })

    // Penanganan pengecualian
    ->withExceptions(function (Exceptions $exceptions) {
        // Penanganan pengecualian jika ada
    })

    // Buat instance aplikasi
    ->create();
