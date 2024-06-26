import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { Home } from "@/views/Home";
import { Docs } from "@/views/Docs";
import { BannerDemo } from "@/views/demo/banner";
import { ButtonDemo } from "@/views/demo/button";
import { MarkdownDemo } from "@/views/demo/markdown";
import { VerificationDemo } from "@/views/demo/verification";

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
            {
                path: "markdown",
                component: MarkdownDemo,
            },
            {
                path: "verification",
                component: VerificationDemo,
            },
        ],
    },
];

export const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_DOCS_SUB_PATH),
    routes: routes,
});
