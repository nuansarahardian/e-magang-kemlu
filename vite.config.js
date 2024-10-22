import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

// Define refreshPaths with the directories you want to watch
const refreshPaths = ["resources/views/**", "routes/**", "app/Livewire/**"];

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: [...refreshPaths],  // Using the defined refreshPaths
        }),
        react(),
    ],
});
