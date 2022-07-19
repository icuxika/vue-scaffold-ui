import { FunctionalComponent } from "vue";
import { DemoX } from "@/views/components/DemoX";
import MarkdownDemo1 from "@/views/demo/markdown/MarkdownDemo1.vue";

export const MarkdownDemo: FunctionalComponent = () => {
	return (
		<div>
			<DemoX component={MarkdownDemo1} />
		</div>
	);
};

MarkdownDemo.displayName = "MarkdownDemo";
