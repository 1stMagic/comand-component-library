<script setup>
import {defineProps, defineAsyncComponent, computed, watch, shallowRef} from "vue"
import {useRoute, useRouter} from "vue-router"
import {isFrameMode} from "../../utils/common"
import componentDescription from "../data/componentsDescription"
const props = defineProps({
    componentName: {
        type: String,
        required: true
    },
    previousComponentName: {
        type: String,
        required: true
    },
    nextComponentName: {
        type: String,
        required: true
    },
    activeTab: {
        type: Number,
        default: 0
    }
})
const componentNameHelp = computed(() => props.componentName + "Help")
const HelpView = shallowRef(null)
const route = useRoute()
const router = useRouter()
HelpView.value = defineAsyncComponent(() => import("./" + componentNameHelp.value))
watch(() => props.componentName, () => HelpView.value = defineAsyncComponent(() => import("./" + componentNameHelp.value)))
</script>

<template>
    <main>
        <template v-if="!isFrameMode()">
            <a href="#" @click.prevent="router.go(-1)">Back to previous component</a>
            <h1>{{ componentDescription[props.componentName]?.headline }}</h1>
            <p>{{ componentDescription[props.componentName]?.shorttext }}</p>
        </template>
        <div class="flex-container vertical">
           <div>
               <div v-if="isFrameMode()" id="frameComponentTarget"></div>
               <HelpView :activeTab="props.activeTab" />
           </div>
            <template v-if="!isFrameMode()">
                <hr />
                <div class="flex-container" id="component-link-wrapper">
                    <router-link :to="{name: previousComponentName, params: {tab: route.params.tab}}">
                        <span class="icon-single-arrow-left"></span>
                        <span>{{ previousComponentName }}</span>
                    </router-link>
                    <router-link :to="{name: nextComponentName, params: {tab: route.params.tab}}">
                        <span>{{ nextComponentName }}</span>
                        <span class="icon-single-arrow-right"></span>
                    </router-link>
                </div>
            </template>
        </div>
        <footer></footer>
    </main>
</template>

<style lang="scss">
#component-link-wrapper {
    margin-top: auto;
    justify-content: space-between;

    a {
        flex: none;
        display: flex;
        align-items: center;

        span[class*="icon"] {
            font-size: 1.2rem;
            text-decoration: none;
        }
    }
}
</style>

