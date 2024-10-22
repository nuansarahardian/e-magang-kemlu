import { Head } from '@inertiajs/react';
import Footer from '@/Components/Footer';  // Import komponen Footer
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HeroSection from '@/Components/HeroSection';  // Import komponen HeroSection
import KriteriaPeserta from '@/Components/KriteriaPeserta';  // Import komponen KriteriaPeserta
import Benefit from '@/Components/Benefit';  // Import komponen KriteriaPeserta
import BSKLInformation from "@/Components/BSKLInformation";
import GallerySection from '@/Components/GallerySection';  // Import komponen GallerySection
import TabelTimeline from '@/Components/TabelTimeline';  // Import komponen TabelTimeline

export default function Beranda() {
    return (
        <>
            <Head title="E Magang BSKLN" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <AuthenticatedLayout />  {/*menampilkan AuthenticatedLayout */}
                <HeroSection />  {/*menampilkan Hero Section */}
                <KriteriaPeserta />  {/*menampilkan KriteriaPesera */}
                <Benefit />  {/*menampilkan Benefit */}
                <BSKLInformation />  {/*menampilkan BSKLNInformation */}
                <TabelTimeline />  {/*menampilkan TabelTimeline */}
                <GallerySection />  {/*menampilkan GallerySection */}
                <Footer />  {/*menampilkan Footer */}
            </div>
        </>
    );
}