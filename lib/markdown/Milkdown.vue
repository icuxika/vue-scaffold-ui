<script setup lang="ts">
import {
    commandsCtx,
    CommandsReady,
    createCmdKey,
    Ctx,
    defaultValueCtx,
    Editor,
    editorViewCtx,
    parserCtx,
    rootCtx,
} from "@milkdown/core";
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
import { menu, menuPlugin } from "@milkdown/plugin-menu";
import { prism } from "@milkdown/plugin-prism";
import { slash } from "@milkdown/plugin-slash";
import { tooltip } from "@milkdown/plugin-tooltip";
import { trailing } from "@milkdown/plugin-trailing";
import { upload } from "@milkdown/plugin-upload";
import { gfm } from "@milkdown/preset-gfm";
import { nord, nordDark, nordLight } from "@milkdown/theme-nord";
import { setBlockType, wrapIn } from "@milkdown/prose/commands";
import { EditorState, TextSelection } from "@milkdown/prose/state";
import { redo, undo } from "@milkdown/prose/history";
import { MarkType } from "@milkdown/prose/model";
import { liftListItem, sinkListItem } from "@milkdown/prose/schema-list";
import { EditorView } from "prosemirror-view";
import { Transaction } from "prosemirror-state";
import { Fragment, Slice } from "prosemirror-model";
import { switchTheme } from "@milkdown/utils";

const props = withDefaults(
    defineProps<{
        markdown: string;
        showSource: boolean;
    }>(),
    {
        markdown: "",
        showSource: false,
    }
);
const emit = defineEmits<{
    (event: "update:markdown", value: string): void;
    (event: "update:show-source", value: boolean): void;
}>();

const hasMark = (state: EditorState, type: MarkType | undefined): boolean => {
    if (!type) return false;
    const { from, $from, to, empty } = state.selection;
    if (empty) {
        return !!type.isInSet(state.storedMarks || $from.marks());
    }
    return state.doc.rangeHasMark(from, to, type);
};
const SelectParent = createCmdKey("SelectParent");

const ShowSourceCmd = createCmdKey();
const updateShowSource = () => async (ctx: Ctx) => {
    await ctx.wait(CommandsReady);
    const commandManager = ctx.get(commandsCtx);
    commandManager.create(
        ShowSourceCmd,
        () =>
            (
                state: EditorState,
                dispatch?: (tr: Transaction) => void,
                view?: EditorView
            ) => {
                emit("update:show-source", !props.showSource);
                return true;
            }
    );
};

let ctxRef: Ctx;

const { editor, getInstance } = useEditor((root) =>
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
        .use(updateShowSource)
        .use(
            menu.configure(menuPlugin, {
                config: [
                    [
                        {
                            type: "button",
                            icon: "code",
                            key: ShowSourceCmd,
                        },
                    ],
                    [
                        {
                            type: "select",
                            text: "Heading",
                            options: [
                                { id: "1", text: "Large Heading" },
                                { id: "2", text: "Medium Heading" },
                                { id: "3", text: "Small Heading" },
                                { id: "0", text: "Plain Text" },
                            ],
                            disabled: (view) => {
                                const { state } = view;
                                const heading = state.schema.nodes["heading"];
                                if (!heading) return true;
                                const setToHeading = (level: number) =>
                                    setBlockType(heading, { level })(state);
                                return (
                                    !(
                                        view.state.selection instanceof
                                        TextSelection
                                    ) ||
                                    !(
                                        setToHeading(1) ||
                                        setToHeading(2) ||
                                        setToHeading(3)
                                    )
                                );
                            },
                            onSelect: (id) =>
                                Number(id)
                                    ? ["TurnIntoHeading", Number(id)]
                                    : ["TurnIntoText", null],
                        },
                    ],
                    [
                        {
                            type: "button",
                            icon: "undo",
                            key: "Undo",
                            disabled: (view) => {
                                return !undo(view.state);
                            },
                        },
                        {
                            type: "button",
                            icon: "redo",
                            key: "Redo",
                            disabled: (view) => {
                                return !redo(view.state);
                            },
                        },
                    ],
                    [
                        {
                            type: "button",
                            icon: "bold",
                            key: "ToggleBold",
                            active: (view) =>
                                hasMark(
                                    view.state,
                                    view.state.schema.marks["strong"]
                                ),
                            disabled: (view) =>
                                !view.state.schema.marks["strong"],
                        },
                        {
                            type: "button",
                            icon: "italic",
                            key: "ToggleItalic",
                            active: (view) =>
                                hasMark(
                                    view.state,
                                    view.state.schema.marks["em"]
                                ),
                            disabled: (view) => !view.state.schema.marks["em"],
                        },
                        {
                            type: "button",
                            icon: "strikeThrough",
                            key: "ToggleStrikeThrough",
                            active: (view) =>
                                hasMark(
                                    view.state,
                                    view.state.schema.marks["strike_through"]
                                ),
                            disabled: (view) =>
                                !view.state.schema.marks["strike_through"],
                        },
                    ],
                    [
                        {
                            type: "button",
                            icon: "bulletList",
                            key: "WrapInBulletList",
                            disabled: (view) => {
                                const { state } = view;
                                const node = state.schema.nodes["bullet_list"];
                                if (!node) return true;
                                return !wrapIn(node)(state);
                            },
                        },
                        {
                            type: "button",
                            icon: "orderedList",
                            key: "WrapInOrderedList",
                            disabled: (view) => {
                                const { state } = view;
                                const node = state.schema.nodes["ordered_list"];
                                if (!node) return true;
                                return !wrapIn(node)(state);
                            },
                        },
                        {
                            type: "button",
                            icon: "taskList",
                            key: "TurnIntoTaskList",
                            disabled: (view) => {
                                const { state } = view;
                                const node =
                                    state.schema.nodes["task_list_item"];
                                if (!node) return true;
                                return !wrapIn(node)(state);
                            },
                        },
                        {
                            type: "button",
                            icon: "liftList",
                            key: "LiftListItem",
                            disabled: (view) => {
                                const { state } = view;
                                const node = state.schema.nodes["list_item"];
                                if (!node) return true;
                                return !liftListItem(node)(state);
                            },
                        },
                        {
                            type: "button",
                            icon: "sinkList",
                            key: "SinkListItem",
                            disabled: (view) => {
                                const { state } = view;
                                const node = state.schema.nodes["list_item"];
                                if (!node) return true;
                                return !sinkListItem(node)(state);
                            },
                        },
                    ],
                    [
                        {
                            type: "button",
                            icon: "link",
                            key: "ToggleLink",
                            active: (view) =>
                                hasMark(
                                    view.state,
                                    view.state.schema.marks["link"]
                                ),
                        },
                        {
                            type: "button",
                            icon: "image",
                            key: "InsertImage",
                        },
                        {
                            type: "button",
                            icon: "table",
                            key: "InsertTable",
                        },
                        {
                            type: "button",
                            icon: "code",
                            key: "TurnIntoCodeFence",
                        },
                    ],
                    [
                        {
                            type: "button",
                            icon: "quote",
                            key: "WrapInBlockquote",
                        },
                        {
                            type: "button",
                            icon: "divider",
                            key: "InsertHr",
                        },
                        {
                            type: "button",
                            icon: "select",
                            key: SelectParent,
                        },
                    ],
                ],
            })
        )
);

// 更新文档内容
const setMarkdown = (value: string) => {
    const editorView = ctxRef.get(editorViewCtx);
    const parser = ctxRef.get(parserCtx);
    const doc = parser(value);
    const state = editorView.state;
    editorView.dispatch(
        state.tr.replace(
            0,
            state.doc.content.size,
            new Slice(doc?.content as Fragment, 0, 0)
        )
    );
};

// 切换暗黑主题
const setDarkMode = (isDarkMode: boolean) => {
    const editor = getInstance();
    if (editor) {
        editor.action(switchTheme(isDarkMode ? nordDark : nordLight));
    }
};

defineExpose({
    setMarkdown,
    setDarkMode,
});
</script>

<template>
    <VueEditor :editor="editor" />
</template>

<style lang="scss"></style>
