import { defineConfig, loadEnv, PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import * as path from "path";
import { svgSprite } from "./plugins/vite-plugin-vue-svg-sprite";
import { demo } from "./plugins/vite-plugin-vue-demo";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import * as fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    // 读取对应mode下 .env 中的环境变量
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    const commonPlugins: PluginOption[] = [
        vue(),
        vueJsx(),
        svgSprite(),
        demo(),
        vueI18n({
            include: path.resolve(__dirname, "./locales/**"),
            compositionOnly: true,
        }),
    ];

    const commonAlias = {
        "@": path.resolve(__dirname, "./src"),
        "@icuxika/vue-scaffold-ui": path.resolve("lib"),
    };

    if (mode === "preview" || mode === "docs") {
        // build:preview | build:docs | preview
        return {
            base: "./",
            plugins: commonPlugins,
            resolve: {
                alias: commonAlias,
            },
            build: {
                outDir: "docs",
            },
        };
    }
    if (command === "serve") {
        // dev
        return {
            plugins: commonPlugins,
            resolve: {
                alias: commonAlias,
            },
        };
    } else {
        // generate volar.d.ts
        const components = fs.readFileSync("./lib/components.ts", "utf-8");
        const lines = [];
        Array.from(components.matchAll(/export \* from ".\/(.*)";/g)).forEach(
            (match) => {
                const componentDir = match[1];
                const componentIndex = fs.readFileSync(
                    "./lib/" + componentDir + "/index.ts",
                    "utf-8"
                );
                Array.from(
                    componentIndex.matchAll(
                        /export { default as V(.*) } from ".\/(.*)\.vue";/g
                    )
                ).forEach((componentMatch) => {
                    const component = componentMatch[1];
                    const key = `V${component}`;
                    const entry = `${key}: typeof import('@icuxika/vue-scaffold-ui')['${key}'];`;
                    lines.push(entry);
                });
            }
        );
        const volarDTS = `
declare module "vue" {
    export interface GlobalComponents {
        ${lines.join("\n        ")}
    }
}
export {}
`;
        fs.writeFileSync(
            path.resolve(process.cwd(), "volar.d.ts"),
            volarDTS,
            "utf-8"
        );

        // build
        return {
            plugins: [vue(), vueJsx()],
            build: {
                cssCodeSplit: false,
                lib: {
                    entry: path.resolve(__dirname, "lib/index.ts"),
                    formats: ["es", "cjs"],
                    name: "@icuxika/vue-scaffold-ui",
                    fileName: (format) =>
                        format === "es" ? "index.js" : "index.cjs",
                },
                rollupOptions: {
                    // 确保外部化处理那些你不想打包进库的依赖
                    external: [
                        "vue",
                        ...Object.keys(
                            JSON.parse(fs.readFileSync("package.json", "utf8"))
                                .dependencies
                        ),
                    ],
                    output: {
                        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                        globals: {
                            vue: "Vue",
                        },
                    },
                },
            },
        };
    }
});
