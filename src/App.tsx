import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import "./app.scss";

export const App = defineComponent({
	setup() {
		return () => <RouterView />;
	},
});
