import {
	defineComponent,
	PropType,
	h,
	ref,
	computed,
	withModifiers,
	Component,
} from "vue";
import { VButton } from "@icuxika/vue-scaffold-ui";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import style from "./demox.module.scss";

type ComponentType = Component & {
	/**
	 * 标题
	 */
	__sourceCodeTitle: string;

	/**
	 * 源码
	 */
	__sourceCode: string;
};

export const DemoX = defineComponent({
	props: {
		component: {
			type: Object as PropType<Component>,
			required: true,
		},
	},
	setup(props, { attrs, slots, emit, expose }) {
		// 渲染源码
		const html = computed(() => {
			return Prism.highlight(
				(props.component as ComponentType).__sourceCode,
				Prism.languages.html,
				"html"
			);
		});
		// 源码是否可见
		const codeVisible = ref(false);
		const toggleCodeVisible = () =>
			(codeVisible.value = !codeVisible.value);
		// 将onClick事件设置在VButton上时，开发时没有问题，但是构建时vue-tsc会报错不通过，因为这个操作的相当于给
		// VButton多添加了一个属性，但VButton作为一个自定义组件没有具备onClick,暂时通过套一层div来进行解决
		return () => (
			<div class={style.container}>
				<h2>{(props.component as ComponentType).__sourceCodeTitle}</h2>
				<div class={style.component}>{h(props.component)}</div>
				<div class={style.action}>
					<div onClick={withModifiers(toggleCodeVisible, ["stop"])}>
						<VButton>
							{codeVisible.value ? "隐藏源代码" : "查看源代码"}
						</VButton>
					</div>
				</div>
				{codeVisible.value ? (
					<div class={style.code}>
						<pre class={"language-html"} innerHTML={html.value} />
					</div>
				) : (
					<div />
				)}
			</div>
		);
	},
});
