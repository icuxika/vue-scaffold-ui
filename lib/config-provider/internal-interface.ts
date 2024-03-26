import { BannerTheme } from "../banner/themes";
import { Ref } from "vue";
import { GlobalTheme } from "./index";

export interface GlobalThemeWithoutCommon {
    Banner?: BannerTheme;
}

export interface ConfigProviderInjection {
    mergedThemeRef: Ref<GlobalTheme>;
}
