import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import typescript2 from "rollup-plugin-typescript2";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	// 读取对应mode下 .env 中的环境变量
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	if (mode === "preview") {
		// 库预览
		return {
			// dev 独有配置
			plugins: [vue()],
			resolve: {
				alias: {
					"@": path.resolve(__dirname, "./src"),
					"vue-scaffold-ui": path.resolve("lib"),
				},
			},
			build: {
				outDir: "docs",
			},
		};
	}
	if (command === "serve") {
		return {
			// dev 独有配置
			plugins: [vue()],
			resolve: {
				alias: {
					"@": path.resolve(__dirname, "./src"),
					"vue-scaffold-ui": path.resolve("lib"),
				},
			},
		};
	} else {
		// command === 'build'
		return {
			// build 独有配置
			plugins: [
				vue(),
				typescript2({
					check: false,
					tsconfigOverride: {
						compilerOptions: {
							sourceMap: true,
							declaration: true,
							declarationMap: true,
						},
						include: [
							"lib/**/*.ts",
							"lib/**/*.d.ts",
							"lib/**/*.tsx",
							"lib/**/*.vue",
						],
					},
				}),
			],
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
					external: ["vue"],
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
