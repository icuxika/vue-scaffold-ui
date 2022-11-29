import { ExtractThemeVars } from "../_hooks/use-theme";

export { default as VConfigProvider } from "./ConfigProvider.vue";

import { GlobalThemeWithoutCommon } from "./internal-interface";
import { ThemeCommonVars } from "../_styles/common";

export interface GlobalTheme extends GlobalThemeWithoutCommon {
	name: string;
	common?: ThemeCommonVars;
}

export type GlobalThemeOverrides = {
	common?: Partial<ThemeCommonVars>;
} & {
	[key in keyof GlobalThemeWithoutCommon]?: ExtractThemeVars<
		GlobalThemeWithoutCommon[key]
	>;
};
