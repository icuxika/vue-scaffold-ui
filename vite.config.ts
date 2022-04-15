import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	// 读取对应mode下 .env 中的环境变量
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
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
			plugins: [vue()],
			build: {
				lib: {
					entry: path.resolve(__dirname, "lib/index.ts"),
					name: "vue-scaffold-ui",
					fileName: (format) => `vue-scaffold-ui.${format}.js`,
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
