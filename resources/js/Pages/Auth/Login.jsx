import React from "react";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Header from "@/Components/Header"; // Import Header
import Footer from "@/Components/Footer"; // Import Footer

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Header /> {/* Render Header */}
            <div className="min-h-screen flex">
                {/* Left container for image */}
                <div className="relative hidden lg:flex w-1/2">
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: "url(/images/3.jpeg)", // Replace with your image
                            zIndex: 0,
                        }}
                    ></div>
                </div>

                {/* Right container for form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white">
                    <div className="max-w-md w-full space-y-8">
                        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                            Log in
                        </h2>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel
                                    htmlFor="email"
                                    value="Email"
                                    className="mb-2 text-sm font-medium text-gray-700"
                                />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2 text-red-500"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
                                    className="mb-2 text-sm font-medium text-gray-700"
                                />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2 text-red-500"
                                />
                            </div>

                            <div className="mt-4 block">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        Ingat Saya
                                    </span>
                                </label>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="text-sm text-indigo-600 hover:underline"
                                    >
                                        Lupa Password Anda?
                                    </Link>
                                )}

                                <PrimaryButton
                                    className="ml-4 bg-[#5E7ADD] hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
                                    disabled={processing}
                                >
                                    Log in
                                </PrimaryButton>
                            </div>
                        </form>

                        {/* Link to Register Page */}
                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600">
                                Belum punya akun?{" "}
                                <Link
                                    href={route("register")}
                                    className="text-indigo-600 hover:underline"
                                >
                                    Daftar Sekarang
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer /> {/* Render Footer */}
        </>
    );
}
