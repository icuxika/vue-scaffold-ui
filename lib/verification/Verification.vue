<script lang="ts">
export default {
	name: "Verification",
};
</script>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { VerificationImageInfo } from "./types";

interface Props {
	visible: boolean;
	// 刷新验证码
	onRefresh: () => VerificationImageInfo;
	// 确认验证码
	onConfirm: (x: number, y: number, token: string) => boolean;
}
const props = withDefaults(defineProps<Props>(), {
	visible: false,
});

const emit = defineEmits<{
	(event: "update:visible", visible: boolean): void;
}>();

let token = "";

// 底图
const shadeImage = ref("");
const shadeImageUrl = computed(
	() => "url('data:image/jpg;base64," + shadeImage.value + "')"
);
// 拼图
const blockImage = ref("");
const blockImageUrl = computed(
	() => "data:image/jpg;base64," + blockImage.value
);
const blockWrapperY = ref(0);
const blockWrapperTop = computed(() => blockWrapperY.value + "px");

const imageWrapperRef = ref<HTMLElement>();
const blockWrapperRef = ref<HTMLElement>();

// 鼠标点击在被拖拽节点的位置相对于被拖拽节点的左上角的x轴距离
let startOffsetX = 0;
// 鼠标点击在被拖拽节点的位置相对于被拖拽节点的左上角的y轴距离
let startOffsetY = 0;

// 开始拖拽
const onDragStart = (event: DragEvent) => {
	startOffsetX =
		event.x - (event.target as HTMLElement).getBoundingClientRect().x;
	startOffsetY =
		event.y - (event.target as HTMLElement).getBoundingClientRect().y;
	if (event.dataTransfer) {
		event.dataTransfer.effectAllowed = "move";
	}
};

// 拖拽经过目标节点
const ondragover = (event: DragEvent) => {
	let imageWrapper = imageWrapperRef.value;
	let blockWrapper = blockWrapperRef.value;
	if (imageWrapper && blockWrapper) {
		let {
			x: outX,
			y: outY,
			width: outWidth,
			height: outHeight,
		} = imageWrapper.getBoundingClientRect();
		let { width: blockWidth, height: blockHeight } =
			blockWrapper.getBoundingClientRect();
		if (
			event.x - startOffsetX < outX ||
			event.x - startOffsetX + blockWidth > outX + outWidth ||
			event.y - startOffsetY < outY ||
			event.y - startOffsetY + blockHeight > outY + outHeight
		) {
			// 防止被拖拽节点超出容器
			if (event.dataTransfer) {
				event.dataTransfer.dropEffect = "none";
			}
		} else {
			if (event.dataTransfer) {
				event.dataTransfer.dropEffect = "move";
			}
		}
	}
	event.preventDefault();
};

// 拖拽完成
const onDrop = (event: DragEvent) => {
	let className = (event.target as HTMLElement).className;
	let blockWrapper = blockWrapperRef.value;
	if (blockWrapper) {
		if (className === "image-wrapper") {
			blockWrapper.style.left = event.offsetX - startOffsetX + "px";
			blockWrapper.style.top = event.offsetY - startOffsetY + "px";
		} else {
			blockWrapper.style.left =
				event.offsetX +
				blockWrapper.getBoundingClientRect().x -
				(blockWrapper.parentNode as HTMLElement).getBoundingClientRect()
					.x -
				startOffsetX +
				"px";
			blockWrapper.style.top =
				event.offsetY +
				blockWrapper.getBoundingClientRect().y -
				(blockWrapper.parentNode as HTMLElement).getBoundingClientRect()
					.y -
				startOffsetY +
				"px";
		}
	}

	event.preventDefault();
};

// 执行验证码刷新
const refresh = () => {
	const info = props.onRefresh();
	shadeImage.value = info.shadeImage;
	blockImage.value = info.blockImage;
	blockWrapperY.value = info.y;
	token = info.token;
};

// 执行验证码确认
const confirm = () => {
	let x = 0;
	let y = 0;
	let imageWrapper = imageWrapperRef.value;
	let blockWrapper = blockWrapperRef.value;
	if (imageWrapper && blockWrapper) {
		x =
			blockWrapper.getBoundingClientRect().x -
			imageWrapper.getBoundingClientRect().x;
		y =
			blockWrapper.getBoundingClientRect().y -
			imageWrapper.getBoundingClientRect().y;
	}
	let checkResult = props.onConfirm(x, y, token);
	console.log(checkResult);
};

onMounted(() => {
	// 初次验证码刷新
	refresh();
});
</script>
<template>
	<div v-if="props.visible" class="container">
		<div class="title">
			<span>完成拼图然后点击确认</span>
		</div>
		<div
			ref="imageWrapperRef"
			class="image-wrapper"
			@drop="onDrop"
			@dragenter.prevent
			@dragleave.prevent
			@dragend.prevent
			@dragover="ondragover"
		>
			<div ref="blockWrapperRef" class="block-wrapper">
				<img
					class="block-image"
					:src="blockImageUrl"
					alt=""
					draggable="true"
					@dragstart="onDragStart"
					@dragenter.prevent
					@dragleave.prevent
					@dragend.prevent
				/>
			</div>
		</div>
		<div class="control-wrapper">
			<div class="cancel-wrapper" @click="emit('update:visible', false)">
				<slot name="cancel">
					<span>取消</span>
				</slot>
			</div>
			<div class="refresh-wrapper" @click="refresh">
				<slot name="refresh">
					<span>刷新</span>
				</slot>
			</div>
			<div class="confirm-wrapper" @click="confirm">
				<slot name="confirm">
					<span>确认</span>
				</slot>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
$width: 280px;
.container {
	width: $width + 48px;
	padding: 24px;
	border: 2px dodgerblue solid;
	border-radius: 8px;
	& > .title {
		text-align: center;
		color: #757575;
		font-size: 16px;
	}

	& > .image-wrapper {
		background: v-bind(shadeImageUrl);
		width: $width;
		height: 171px;

		& > .block-wrapper {
			position: relative;
			top: v-bind(blockWrapperTop);
			width: 55px;
			height: 55px;
		}
	}

	& > .control-wrapper {
		width: $width;
		margin-top: 8px;
		display: flex;
		justify-content: space-between;
		text-align: center;
		color: white;
	}
}
</style>
