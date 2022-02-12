<script setup>
import {defineProps, defineAsyncComponent, computed, watch, shallowRef} from "vue"
import componentDescription from "../data/componentsDescription.json"
const props = defineProps({
    componentName: {
        type: String,
        required: true
    }
})
const componentNameHelp = computed(() => props.componentName + "Help")
const HelpView = shallowRef(null)
HelpView.value = defineAsyncComponent(() => import("./" + componentNameHelp.value))
watch(() => props.componentName, () => HelpView.value = defineAsyncComponent(() => import("./" + componentNameHelp.value)))
</script>

<template>
    <main>
        <h1>{{ componentDescription[props.componentName]?.headline }}</h1>
        <p>{{ componentDescription[props.componentName]?.shorttext }}</p>
        <div class="flex-container">
           <div>
               <HelpView />
           </div>
        </div>
        <footer></footer>
    </main>
</template>
