<script setup>
import {defineProps, defineAsyncComponent, computed, watch, shallowRef} from "vue"
import {useRoute} from "vue-router"
import componentDescription from "../data/componentsDescription.json"
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
HelpView.value = defineAsyncComponent(() => import("./" + componentNameHelp.value))
watch(() => props.componentName, () => HelpView.value = defineAsyncComponent(() => import("./" + componentNameHelp.value)))
</script>

<template>
    <main>
        <h1>{{ componentDescription[props.componentName]?.headline }}</h1>
        <p>{{ componentDescription[props.componentName]?.shorttext }}</p>
        <div class="flex-container vertical">
           <div>
               <HelpView :activeTab="props.activeTab" />
           </div>
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

