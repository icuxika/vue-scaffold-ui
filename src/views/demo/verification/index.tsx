import { defineComponent } from "vue";
import { DemoX } from "@/views/components/DemoX";
import VerificationDemo1 from "@/views/demo/verification/VerificationDemo1.vue";

export const VerificationDemo = defineComponent({
    setup() {
        return () => (
            <div>
                <DemoX component={VerificationDemo1} />
            </div>
        );
    },
});
