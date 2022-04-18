import { FunctionalComponent } from "vue";
import { RouterLink } from "vue-router";
import style from "./home.module.scss";

export const Home: FunctionalComponent = () => {
	return (
		<div class={style.container}>
			<div class={style.banner}>
				<div class={style.content}>
					<h1>Vue3 UI</h1>
					<h2>Vue3 UI 框架</h2>
					<p class={style.actions}>
						<a href={"#"}>GitHub</a>
						<RouterLink to={"/docs"}>文档</RouterLink>
					</p>
				</div>
			</div>
			<div class={style.feature}>
				<ul>
					<li>
						<svg class={style.icon}>
							<use xlinkHref="#vue" />
						</svg>
						<h3>基于 Vue 3</h3>
						<p>使用了 Vue 3 Composition API</p>
					</li>
					<li>
						<svg class={style.icon}>
							<use xlinkHref="#ts" />
						</svg>
						<h3>基于 TypeScript</h3>
						<p>源代码采用 TypeScript书写</p>
					</li>
					<li>
						<svg class={style.icon}>
							<use xlinkHref="#light" />
						</svg>
						<h3>代码易读</h3>
						<p>每个组件的源代码都极其简洁</p>
					</li>
				</ul>
			</div>
		</div>
	);
};

Home.displayName = "Home";
