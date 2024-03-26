<demo>
拖拽填充验证码
</demo>
<script setup lang="ts">
import dataJson from "@/views/demo/verification/data.json";
import { VerificationImageInfo } from "@icuxika/vue-scaffold-ui";
import { ref } from "vue";

let defaultObj: VerificationImageInfo = {
    shadeImage: dataJson.shadeImage,
    blockImage: dataJson.blockImage,
    x: dataJson.x,
    y: dataJson.y,
    token: dataJson.token,
};

const visible = ref(false);

const onRefresh = (): VerificationImageInfo => {
    return defaultObj;
};

const onConfirm = (x: number, y: number, token: string): boolean => {
    console.log("x: " + x + ", y: " + y + ", token: " + token);
    return false;
};
</script>
<template>
    <button type="button" @click="visible = !visible">
        {{ visible ? "隐藏验证码" : "显示验证码" }}
    </button>

    <v-verification
        v-model:visible="visible"
        :on-refresh="onRefresh"
        :on-confirm="onConfirm"
    >
        <template #cancel>
            <div class="cancel">取消</div>
        </template>
        <template #refresh>
            <div class="refresh">刷新</div>
        </template>
        <template #confirm>
            <div class="confirm">确认</div>
        </template>
    </v-verification>
</template>

<style lang="scss" scoped>
.cancel {
    background: orange;
    width: auto;
    padding: 4px;
    border-radius: 4px;
}
.refresh {
    background: #42b983;
    width: auto;
    padding: 4px;
    border-radius: 4px;
}
.confirm {
    background: dodgerblue;
    width: auto;
    padding: 4px;
    border-radius: 4px;
}
</style>
