<script setup lang="ts">
import { Ctx, defaultValueCtx, Editor, rootCtx } from "@milkdown/core";
import { useEditor, VueEditor } from "@milkdown/vue";
import { block } from "@milkdown/plugin-block";
import { clipboard } from "@milkdown/plugin-clipboard";
import { cursor } from "@milkdown/plugin-cursor";
import { diagram } from "@milkdown/plugin-diagram";
import { emoji } from "@milkdown/plugin-emoji";
import { history } from "@milkdown/plugin-history";
import { indent } from "@milkdown/plugin-indent";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { math } from "@milkdown/plugin-math";
import "katex/dist/katex.min.css";
import { menu } from "@milkdown/plugin-menu";
import { prism } from "@milkdown/plugin-prism";
import { slash } from "@milkdown/plugin-slash";
import { tooltip } from "@milkdown/plugin-tooltip";
import { trailing } from "@milkdown/plugin-trailing";
import { upload } from "@milkdown/plugin-upload";
import { gfm } from "@milkdown/preset-gfm";
import { nord } from "@milkdown/theme-nord";

interface Props {
	markdown: string;
}
const props = withDefaults(defineProps<Props>(), {
	markdown: "",
});
const emit = defineEmits<{
	(event: "update:markdown", value: string): void;
}>();

let ctxRef: Ctx;

const { editor } = useEditor((root) =>
	Editor.make()
		.config((ctx) => {
			ctx.set(rootCtx, root);
			ctx.set(defaultValueCtx, props.markdown);
			ctx.get(listenerCtx).markdownUpdated(
				(ctx: Ctx, markdown: string, prevMarkdown: string | null) => {
					emit("update:markdown", markdown);
				}
			);
			ctxRef = ctx;
		})
		.use(emoji)
		.use(gfm)
		.use(listener)
		.use(clipboard)
		.use(history)
		.use(cursor)
		.use(prism)
		.use(math)
		.use(indent)
		.use(upload)
		.use(diagram)
		.use(tooltip)
		.use(slash)
		.use(nord)
		.use(trailing)
		.use(block)
		.use(menu)
);
</script>

<template>
	<VueEditor :editor="editor" />
</template>

<style lang="scss" scoped></style>
