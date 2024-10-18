<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class EnsureUserIsAdmin
{
    public function handle($request, Closure $next)
    {
        // Cek apakah user sudah login dan memiliki role admin
        if (Auth::check() && Auth::user()->hasRole('admin')) {
            return $next($request);
        }
    
        // Jangan redirect ke /admin lagi jika user tidak punya role admin
        if ($request->is('admin*')) {
            return redirect('/')->with('error', 'Anda tidak memiliki akses ke halaman ini.');
        }
    
        return $next($request);
    }
    
}
