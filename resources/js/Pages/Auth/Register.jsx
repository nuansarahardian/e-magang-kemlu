import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // Import icons

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex">
                <div className="relative hidden lg:flex w-1/2">
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: "url(/images/2.jpeg)",
                            zIndex: 0,
                        }}
                    ></div>
                </div>

                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white">
                    <div className="max-w-md w-full space-y-8">
                        <h2 className="text-3xl font-bold text-gray-800 text-center !mb-2">
                            Buat Akun Baru
                        </h2>
                        <p className="text-sm font-medium !text-gray-500 !mt-4 text-center">
                            Gunakan alamat email aktif yang Anda miliki untuk
                            membuat akun. Email ini akan digunakan untuk
                            keperluan proses pendaftaran di platform e-magang.
                        </p>
                        <form onSubmit={submit} className="space-y-6">
                            {/* Name input */}
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    value="Nama Lengkap"
                                    className="mb-2 text-sm font-medium !text-gray-500"
                                />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full p-3 border !border-gray-300 rounded-md shadow-sm
                                    !focus:ring-blue-500 !focus:border-blue-500
                                    !bg-slate-100 !text-gray-900 !placeholder-gray-500 "
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2 text-red-500"
                                />
                            </div>

                            {/* Email input */}
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Alamat Email"
                                    className="mb-2 text-sm font-medium !text-gray-500"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full p-3 border !border-gray-300 rounded-md shadow-sm
                                    !focus:ring-blue-500 !focus:border-blue-500
                                    !bg-slate-100 !text-gray-900 !placeholder-gray-500 "
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2 text-red-500"
                                />
                            </div>

                            {/* Password input */}
                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Kata Sandi"
                                    className="mb-2 text-sm font-medium !text-gray-500"
                                />
                                <div className="relative">
                                    <TextInput
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full p-3 border !border-gray-300 rounded-md shadow-sm
                                        !focus:ring-blue-500 !focus:border-blue-500
                                        !bg-slate-100 !text-gray-900 !placeholder-gray-500 "
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-3 text-gray-500"
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                <InputError
                                    message={errors.password}
                                    className="mt-2 text-red-500"
                                />
                            </div>

                            {/* Password Confirmation */}
                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Konfirmasi Kata Sandi"
                                    className="mb-2 text-sm font-medium !text-gray-500"
                                />
                                <div className="relative">
                                    <TextInput
                                        id="password_confirmation"
                                        type={
                                            showPasswordConfirmation
                                                ? "text"
                                                : "password"
                                        }
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full p-3 border !border-gray-300 rounded-md shadow-sm
                                        !focus:ring-blue-500 !focus:border-blue-500
                                        !bg-slate-100 !text-gray-900 !placeholder-gray-500 "
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPasswordConfirmation(
                                                !showPasswordConfirmation
                                            )
                                        }
                                        className="absolute right-3 top-3 text-gray-500"
                                    >
                                        {showPasswordConfirmation ? (
                                            <EyeSlashIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2 text-red-500"
                                />
                            </div>

                            {/* Submit button */}
                            <div className="flex items-center justify-between">
                                <Link
                                    href={route("login")}
                                    className="text-sm text-indigo-600 hover:underline"
                                >
                                    Sudah punya akun? Masuk
                                </Link>

                                <PrimaryButton
                                    className="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
                                    disabled={processing}
                                >
                                    Daftar
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
