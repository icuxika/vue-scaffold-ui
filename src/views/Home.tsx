import { useTheme } from "@/hooks/use-theme";
import style from "@/views/home.module.scss";
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";

export const Home = defineComponent({
    setup() {
        const { t, locale } = useI18n();
        const { theme } = useTheme();
        return () => (
            <div class={style.container}>
                <div class={style.header}>
                    <div class={style.title}>
                        <h1>{t("title")}</h1>
                        <select v-model={locale.value}>
                            <option value={"zh"}>中文</option>
                            <option value={"en"}>English</option>
                        </select>
                        <select v-model={theme.value}>
                            <option value={"os"}>跟随系统</option>
                            <option value={"light"}>亮色</option>
                            <option value={"dark"}>暗色</option>
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
