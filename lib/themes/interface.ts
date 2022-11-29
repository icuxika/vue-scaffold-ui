import { GlobalTheme } from "../config-provider";

export type BuiltInGlobalTheme = Omit<Required<GlobalTheme>, "I">;
