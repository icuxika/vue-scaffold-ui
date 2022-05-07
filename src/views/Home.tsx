import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import style from "@/views/home.module.scss";
import { useI18n } from "vue-i18n";

export const Home = defineComponent({
	setup() {
		const { t, locale } = useI18n();
		return () => (
			<div class={style.container}>
				<div class={style.banner}>
					<div class={style.content}>
						<h1>{t("title")}</h1>
						<h2>{t("sub_title")}</h2>
						<p class={style.actions}>
							<a href={"#"}>GitHub</a>
							<RouterLink to={"/docs"}>
								{t("doc_link")}
							</RouterLink>
						</p>
						<select v-model={locale.value}>
							<option value={"zh"}>中文</option>
							<option value={"en"}>English</option>
						</select>
					</div>
				</div>
				<div class={style.feature}>
					<ul>
						<li>
							<svg class={style.icon}>
								<use xlinkHref="#vue" />
							</svg>
							<h3>基于 Vue 3</h3>
							<p>使用了 Vue 3 script setup</p>
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
	},
});
