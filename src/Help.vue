<template>
    <nav class="flex-container">
        <ul>
            <li v-for="componentName in componentNames" :key="componentName">
                <router-link :to="{name: componentName}">{{ componentNameText(componentName) }}</router-link>
            </li>
        </ul>
    </nav>
    <router-view></router-view>
</template>

<script>
import componentsDescription from "./documentation/data/componentsDescription.json"
export default {
    computed: {
            componentNames() {
                return Object.keys(componentsDescription)
            }
    },
    methods: {
        componentNameText(componentName) {
            return componentName.replace("Cmd", "")
        }
    }
}
</script>
