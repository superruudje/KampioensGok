import 'vue-i18n'

declare module 'vue-i18n' {
    export interface I18nGlobal {
        // Allow global type-safe access if needed
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $t: (key: string, ...args: any[]) => string
        $tc: (key: string, choice?: number, ...args: any[]) => string
    }
}

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