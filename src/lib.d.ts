import {
    VBanner,
    VButton,
    VMarkdown,
    VVerification,
    VConfigProvider,
} from "@icuxika/vue-scaffold-ui";

declare module "vue" {
    export interface GlobalComponents {
        VBanner: typeof VBanner;
        VButton: typeof VButton;
        VConfigProvider: typeof VConfigProvider;
        VMarkdown: typeof VMarkdown;
        VVerification: typeof VVerification;
    }
}

export {};
