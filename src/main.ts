import { createApp } from "vue";
import { App } from "@/App";
import { router } from "@/router";
import "@svgSprite";
import { createI18n } from "vue-i18n";
import messages from "@intlify/vite-plugin-vue-i18n/messages";

const i18n = createI18n({
	legacy: false,
	locale: "zh",
	messages,
});

import {
	create as createVUI,
	VBanner,
	VButton,
	VMarkdown,
	VVerification,
	VConfigProvider,
} from "@icuxika/vue-scaffold-ui";

const vueScaffoldUI = createVUI({
	components: [VBanner, VButton, VMarkdown, VVerification, VConfigProvider],
});

declare module "@vue/runtime-core" {
	export interface GlobalComponents {
		VBanner: typeof VBanner;
		VButton: typeof VButton;
		VConfigProvider: typeof VConfigProvider;
		VMarkdown: typeof VMarkdown;
		VVerification: typeof VVerification;
	}
}

const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(vueScaffoldUI);
router.isReady().then(() => {
	app.mount("#app");
});
