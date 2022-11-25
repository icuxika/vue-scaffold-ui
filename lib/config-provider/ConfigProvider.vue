<script lang="ts">
export default {
	name: "ConfigProvider",
};
</script>
<script setup lang="ts">
import { GlobalTheme, key } from "./interface";
import { lightTheme } from "../themes";
import { computed, InjectionKey, provide } from "vue";
import { ConfigProviderInjection } from "./internal-interface";

const props = withDefaults(
	defineProps<{
		theme: GlobalTheme;
	}>(),
	{}
);

const mergedThemeRef = computed(() => {
	const { theme } = props;
	console.log(theme.name);
	return theme;
});

provide(key, {
	mergedThemeRef,
});
</script>
<template>
	<slot></slot>
</template>
