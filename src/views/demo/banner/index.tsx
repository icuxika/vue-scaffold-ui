import { FunctionalComponent } from "vue";
import VBannerDemo1 from "@/views/demo/banner/VBannerDemo1.vue";
import { DemoX } from "@/views/components/DemoX";

export const BannerDemo: FunctionalComponent = () => {
	return (
		<div>
			<DemoX component={VBannerDemo1} />
		</div>
	);
};

BannerDemo.displayName = "BannerDemo";
