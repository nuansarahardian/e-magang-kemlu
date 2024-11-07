import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import Header from "@/Components/Header"; // Import Header
import Footer from "@/Components/Footer"; // Import Footer
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // Import icons

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex">
                {/* Left container for image */}
                <div className="relative hidden lg:flex w-1/2">
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: "url(/images/2.jpeg)", // Replace with your image
                            zIndex: 0,
                        }}
                    ></div>
                </div>

                {/* Right container for form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white">
                    <div className="max-w-md w-full space-y-8">
                        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                            Reset Password
                        </h2>

                        <Head title="Reset Password" />

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full p-3 border !border-gray-300 rounded-md shadow-sm
                                    !focus:ring-blue-500 !focus:border-blue-500
                                    !bg-slate-100 !text-gray-900 !placeholder-gray-500"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password"
                                    value="Password"
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
                                        !bg-slate-100 !text-gray-900 !placeholder-gray-500"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <span
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5" />
                                        )}
                                    </span>
                                </div>
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
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
                                        !bg-slate-100 !text-gray-900 !placeholder-gray-500"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <span
                                        onClick={() =>
                                            setShowPasswordConfirmation(
                                                !showPasswordConfirmation
                                            )
                                        }
                                        className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                                    >
                                        {showPasswordConfirmation ? (
                                            <EyeSlashIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5" />
                                        )}
                                    </span>
                                </div>
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4 flex items-center justify-end">
                                <PrimaryButton
                                    className="ml-4"
                                    disabled={processing}
                                >
                                    Reset Password
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
