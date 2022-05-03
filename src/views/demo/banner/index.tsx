import { FunctionalComponent } from "vue";
import VBannerDemo1 from "./VBannerDemo1.vue";
import { DemoX } from "../../components/DemoX";

export const BannerDemo: FunctionalComponent = () => {
	return (
		<div>
			<DemoX component={VBannerDemo1} />
		</div>
	);
};

BannerDemo.displayName = "BannerDemo";
