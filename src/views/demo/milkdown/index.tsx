import { FunctionalComponent } from "vue";
import { DemoX } from "@/views/components/DemoX";
import MilkdownDemo1 from "@/views/demo/milkdown/MilkdownDemo1.vue";

export const MilkdownDemo: FunctionalComponent = () => {
	return (
		<div>
			<DemoX component={MilkdownDemo1} />
		</div>
	);
};

MilkdownDemo.displayName = "MilkdownDemo";
