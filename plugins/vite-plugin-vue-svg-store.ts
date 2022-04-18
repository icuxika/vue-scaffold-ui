import { PluginOption } from "vite";

const svgBundleFileName = "svg_bundle.js";

// todo: SVG Sprite
export const svgStore = (): PluginOption => {
	return {
		name: "svgStore",
		resolveId(source: string) {
			if (source === "@svgStore") {
				return svgBundleFileName;
			}
		},
		load(id: string, options?: { ssr?: boolean }) {
			if (id === svgBundleFileName) {
				return "";
			}
		},
	};
};
