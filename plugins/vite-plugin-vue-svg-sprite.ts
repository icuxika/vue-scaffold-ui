import { PluginOption } from "vite";
import * as path from "path";
import * as fs from "fs";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import svgStore from "svgstore";
import { optimize, OptimizedError, OptimizedSvg } from "svgo";

// main.ts > import "@svgSprite";
const IMPORT_SOURCE_NAME = "@svgSprite";
const SVG_BUNDLE_FILE_NAME = "svg_bundle.js";
const ASSETS_ICONS_FOLDER = "src/assets/icons";

export const svgSprite = (
	svgStoreOptions = {
		cleanDefs: false,
		cleanSymbols: false,
		inline: false,
		svgAttrs: false,
		symbolAttrs: false,
		copyAttrs: false,
		renameDefs: false,
	}
): PluginOption => {
	return {
		name: "svgSprite",
		resolveId(source: string) {
			if (source === IMPORT_SOURCE_NAME) {
				return SVG_BUNDLE_FILE_NAME;
			}
		},
		load(id: string) {
			if (id === SVG_BUNDLE_FILE_NAME) {
				const sprites = svgStore(svgStoreOptions);
				const iconsFolder = path.resolve(ASSETS_ICONS_FOLDER);
				for (const file of fs.readdirSync(iconsFolder)) {
					const filePath = path.join(iconsFolder, file);
					const svgId = path.parse(file).name;
					const code = fs.readFileSync(filePath, {
						encoding: "utf8",
					});
					sprites.add(svgId, code);
				}
				const optimizedSvg: OptimizedSvg | OptimizedError = optimize(
					sprites.toString(),
					{
						plugins: [
							"cleanupAttrs",
							"removeDoctype",
							"removeComments",
							"removeTitle",
							"removeDesc",
							"removeEmptyAttrs",
							{
								name: "removeAttrs",
								params: { attrs: "(data-name|data-xxx)" },
							},
						],
					}
				);
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				const data: string = optimizedSvg.data;
				return `
	const div = document.createElement("div");
	div.innerHTML = \`${data}\`;
	const svg = div.getElementsByTagName("svg")[0];
	if (svg) {
		svg.style.position = "absolute";
		svg.style.width = "0";
		svg.style.height = "0";
		svg.style.overflow = "hidden";
		svg.setAttribute("aria-hidden", "true");
	}
	// listen dom ready event
	document.addEventListener("DOMContentLoaded", () => {
		if (document.body.firstChild) {
			document.body.insertBefore(div, document.body.firstChild);
		} else {
			document.body.appendChild(div);
		}
	});
				`;
			}
		},
	};
};
