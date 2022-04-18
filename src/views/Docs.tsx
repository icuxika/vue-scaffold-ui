import { defineComponent, FunctionalComponent } from "vue";
import { RouterView, RouterLink } from "vue-router";
import style from "./docs.module.scss";

export const Docs: FunctionalComponent = () => {
	return (
		<div>
			<div class={style.header}>
				<RouterLink to={"/"}>Home</RouterLink>
				<RouterLink to={"/docs/banner"}>Banner</RouterLink>
				<RouterLink to={"/docs/button"}>Button</RouterLink>
			</div>
			<RouterView />
		</div>
	);
};

Docs.displayName = "Docs";
