declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

interface ImportMetaEnv {
    readonly VITE_ASSET_URL?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}