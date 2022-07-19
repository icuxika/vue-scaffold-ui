<script lang="ts">
export default {
	name: "Markdown",
};
</script>
<script setup lang="ts">
import { ref, watch } from "vue";
import Milkdown from "./Milkdown.vue";
import CodeMirror from "./CodeMirror.vue";
interface Props {
	value: string;
	darkMode: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	value: "",
	darkMode: false,
});
const emit = defineEmits<{
	(event: "update:value", value: string): void;
}>();

const markdown = ref<string>(props.value);
// 是否显示CodeMirror面板
const showSource = ref<boolean>(false);
// CodeMirror是否激活中，即鼠标点击了
const focusOnCodeMirror = ref<boolean>(false);

const markdownEditor = ref<typeof Milkdown>();
const codeMirror = ref<typeof CodeMirror>();

watch(markdown, (value, oldValue) => {
	emit("update:value", value);
	if (focusOnCodeMirror.value) {
		markdownEditor?.value?.setMarkdown(value);
	} else {
		codeMirror?.value?.setDoc(value);
	}
});

watch(
	() => props.darkMode,
	(value, oldValue) => {
		markdownEditor?.value?.setDarkMode(value);
	}
);
</script>

<template>
	<div :class="`container ${showSource ? 'two-side' : ''}`">
		<Milkdown
			ref="markdownEditor"
			v-model:markdown="markdown"
			v-model:show-source="showSource"
			class="v3-milk"
		/>
		<CodeMirror
			v-show="showSource"
			ref="codeMirror"
			v-model:markdown="markdown"
			v-model:has-focus="focusOnCodeMirror"
		/>
	</div>
</template>

<style lang="scss">
.container {
	max-width: 72rem;
	display: block;
	margin: 0 auto;
	width: 100%;
	transition: all 0.4s ease-in-out;

	.v3-milk {
		flex-grow: 1;
		transition: all 0.4s ease-in-out;
		flex-shrink: 2;
		.milkdown-menu-wrapper {
			.milkdown {
				height: calc(100vh - 11.5rem - 18px);
			}
		}
	}
}

.two-side {
	gap: 1.25rem;
	margin: 0;
	max-width: unset;

	.v3-milk {
		width: 50%;
	}

	.v3-code-mirror {
		width: unset;
		flex: 1 1 40%;
		overflow: auto;
		min-height: 30rem;
		height: calc(100vh - 11.5rem + 34px);
		background: rgb(255, 255, 255);
		border: 1px solid transparent;
		box-shadow: 0 1px 1px rgba(59, 66, 82, 0.14),
			0 2px 1px rgba(59, 66, 82, 0.12), 0 1px 3px rgba(59, 66, 82, 0.2);
	}
}

@media screen and (min-width: 72rem) {
	.container {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
}
</style>
