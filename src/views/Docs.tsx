import { FunctionalComponent, Transition, VNode } from "vue";
import {
	RouterView,
	RouterLink,
	RouteLocationNormalizedLoaded,
} from "vue-router";
import style from "@/views/docs.module.scss";

export const Docs: FunctionalComponent = () => {
	return (
		<div>
			<div class={style.header}>
				<RouterLink to={"/"}>Home</RouterLink>
				<RouterLink to={"/docs/banner"}>Banner</RouterLink>
				<RouterLink to={"/docs/button"}>Button</RouterLink>
				<RouterLink to={"/docs/markdown"}>Markdown</RouterLink>
				<RouterLink to={"/docs/verification"}>Verification</RouterLink>
			</div>
			<RouterView>
				{({
					Component: Comp,
					route: R,
				}: {
					Component: VNode;
					route: RouteLocationNormalizedLoaded;
				}) => <Transition name={"fade"}>{Comp}</Transition>}
			</RouterView>
		</div>
	);
};

Docs.displayName = "Docs";
