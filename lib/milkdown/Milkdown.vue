<script lang="ts">
export default {
	name: "Milkdown",
};
</script>
<script setup lang="ts">
import MarkdownEditor from "./MarkdownEditor.vue";
import { ref } from "vue";
const markdown = ref<string>("");
</script>

<template>
	<MarkdownEditor v-model:markdown="markdown" />
	<div>{{ markdown }}</div>
</template>

<style lang="scss" scoped></style>
