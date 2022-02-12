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
            <div class="flex-container no-flex space-between">
                <router-link :to="{name: previousComponentName, params: {tab: route.params.tab}}">{{ previousComponentName }}</router-link>
                <router-link :to="{name: nextComponentName, params: {tab: route.params.tab}}">{{ nextComponentName }}</router-link>
            </div>
        </div>
        <footer></footer>
    </main>
</template>
