<script lang="ts">
export default {
	name: "Banner",
};
</script>
<script setup lang="ts">
import style from "./styles/index";
import { useTheme } from "../_hooks/use-theme";
import { computed, CSSProperties } from "vue";
useTheme("Banner", "-banner", style);
// TODO 根据Naive UI的源码，useTheme应返回关联着支持css变量值动态更新的引用交由computedCssVars绑定到页面元素上
const computedCssVars = computed((): CSSProperties => {
	return {
		"--s-color": "black",
		"--s-text-color": "dodgerblue",
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
