import { createApp } from "vue";
import { App } from "./App";
import { router } from "./router";
import "@svgSprite";
import { createI18n } from "vue-i18n";
import messages from "@intlify/vite-plugin-vue-i18n/messages";

const i18n = createI18n({
	legacy: false,
	locale: "zh",
	messages,
});

const app = createApp(App);
app.use(router);
app.use(i18n);
app.mount("#app");
