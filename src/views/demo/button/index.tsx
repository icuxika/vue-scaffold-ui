import { FunctionalComponent } from "vue";
import Demo from "../../components/Demo.vue";
import ButtonDemo1 from "./ButtonDemo1.vue";

export const ButtonDemo: FunctionalComponent = () => {
	return (
		<div>
			<Demo component={ButtonDemo1} />
		</div>
	);
};

ButtonDemo.displayName = "BannerDemo";
