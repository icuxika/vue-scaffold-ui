<demo>
基本使用
</demo>
<script setup lang="ts">
import { ref } from "vue";
const value = ref("");
const darkMode = ref(false);
</script>
<template>
	<v-markdown v-model:value="value" v-model:dark-mode="darkMode"></v-markdown>
</template>
<style lang="scss" scoped></style>
