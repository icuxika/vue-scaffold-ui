<script setup lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import { VBanner, VButton } from "vue-scaffold-ui";
</script>

<template>
	<img alt="Vue logo" src="@/assets/logo.png" />
	<VBanner />
	<VButton theme="button" level="main">你好</VButton>
	<VButton theme="link">你好</VButton>
	<VButton theme="text" level="danger">你好</VButton>
	<VButton disabled>你好</VButton>
	<VButton loading>你好</VButton>
	<HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

* {
	margin: 0;
	padding: 0;
	// 使边框和内边距的值包含在width内
	box-sizing: border-box;
}
</style>
