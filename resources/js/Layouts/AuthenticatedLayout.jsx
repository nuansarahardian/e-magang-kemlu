import React from "react";
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, usePage } from "@inertiajs/react";
import Swal from "sweetalert2"; // Import SweetAlert2
import "sweetalert2/dist/sweetalert2.min.css";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Mendapatkan informasi user dari props Inertia.js
    const { auth } = usePage().props;
    const handlePosisiMagangClick = (e) => {
        // Periksa apakah pengguna sudah login dan apakah NIM sudah terisi di profil_mahasiswa
        if (
            auth.user &&
            (!auth.user.profil_mahasiswa || !auth.user.profil_mahasiswa.NIM)
        ) {
            e.preventDefault();
            setTimeout(() => {
                Swal.fire({
                    title: "Anda belum mengisi data diri!",
                    text: "Silakan isi NIM terlebih dahulu untuk melihat Posisi Magang.",
                    icon: "warning",
                    confirmButtonText: "Isi Data Diri",
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "/dashboard"; // Sesuaikan URL ke halaman pengisian data diri
                    }
                });
            }, 100); // Sesuaikan waktu jika diperlukan
        }
    };

    return (
        <header className="bg-gradient-to-r from-[#5E7ADD] to-[#384AA0] text-white sticky top-0 z-50">
            <nav aria-label="Global" className="mx-auto max-w-7xl p-4 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo dengan tautan ke Beranda */}
                    <Link href="/" className="flex items-center space-x-2">
                        <img
                            alt="Logo"
                            src="https://upload.wikimedia.org/wikipedia/commons/9/96/Seal_of_the_Ministry_of_Foreign_Affairs_of_the_Republic_of_Indonesia.svg"
                            className="h-8 lg:h-10"
                        />
                        <span className="font-bold text-base lg:text-xl">
                            E - Magang
                        </span>
                    </Link>

                    {/* Menu Items */}
                    <div className="hidden lg:flex lg:gap-x-8 items-center justify-center flex-grow">
                        <Link
                            href="/"
                            className="text-sm lg:text-base font-semibold leading-6 text-white hover:text-gray-300"
                        >
                            Beranda
                        </Link>
                        <Link
                            href="/posisi-magang"
                            onClick={handlePosisiMagangClick} // Panggil handle klik di sini
                            className="text-sm lg:text-base font-semibold leading-6 text-white hover:text-gray-300"
                        >
                            Posisi Magang
                        </Link>
                        <Link
                            href="/sering-ditanyakan"
                            className="text-sm lg:text-base font-semibold leading-6 text-white hover:text-gray-300"
                        >
                            Sering Ditanyakan
                        </Link>
                    </div>

                    {/* Buttons atau User Info */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {auth.user ? (
                            // Jika sudah login, tampilkan "Halo, Nama User" yang dapat diklik menuju Dashboard
                            <div className="flex items-center space-x-2">
                                <Link
                                    href={route("dashboard")}
                                    className="bg-white text-[#162360] px-4 py-2 rounded font-semibold hover:bg-gray-100"
                                >
                                    Halo, {auth.user.name}
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="bg-[#162360] text-white px-4 py-2 rounded hover:bg-blue-800 font-semibold text-base"
                                >
                                    Logout
                                </Link>
                            </div>
                        ) : (
                            // Jika belum login, tampilkan tombol Registrasi dan Login
                            <>
                                <Link
                                    href="/register"
                                    className="bg-[#162360] text-white px-4 py-2 rounded hover:bg-blue-800 font-semibold text-base"
                                >
                                    Buat Akun
                                </Link>
                                <Link
                                    href="/login"
                                    className="bg-white text-[#162360] px-4 py-2 rounded hover:bg-gray-100 font-semibold text-base"
                                >
                                    Masuk
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Hamburger Icon for mobile */}
                    <div className="lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                        >
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <Dialog
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
                className="lg:hidden"
            >
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full sm:max-w-sm overflow-y-auto bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <img
                                alt="Logo"
                                src="https://upload.wikimedia.org/wikipedia/commons/9/96/Seal_of_the_Ministry_of_Foreign_Affairs_of_the_Republic_of_Indonesia.svg"
                                className="h-8 w-auto"
                            />
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link
                                    href="/"
                                    className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Beranda
                                </Link>
                                <Link
                                    href="/posisi-magang"
                                    onClick={handlePosisiMagangClick} // Terapkan handle klik di sini juga
                                    className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Posisi Magang
                                </Link>
                                <Link
                                    href="/sering-ditanyakan"
                                    className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Sering Ditanyakan
                                </Link>
                            </div>
                            <div className="py-6">
                                {auth.user ? (
                                    <div className="space-y-2">
                                        <Link
                                            href={route("dashboard")}
                                            className="block text-center font-semibold text-gray-900"
                                        >
                                            Halo, {auth.user.name}
                                        </Link>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="block w-full text-center bg-[#162360] text-white px-4 py-2 rounded hover:bg-blue-800 font-semibold text-base"
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                ) : (
                                    <>
                                        <Link
                                            href="/register"
                                            className="block w-full text-center bg-[#162360] text-white px-4 py-2 rounded hover:bg-blue-800 font-semibold text-base"
                                        >
                                            Buat Akun
                                        </Link>
                                        <Link
                                            href="/login"
                                            className="block w-full mt-2 text-center bg-white text-[#162360] px-4 py-2 rounded hover:bg-gray-100 font-semibold text-base"
                                        >
                                            Masuk
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}
