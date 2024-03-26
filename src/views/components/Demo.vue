<script setup lang="ts">
import { computed, ref } from "vue";
import { VButton } from "@icuxika/vue-scaffold-ui";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Prism from "prismjs";
import "prismjs/themes/prism.css";

type ComponentType = object & {
    /**
     * 标题
     */
    __sourceCodeTitle: string;

    /**
     * 源码
     */
    __sourceCode: string;
};

interface Props {
    component: object;
}
const props = withDefaults(defineProps<Props>(), {});
// 标题
const title = (props.component as ComponentType).__sourceCodeTitle;
// 渲染源码
const html = computed(() => {
    return Prism.highlight(
        (props.component as ComponentType).__sourceCode,
        Prism.languages.html,
        "html"
    );
});
// 源码是否可见
const codeVisible = ref(false);
const toggleCodeVisible = () => (codeVisible.value = !codeVisible.value);
</script>
<template>
    <div class="container">
        <h2>{{ title }}</h2>
        <div class="component">
            <component :is="props.component" />
        </div>
        <div class="action">
            <VButton @click="toggleCodeVisible">
                {{ codeVisible ? "隐藏源代码" : "查看源代码" }}
            </VButton>
        </div>
        <div v-if="codeVisible" class="code">
            <pre class="language-html" v-html="html" />
        </div>
    </div>
</template>
<style lang="scss" scoped>
@import "./demox.module.scss";
</style>
