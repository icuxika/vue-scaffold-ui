import { GlobalTheme } from "../config-provider/interface";

export type BuiltInGlobalTheme = Omit<Required<GlobalTheme>, "I">;
