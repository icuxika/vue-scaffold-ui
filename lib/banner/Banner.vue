<script lang="ts">
export default {
	name: "Banner",
};
</script>
<script setup lang="ts">
import { computed, CSSProperties } from "vue";
import style from "./styles/index";
import { useTheme } from "../_hooks/use-theme";
import { bannerLight } from "./themes";
const themeRef = useTheme("Banner", "-banner", style, bannerLight);
const computedCssVars = computed((): CSSProperties => {
	const theme = themeRef.value;
	const { self } = theme;
	return {
		"--s-color": self.colorSuccess,
		"--s-text-color": self.colorHoverWarning,
	};
});
</script>

<template>
	<div class="s-banner" :style="computedCssVars">
		<div class="s-banner__border">
			<h1>Vue Scaffold UI</h1>
		</div>
	</div>
</template>
