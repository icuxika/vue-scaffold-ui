import { CNode } from "css-render";
import { ThemeCommonVars } from "../_styles/common";
import { computed, inject, InjectionKey } from "vue";
import { merge } from "lodash-es";
import { ConfigProviderInjection } from "../config-provider/internal-interface";
import { GlobalTheme, key } from "../config-provider/interface";

export interface Theme<N, T = any, R = any> {
	name: N;
	common?: ThemeCommonVars;
	peers?: R;
	self?: (vars: ThemeCommonVars) => T;
}

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
