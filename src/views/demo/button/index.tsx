import { defineComponent } from "vue";
import Demo from "@/views/components/Demo.vue";
import { DemoX } from "@/views/components/DemoX";
import ButtonDemo1 from "@/views/demo/button/ButtonDemo1.vue";

export const ButtonDemo = defineComponent({
	setup() {
		return () => (
			<div>
				<Demo component={ButtonDemo1} />
				<DemoX component={ButtonDemo1} />
			</div>
		);
	},
});
