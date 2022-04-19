import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { Home } from "../views/Home";
import { Docs } from "../views/Docs";
import { BannerDemo } from "../views/demo/banner";
import { ButtonDemo } from "../views/demo/button";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		component: Home,
	},
	{
		path: "/docs",
		component: Docs,
		children: [
			{ path: "", redirect: "/docs/banner" },
			{
				path: "banner",
				component: BannerDemo,
			},
			{
				path: "button",
				component: ButtonDemo,
			},
		],
	},
];

export const router = createRouter({
	history: createWebHistory(import.meta.env.VITE_DOCS_SUB_PATH),
	routes: routes,
});
