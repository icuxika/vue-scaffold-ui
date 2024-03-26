import { BuiltInGlobalTheme } from "./interface";
import { commonLight } from "../_styles/common";
import { bannerLight } from "../banner/themes";

export const lightTheme: BuiltInGlobalTheme = {
    name: "light",
    common: commonLight,
    Banner: bannerLight,
};
