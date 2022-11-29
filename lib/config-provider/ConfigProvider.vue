<script lang="ts">
export default {
	name: "ConfigProvider",
};
</script>
<script setup lang="ts">
import { computed, provide } from "vue";
import { key } from "./context";
import { GlobalTheme, GlobalThemeOverrides } from "./index";

const props = withDefaults(
	defineProps<{
		theme: GlobalTheme;
		themeOverrides: GlobalThemeOverrides;
	}>(),
	{}
);
const mergedThemeRef = computed(() => {
	const { theme } = props;
	return theme;
});

provide(key, {
	mergedThemeRef,
});
</script>
<template>
	<slot></slot>
</template>
