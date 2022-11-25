import {
	ConfigProviderInjection,
	GlobalThemeWithoutCommon,
} from "./internal-interface";
import { ThemeCommonVars } from "../_styles/common";
import { InjectionKey } from "vue";

export interface GlobalTheme extends GlobalThemeWithoutCommon {
	name: string;
	common?: ThemeCommonVars;
}

export const key = Symbol() as InjectionKey<ConfigProviderInjection>;
