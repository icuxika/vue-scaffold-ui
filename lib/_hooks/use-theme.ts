/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CNode } from "css-render";
import { ThemeCommonVars } from "../_styles/common";
import { computed, inject } from "vue";
import { merge } from "lodash-es";
import { GlobalTheme } from "../config-provider";
import { key } from "../config-provider/context";

export interface Theme<N, T = {}, R = any> {
    name: N;
    common?: ThemeCommonVars;
    peers?: R;
    self?: (vars: ThemeCommonVars) => T;
}

export type ExtractThemeVars<T> = T extends Theme<unknown, infer U, unknown>
    ? unknown extends U // self is undefined, ThemeVars is unknown
        ? {}
        : U
    : {};

export const useTheme = <N, T, R>(
    resolveId: Exclude<keyof GlobalTheme, "common" | "name">,
    mountId: string,
    style: CNode,
    defaultTheme: Theme<N, T, R>
) => {
    const ConfigProvider = inject(key);
    style.mount();
    return computed(() => {
        const {
            common: globalCommon = undefined,
            [resolveId]: {
                common: globalSelfCommon = undefined,
                self: globalSelf = undefined,
                peers: globalPeers = {},
            } = {},
        } = ConfigProvider?.mergedThemeRef.value || {};
        const mergedCommon = merge(
            {},
            globalSelfCommon || globalCommon || defaultTheme.common
        );
        const mergedSelf = merge(
            (globalSelf || defaultTheme.self)?.(mergedCommon) as T
        );
        return {
            self: mergedSelf,
        };
    });
};
