/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_URL: string;
    readonly VITE_API_URL: string;
    readonly VITE_VAPID_KEY: string;
    readonly APP_VERSION: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}