import { BannerTheme } from "../banner/themes";
import { Ref } from "vue";
import { GlobalTheme } from "./interface";

export interface GlobalThemeWithoutCommon {
	Banner?: BannerTheme;
}

export interface ConfigProviderInjection {
	mergedThemeRef: Ref<GlobalTheme>;
}
