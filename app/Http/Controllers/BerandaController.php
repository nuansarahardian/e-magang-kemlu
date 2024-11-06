<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class BerandaController extends Controller
{
  public function index()
  {
    return inertia('Beranda', [
      'canLogin' => Route::has('login'),
      'canRegister' => Route::has('register'),
    ]);
  }
}
