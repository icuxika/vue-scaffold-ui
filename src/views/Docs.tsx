import { defineComponent, Transition, VNode, KeepAlive, ref } from "vue";
import {
	RouterView,
	RouterLink,
	RouteLocationNormalizedLoaded,
} from "vue-router";
import style from "@/views/docs.module.scss";
import { lightTheme, darkTheme, GlobalTheme } from "@icuxika/vue-scaffold-ui";

export const Docs = defineComponent({
	setup() {
		const theme = ref<GlobalTheme>(lightTheme);
		return () => (
			<div>
				<div class={style.header}>
					<button
						onClick={() => {
							theme.value = lightTheme;
						}}
					>
						light
					</button>
					<button
						onClick={() => {
							theme.value = darkTheme;
						}}
					>
						dark
					</button>
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
						<v-config-provider theme={theme.value}>
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
