import { ref, watchEffect } from "vue";

type Theme = "light" | "dark" | "os";
const LOCAL_KEY = "__theme__";
const theme = ref<Theme>((localStorage.getItem(LOCAL_KEY) as Theme) || "light");

const match = matchMedia("(prefers-color-scheme: dark)");

function followOSTheme() {
    if (match.matches) {
        document.documentElement.dataset.theme = "dark";
    } else {
        document.documentElement.dataset.theme = "light";
    }
}

watchEffect(() => {
    localStorage.setItem(LOCAL_KEY, theme.value);

    if (theme.value == "os") {
        followOSTheme();
        match.addEventListener("change", followOSTheme);
    } else {
        document.documentElement.dataset.theme = theme.value;
        match.removeEventListener("change", followOSTheme);
    }
});

export const useTheme = () => {
    return { theme };
};
