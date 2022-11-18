<script lang="ts">
export default {
	name: "ConfigProvider",
};
</script>
<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		theme?: string;
	}>(),
	{
		theme: "light",
	}
);
console.log(props.theme);
</script>
<template>
	<slot></slot>
</template>
