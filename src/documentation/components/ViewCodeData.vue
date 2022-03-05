<script setup>
import {defineProps, ref, computed} from "vue"
import {isFrameMode} from "../../utils/common"
import ComponentCode from "../components/ComponentCode"

defineProps({
    code: {
        type: String,
        required: true
    },
    data: {
        type: [String, Object, Array],
        required: false
    },
    isFirstComponent: {
        type: Boolean,
        default: false
    }
})

const responsiveWidth = ref("0px")
const frameUrl = new URL(location)
const showFrame = computed(() => !isFrameMode() && responsiveWidth.value !== "0px")

frameUrl.searchParams.set("frameMode", "true")

function changeWidth(width) {
    responsiveWidth.value = width + "px"
}
</script>

<template>
    <div class="flex-container vertical">
        <div>
            <header class="flex-container">
                <h3>View</h3>
                <ul v-if="isFirstComponent" class="flex-container">
                    <li>
                        <a class="icon-device-smartphone" href="#" @click.prevent="changeWidth(600)" title="Change view to smartphone (0-600px)"></a>
                    </li>
                    <li>
                        <a class="icon-device-tablet" href="#" @click.prevent="changeWidth(1023)" title="Change view to tablet (601px-1023px)"></a>
                    </li>
                    <li>
                        <a class="icon-device-laptop" href="#" @click.prevent="changeWidth(1280)" title="Change view to laptop (1024px-1280px)"></a>
                    </li>
                    <li>
                        <a class="icon-device-desktop" href="#" @click.prevent="changeWidth(0)" title="Change view to desktop (1281px+)"></a>
                    </li>
                </ul>
            </header>
            <iframe v-if="showFrame" :src="frameUrl.href" id="responsive-view" :style="{width: responsiveWidth}"></iframe>
            <slot v-if="!showFrame"></slot>
        </div>
        <div v-if="!isFrameMode()" class="flex-container">
            <div>
                <h3>Code</h3>
                <ComponentCode :code="code" />
            </div>
            <div v-if="data">
                <h3>Data</h3>
                <ComponentCode :code="data" language="json" />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
#responsive-view {
    border: .1rem dotted var(--text-color);
}
</style>