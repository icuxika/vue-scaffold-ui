import { CssRender, CNode, CProperties } from "css-render";
import { plugin as BemPlugin } from "@css-render/plugin-bem";

const namespace = "s";
const prefix = `.${namespace}-`;
const elementPrefix = "__";
const modifierPrefix = "--";

const cssRender = CssRender();
const plugin = BemPlugin({
	blockPrefix: prefix,
	elementPrefix,
	modifierPrefix,
});
cssRender.use(plugin);
const { c, find } = cssRender;
const { cB, cE, cM, cNotM } = plugin;

export { c, find, cB, cE, cM, cNotM };
