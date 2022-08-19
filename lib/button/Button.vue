<script lang="ts">
export default {
	name: "Button",
};
</script>
<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
	defineProps<{
		theme?: string;
		size?: string;
		level?: string;
		disabled?: boolean;
		loading?: boolean;
	}>(),
	{
		theme: "button",
		size: "normal",
		level: "normal",
		disabled: false,
		loading: false,
	}
);

const classes = computed(() => {
	return {
		[`v3-theme-${props.theme}`]: props.theme,
		[`v3-size-${props.size}`]: props.size,
		[`v3-level-${props.level}`]: props.level,
	};
});
</script>
<template>
	<button class="v3-button" :class="classes" :disabled="props.disabled">
		<span v-if="props.loading" class="v3-loading-indicator"></span>
		<span v-else class="v3-loading-indicator-empty"></span>
		<slot />
	</button>
</template>

<style lang="scss">
$h: 32px;
$border-color: #d9d9d9;
$color: #333;
$blue: #40a9ff;
$radius: 4px;
$red: red;
$grey: grey;
.v3-button {
	box-sizing: border-box;
	height: $h;
	padding: 0 12px;
	cursor: pointer;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	white-space: nowrap;
	background: white;
	color: $color;
	border: 1px solid $border-color;
	border-radius: $radius;
	box-shadow: 0 1px 0 fade-out($color: #000000, $amount: 0.95);
	transition: background 250ms;

	& + & {
		margin-left: 8px;
	}

	&:hover,
	&:focus {
		color: $blue;
		border-color: $blue;
	}

	&:focus {
		outline: none;
	}

	&::-moz-focus-inner {
		border: 0;
	}

	&.v3-theme-link {
		border-color: transparent;
		box-shadow: none;
		color: $blue;

		&:hover,
		&:focus {
			color: lighten($color: $blue, $amount: 10%);
		}
	}

	&.v3-theme-text {
		border-color: transparent;
		box-shadow: none;
		color: inherit;

		&:hover,
		&:focus {
			background: darken($color: white, $amount: 5%);
		}
	}

	&.v3-size-big {
		font-size: 24px;
		height: 48px;
		padding: 0 16px;
	}

	&.v3-size-small {
		font-size: 12px;
		height: 20px;
		padding: 0 4px;
	}

	&.v3-theme-button {
		&.v3-level-main {
			background: $blue;
			color: white;
			border-color: $blue;

			&:hover,
			&:focus {
				background: darken($color: $blue, $amount: 10%);
				border-color: darken($color: $blue, $amount: 10%);
			}
		}

		&.v3-level-danger {
			background: $red;
			color: white;
			border-color: $red;

			&:hover,
			&:focus {
				background: darken($color: $red, $amount: 10%);
				border-color: darken($color: $red, $amount: 10%);
			}
		}
	}

	&.v3-theme-link {
		&.v3-level-danger {
			color: $red;

			&:hover,
			&:focus {
				color: darken($color: $red, $amount: 10%);
			}
		}
	}

	&.v3-theme-text {
		&.v3-level-main {
			color: $blue;

			&:hover,
			&:focus {
				color: darken($color: $blue, $amount: 10%);
			}
		}

		&.v3-level-danger {
			color: $red;

			&:hover,
			&:focus {
				color: darken($color: $red, $amount: 10%);
			}
		}
	}

	&.v3-theme-button {
		&[disabled] {
			cursor: not-allowed;
			color: $grey;

			&:hover {
				border-color: $grey;
			}
		}
	}

	&.v3-theme-link,
	&.v3-theme-text {
		&[disabled] {
			cursor: not-allowed;
			color: $grey;
		}
	}

	> .v3-loading-indicator {
		width: 15px;
		height: 15px;
		display: inline-block;
		margin-right: 4px;
		border-radius: 8px;
		border-color: $blue $blue $blue transparent;
		border-style: solid;
		border-width: 2px;
		animation: v3-spin 1s infinite linear;
	}

	// 使loading状态的按钮所在的div中的按钮在同一基准高度
	> .v3-loading-indicator-empty {
		height: 15px;
	}
}

@keyframes v3-spin {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
