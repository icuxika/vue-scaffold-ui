import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import style from "@/views/home.module.scss";
import { useI18n } from "vue-i18n";

export const Home = defineComponent({
    setup() {
        const { t, locale } = useI18n();
        const isDarkMode = ref(false);
        // 切换主题
        const onChange = (payload: Event) => {
            if (isDarkMode.value) {
                document.documentElement.setAttribute("theme", "dark");
            } else {
                document.documentElement.removeAttribute("theme");
            }
        };
        return () => (
            <div class={style.container}>
                <div class={style.header}>
                    <div class={style.title}>
                        <h1>{t("title")}</h1>
                        <select v-model={locale.value}>
                            <option value={"zh"}>中文</option>
                            <option value={"en"}>English</option>
                        </select>
                        <select v-model={isDarkMode.value} onChange={onChange}>
                            <option value={true}>Dark</option>
                            <option value={false}>Light</option>
                        </select>
                    </div>
                </div>
                <div class={style.content}>
                    <div class={style.actions}>
                        <a href={"#"}>GitHub</a>
                        <RouterLink to={"/docs"}>{t("doc_link")}</RouterLink>
                    </div>
                </div>
                <div class={style.footer}></div>
            </div>
        );
    },
});
