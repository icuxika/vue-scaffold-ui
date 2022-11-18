import { defineComponent, Transition, VNode, KeepAlive } from "vue";
import {
	RouterView,
	RouterLink,
	RouteLocationNormalizedLoaded,
} from "vue-router";
import style from "@/views/docs.module.scss";
import { VConfigProvider } from "@icuxika/vue-scaffold-ui";

export const Docs = defineComponent({
	setup() {
		return () => (
			<div>
				<div class={style.header}>
					<RouterLink to={"/"}>Home</RouterLink>
					<RouterLink to={"/docs/banner"}>Banner</RouterLink>
					<RouterLink to={"/docs/button"}>Button</RouterLink>
					<RouterLink to={"/docs/markdown"}>Markdown</RouterLink>
					<RouterLink to={"/docs/verification"}>
						Verification
					</RouterLink>
				</div>
				<RouterView>
					{({
						Component: Comp,
						route: R,
					}: {
						Component: VNode;
						route: RouteLocationNormalizedLoaded;
					}) => (
						<v-config-provider theme={"light"}>
							<Transition name={"fade"}>
								<KeepAlive>{Comp}</KeepAlive>
							</Transition>
						</v-config-provider>
					)}
				</RouterView>
			</div>
		);
	},
});
