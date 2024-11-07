<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    // Menampilkan halaman pengaturan akun
    public function showAccountSettings()
    {
        // Mengambil data user yang sedang login
        $user = Auth::user();
        return response()->json([
            'user' => $user
        ]);
    }

    // Menangani permintaan untuk memperbarui akun
    public function updateAccountSettings(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'email' => 'required|email|unique:users,email,' . Auth::id(),
            'password' => 'required|min:6|confirmed', // memastikan password dan konfirmasi password cocok
        ]);

        try {
            $user = Auth::user();

            // Memperbarui data user
            $user->email = $validated['email'];
            if ($validated['password']) {
                $user->password = Hash::make($validated['password']);
            }

            $user->save();

            return response()->json([
                'message' => 'Akun berhasil diperbarui!',
                'user' => $user
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Terjadi kesalahan saat memperbarui akun.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
