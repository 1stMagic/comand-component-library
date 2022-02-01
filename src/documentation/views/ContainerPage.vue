<template>
    <main>
        <h1>{{ componentDescription[componentName]?.headline }}</h1>
        <p>{{ componentDescription[componentName]?.shorttext }}</p>
        <div class="flex-container">
           <div>
               <component :is="componentNameHelp" />
           </div>
        </div>
        <footer></footer>
    </main>
</template>

<script>
import componentDescription from "../data/componentsDescription.json"
import CmdAccordionHelp from "./CmdAccordionHelp"

export default {
    name: "ContainerPage",
    components: {
        CmdAccordionHelp
    },
    data() {
        return {
            componentDescription
        }
    },
    props: {
       componentName: {
           type: String,
           required: true
       }
    },
    computed: {
        componentNameHelp() {
            return this.componentName + "Help"
        }
    }
}
</script>