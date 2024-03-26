import { defineComponent } from "vue";
import VBannerDemo1 from "@/views/demo/banner/VBannerDemo1.vue";
import { DemoX } from "@/views/components/DemoX";

export const BannerDemo = defineComponent({
    setup() {
        return () => (
            <div>
                <DemoX component={VBannerDemo1} />
            </div>
        );
    },
});
