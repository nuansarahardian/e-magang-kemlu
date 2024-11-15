import "../css/app.css";
import "./bootstrap";
import "nprogress/nprogress.css";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
/>;
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "#FFB900", // Warna dari progress bar
        showSpinner: true, // Aktifkan spinner loader
        delay: 250, // Opsional: Waktu tunda sebelum loader muncul (dalam milidetik)
        includeCSS: true, // Sertakan CSS NProgress bawaan
    },
});
