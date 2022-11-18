import { CNode } from "css-render";

export const useTheme = (resolveId: string, mountId: string, style: CNode) => {
	style.mount();
};
