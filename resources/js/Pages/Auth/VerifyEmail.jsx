import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm } from "@inertiajs/react";

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };

    return (
        <div
            className="min-h-screen flex bg-cover bg-center"
            style={{ backgroundImage: "url(/images/2.jpeg)" }} // Ensure the image path is correct
        >
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-white bg-opacity-90 shadow-lg rounded-lg">
                <div className="max-w-md w-full space-y-8">
                    <Head title="Verifikasi Email" />

                    <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
                        Verifikasi Email
                    </h2>

                    <div className="mb-4 text-sm text-gray-600">
                        Terima kasih telah membuat akun! Sebelum memulai,
                        bisakah Anda memverifikasi alamat email Anda dengan
                        mengklik tautan yang baru saja kami kirimkan ke email
                        yang anda masukkan? <br /> <br /> Jika Anda tidak
                        menerima email tersebut, silahkan klik tombol dibawah
                        ini untuk mendapatkan email baru. <br /> <br />
                    </div>

                    {status === "verification-link-sent" && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            Tautan verifikasi baru telah dikirim ke alamat email
                            yang Anda berikan saat pendaftaran.
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="mt-4 flex items-center justify-center">
                            <PrimaryButton
                                disabled={processing}
                                className="!flex !justify-center !w-full !bg-[#1E3A8A] hover:!bg-[#1E40AF] !text-white !py-2 !rounded-md !text-center"
                            >
                                Kirim Ulang Email Verifikasi
                            </PrimaryButton>
                        </div>
                        <div className="text-center mt-4">
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Keluar
                            </Link>
                        </div>

                        <p className="mb-4 text-sm text-yellow-600 bg-yellow-100/50 rounded-xl p-4 border border-1 border-yellow-400">
                            Gunakan web browser yang sama untuk membuka web{" "}
                            <b> e-magang</b> dengan Gmail anda untuk login
                            otomatis, atau silahkan login kembali melalui tautan
                            verifikasi yang dikirimkan ke email anda.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
