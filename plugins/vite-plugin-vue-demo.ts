import { PluginOption } from "vite";
import * as fs from "fs";
import {
    baseParse,
    BaseElementNode,
    CompoundExpressionNode,
    SimpleExpressionNode,
    TemplateChildNode,
} from "@vue/compiler-core";

export const demo = (): PluginOption => {
    return {
        name: "demo",
        transform(code: string, id: string) {
            if (/vue&type=demo/.test(id)) {
                const file = fs.readFileSync(id.split("?")[0]).toString();
                const parsed: TemplateChildNode | undefined = baseParse(
                    file
                ).children.find((n) => (n as BaseElementNode).tag === "demo");
                const title = (
                    (parsed as CompoundExpressionNode)
                        .children[0] as SimpleExpressionNode
                ).content;
                const main = file
                    .split((parsed as BaseElementNode).loc.source)
                    .join("")
                    .trim();
                return `
				export default Component => {
                	Component.__sourceCode = ${JSON.stringify(main)};
                	Component.__sourceCodeTitle = ${JSON.stringify(title)};
            	}
            	`.trim();
            }
        },
    };
};
