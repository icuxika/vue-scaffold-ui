<demo>
拖拽填充验证码
</demo>
<script setup lang="ts">
import { VerificationImageInfo, VVerification } from "@icuxika/vue-scaffold-ui";
import dataJson from "./data.json";
import { ref } from "vue";

let defaultObj: VerificationImageInfo = {
	shadeImage: dataJson.shadeImage,
	blockImage: dataJson.blockImage,
	x: dataJson.x,
	y: dataJson.y,
	token: dataJson.token,
};

const visible = ref(true);

const onRefresh = (): VerificationImageInfo => {
	let xmlHttpRequest = new XMLHttpRequest();
	xmlHttpRequest.open(
		"GET",
		"http://localhost:8900/admin/verification/refresh",
		false
	);

	try {
		xmlHttpRequest.send();
		if (xmlHttpRequest.status == 200) {
			let obj = JSON.parse(xmlHttpRequest.response).data;
			return {
				shadeImage: obj.shadeImage,
				blockImage: obj.blockImage,
				x: obj.x,
				y: obj.y,
				token: obj.token,
			};
		} else {
			return defaultObj;
		}
	} catch (error) {
		console.log(error);
		return defaultObj;
	}
};

const onConfirm = (x: number, y: number, token: string): boolean => {
	console.log("x: " + x + ", y: " + y + ", token: " + token);
	let xmlHttpRequest = new XMLHttpRequest();
	xmlHttpRequest.open(
		"GET",
		"http://localhost:8900/admin/verification/check?x=" +
			x +
			"&y=" +
			y +
			"&token=" +
			token,
		false
	);
	try {
		xmlHttpRequest.send();
		if (xmlHttpRequest.status == 200) {
			return JSON.parse(xmlHttpRequest.response).data;
		} else {
			return false;
		}
	} catch (error) {
		console.log(error);
	}
	return false;
};
</script>
<template>
	<button type="button" @click="visible = !visible">
		{{ visible ? "隐藏验证码" : "显示验证码" }}
	</button>
	<div>
		<span
			>等修复在 css 中使用 v-bind 会与 Teleport 产生冲突的 PR 合并后使用
			Teleport (https://github.com/vuejs/core/issues/4605)</span
		>
	</div>
	<VVerification
		v-model:visible="visible"
		:on-refresh="onRefresh"
		:on-confirm="onConfirm"
	>
		<template #cancel>
			<div class="cancel">取消</div>
		</template>
		<template #refresh>
			<div class="refresh">刷新</div>
		</template>
		<template #confirm>
			<div class="confirm">确认</div>
		</template>
	</VVerification>
</template>

<style lang="scss" scoped>
.cancel {
	background: orange;
	width: auto;
	padding: 4px;
	border-radius: 4px;
}
.refresh {
	background: #42b983;
	width: auto;
	padding: 4px;
	border-radius: 4px;
}
.confirm {
	background: dodgerblue;
	width: auto;
	padding: 4px;
	border-radius: 4px;
}
</style>
