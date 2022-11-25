import { BuiltInGlobalTheme } from "./interface";
import { commonDark } from "../_styles/common";
import { bannerDark } from "../banner/themes";

export const darkTheme: BuiltInGlobalTheme = {
	name: "dark",
	common: commonDark,
	Banner: bannerDark,
};
