import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faInstagram,
    faYoutube,
    faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-[#5E7ADD] to-[#384AA0] text-white py-10">
            <div className="container mx-auto px-8 md:px-12">
                {/* Flex container for left and right sections */}
                <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-12">
                    {/* Left Section: Logo and Text */}
                    <div className="flex-shrink-0 flex flex-col space-y-4 md:w-1/2 lg:w-1/3">
                        {/* Logo */}
                        <div className="mb-4">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/9/96/Seal_of_the_Ministry_of_Foreign_Affairs_of_the_Republic_of_Indonesia.svg"
                                alt="Logo"
                                className="h-16"
                            />
                        </div>
                        {/* Heading and Tagline */}
                        <div>
                            <span
                                className="font-bold text-2xl block"
                                style={{ fontWeight: 800 }}
                            >
                                E - Magang
                            </span>
                            <span
                                className="text-sm font-light leading-relaxed"
                                style={{ fontWeight: 600 }}
                            >
                                Sistem Pendaftaran Magang Badan Strategi
                                Kebijakan Luar Negeri, Kementerian Luar Negeri
                                Republik Indonesia
                            </span>
                        </div>
                    </div>

                    {/* Right Section: Address, Contact Information, and Social Media */}
                    <div className="flex flex-col space-y-6 md:w-1/2 lg:w-2/3">
                        {/* Address and Contact Information */}
                        <div className="space-y-2">
                            <p className="font-semibold">
                                Gedung Roeslan Abdulgani Kementerian Luar Negeri
                                RI.
                            </p>
                            <p>
                                Jl. Taman Pejambon No. 6, Senen, Jakarta Pusat,
                                DKI Jakarta, 10410
                            </p>
                            <p>
                                08.00 - 16.00 (Senin-Kamis) | 08.00 - 16.30
                                (Jum’at)
                            </p>
                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon icon={faPhone} />
                                <p>(021) 344 1508 | Hotline: 085 283 751 123</p>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="flex space-x-6 mt-4">
                            <a
                                href="https://www.facebook.com/p/BSKLNKemlu-100068774974595/"
                                aria-label="Facebook"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon
                                    icon={faFacebook}
                                    className="h-6 w-6 text-white hover:text-gray-300 transition duration-300"
                                />
                            </a>
                            <a
                                href="https://www.instagram.com/bskln_kemlu/?hl=en&g=5"
                                aria-label="Instagram"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    className="h-6 w-6 text-white hover:text-gray-300 transition duration-300"
                                />
                            </a>
                            <a
                                href="https://youtube.com"
                                aria-label="YouTube"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon
                                    icon={faYoutube}
                                    className="h-6 w-6 text-white hover:text-gray-300 transition duration-300"
                                />
                            </a>
                        </div>

                        {/* Credit Section */}
                        <div className="pt-6 border-t border-white mt-6">
                            <p className="text-sm font-bold">
                                © 2024 BSKLN & MSIB Batch 7. Hak cipta
                                dilindungi Undang-Undang.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
