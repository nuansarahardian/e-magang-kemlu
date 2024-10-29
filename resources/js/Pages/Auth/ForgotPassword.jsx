import React from "react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import Header from "@/Components/Header"; // Import Header
import Footer from "@/Components/Footer"; // Import Footer

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
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
                            backgroundImage: "url(/images/1.jpeg)", // Replace with your image path
                            zIndex: 0,
                        }}
                    ></div>
                </div>

                {/* Right container for form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white">
                    <div className="max-w-md w-full space-y-8">
                        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                            Lupa Password Anda?
                        </h2>

                        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                            Lupa kata sandi Anda? Tidak masalah. Beritahu kami
                            alamat email Anda, dan kami akan mengirimkan tautan
                            untuk mengatur ulang kata sandi agar Anda bisa
                            membuat yang baru.
                        </div>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

                            <div className="mt-4 flex items-center justify-end">
                                <PrimaryButton
                                    className="bg-[#5E7ADD] hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
                                    disabled={processing}
                                >
                                    Email Password Reset Link
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer /> {/* Render Footer */}
        </>
    );
}
