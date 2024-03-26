import { defineComponent } from "vue";
import { DemoX } from "@/views/components/DemoX";
import MarkdownDemo1 from "@/views/demo/markdown/MarkdownDemo1.vue";

export const MarkdownDemo = defineComponent({
    setup() {
        return () => (
            <div>
                <DemoX component={MarkdownDemo1} />
            </div>
        );
    },
});
