<template>
    <div id="documentation">
        <nav v-if="!isFrameMode()" class="flex-container">
            <template v-for="startingLetter in startingLetters" :key="startingLetter">
                <h4>{{ startingLetter }}</h4>
                <ul>
                    <li v-for="componentName in componentNamesWithStartingLetter(startingLetter)" :key="componentName">
                        <router-link :to="{name: componentName}">{{ componentNameText(componentName) }}</router-link>
                    </li>
                </ul>
            </template>
        </nav>
        <router-view></router-view>
        <CmdBackToTopButton />
    </div>
</template>

<script>
import componentsDescription from "./documentation/data/componentsDescription.json"
import CmdBackToTopButton from "./components/CmdBackToTopButton"
import {isFrameMode} from "./utils/common"

export default {
    components: {CmdBackToTopButton},
    computed: {
        componentNames() {
            return Object.keys(componentsDescription)
        },
        startingLetters() {
            const startingLetters = []
            for(let i = 0 ; i < this.componentNames.length ; i++) {
                const componentStartingLetter = this.getComponentStartingLetter(this.componentNames[i])
                if(!startingLetters.includes(componentStartingLetter)) {
                    startingLetters.push(componentStartingLetter)
                }
            }
            return startingLetters.sort()
        }
    },
    methods: {
        isFrameMode() {
            return isFrameMode()
        },
        componentNameText(componentName) {
            return componentName.replace("Cmd", "")
        },
        componentNamesWithStartingLetter(startingLetter) {
            const components = []
            for(let i = 0 ; i < this.componentNames.length ; i++) {
                const componentStartingLetter = this.getComponentStartingLetter(this.componentNames[i])

                if(startingLetter === componentStartingLetter) {
                    components.push(this.componentNames[i])
                }
            }
            return components.sort()
        },
        getComponentStartingLetter(componentName) {
            return this.componentNameText(componentName).slice(0, 1)
        }
    }
}
</script>

<style lang="scss">
#documentation {
    display: flex;

    > nav  {
        flex: none;
        width: auto;
        flex-direction: column;
        gap: 0;
        padding: var(--default-padding) 0;
        background: var(--default-background-color);
        border-right: var(--default-border);
        box-shadow: .2rem 0 .4rem #999;

        h4 {
            padding-left: var(--default-padding);
            margin-bottom: 0;
        }

        ul {
            flex-direction: column;
            border: 0;
            background: none;
            border-top: var(--border-color);

            li {
                border: 0;
                border-bottom: var(--default-border);
            }
        }
    }

    main {
        width: 100%;
        padding: calc(var(--default-padding) * 2);
    }
}
</style>
