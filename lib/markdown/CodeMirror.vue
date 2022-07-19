<script setup lang="ts">
import {
	crosshairCursor,
	drawSelection,
	dropCursor,
	EditorView,
	highlightActiveLine,
	highlightActiveLineGutter,
	highlightSpecialChars,
	keymap,
	lineNumbers,
	rectangularSelection,
} from "@codemirror/view";
import { onMounted, ref } from "vue";
import {
	autocompletion,
	closeBrackets,
	closeBracketsKeymap,
	completionKeymap,
} from "@codemirror/autocomplete";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
import {
	bracketMatching,
	defaultHighlightStyle,
	foldGutter,
	foldKeymap,
	indentOnInput,
	syntaxHighlighting,
} from "@codemirror/language";
import { EditorState, Extension } from "@codemirror/state";
import { lintKeymap } from "@codemirror/lint";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { markdown } from "@codemirror/lang-markdown";

interface Props {
	markdown: string;
	hasFocus: boolean;
}
const props = withDefaults(defineProps<Props>(), {
	markdown: "",
	hasFocus: false,
});
const emit = defineEmits<{
	(event: "update:markdown", value: string): void;
	(event: "update:has-focus", value: boolean): void;
}>();

const divRef = ref<HTMLDivElement>();
const basicSetup: Extension = [
	lineNumbers(),
	highlightActiveLineGutter(),
	highlightSpecialChars(),
	history(),
	foldGutter(),
	drawSelection(),
	dropCursor(),
	EditorState.allowMultipleSelections.of(true),
	indentOnInput(),
	syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
	bracketMatching(),
	closeBrackets(),
	autocompletion(),
	rectangularSelection(),
	crosshairCursor(),
	highlightActiveLine(),
	highlightSelectionMatches(),
	keymap.of([
		...closeBracketsKeymap,
		...defaultKeymap,
		...searchKeymap,
		...historyKeymap,
		...foldKeymap,
		...completionKeymap,
		...lintKeymap,
	]),
];

const createEditorState = (doc: string) => {
	return EditorState.create({
		doc: doc,
		extensions: [
			basicSetup,
			markdown(),
			EditorView.updateListener.of((v) => {
				if (v.focusChanged) {
					emit("update:has-focus", v.view.hasFocus);
				}
				if (v.docChanged) {
					emit("update:markdown", v.state.doc.toString());
				}
			}),
		],
	});
};

let editorView: EditorView;

onMounted(() => {
	editorView = new EditorView({
		state: createEditorState(props.markdown),
		parent: divRef.value,
	});
});

const setDoc = (value: string) => {
	editorView.setState(createEditorState(value));
};

defineExpose({
	setDoc,
});
</script>

<template>
	<div ref="divRef" class="v3-code-mirror"></div>
</template>

<style lang="scss">
.v3-code-mirror {
	font-size: 16px;
	font-weight: bold;

	.cm-gutters {
		color: #6c6c6c;

		.cm-lineNumbers {
			background: #f5f5f5;

			.cm-gutterElement {
				padding: 0 3px 0 5px;
				min-width: 24px;
			}

			.cm-activeLineGutter {
				background: rgb(236, 239, 244);
			}
		}

		.cm-foldGutter {
			background-color: #f5f5f5;
			.cm-gutterElement {
			}

			.cm-activeLineGutter {
				background: rgb(236, 239, 244);
			}
		}
	}

	.cm-content {
		.cm-activeLine {
			background: rgb(236, 239, 244);
		}
	}
}
</style>
