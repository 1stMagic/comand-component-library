<template>
    <div id="documentation">
        <div v-if="!isFrameMode()" class="nav-wrapper">
            <CmdFormElement
                element="input"
                type="search"
                id="component-search"
                labelText="Search components"
                placeholder="Search components"
                :showLabel="false"
                :showSearchButton="false"
                fieldIconClass="icon-search"
                v-model="filterComponents"
            />
            <CmdSystemMessage
                v-if="!componentNames.length"
                validationStatus="warning"
                :systemMessage="'Cannot find component name including &quot;' + filterComponents + '&quot;'"
            />
            <nav class="flex-container">
                <template v-for="startingLetter in startingLetters" :key="startingLetter">
                    <h4>{{ startingLetter }}</h4>
                    <ul>
                        <li v-for="componentName in componentNamesWithStartingLetter(startingLetter)" :key="componentName">
                            <router-link :to="{name: componentName}">{{ componentNameText(componentName) }}</router-link>
                        </li>
                    </ul>
                </template>
            </nav>
        </div>
        <router-view></router-view>
        <CmdBackToTopButton/>
    </div>
</template>

<script>
// import functions
import {isFrameMode} from "./utils/common"

// import components
import CmdBackToTopButton from "./components/CmdBackToTopButton"
import CmdFormElement from "./components/CmdFormElement"
import CmdSystemMessage from "./components/CmdSystemMessage"

// import list of components
import componentsDescription from "./documentation/data/componentsDescription.json"

export default {
    components: {
        CmdBackToTopButton,
        CmdFormElement,
        CmdSystemMessage
    },
    data() {
        return {
            filterComponents: ""
        }
    },
    computed: {
        componentNames() {
            const filterTerm = this.filterComponents.trim().toLowerCase()

            if(filterTerm) {
                return Object.keys(componentsDescription).filter((componentName) => {
                    return componentName.toLowerCase().includes(filterTerm)
                })
            }
            return Object.keys(componentsDescription)
        },
        startingLetters() {
            const startingLetters = []
            for (let i = 0; i < this.componentNames.length; i++) {
                const componentStartingLetter = this.getComponentStartingLetter(this.componentNames[i])
                if (!startingLetters.includes(componentStartingLetter)) {
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
            for (let i = 0; i < this.componentNames.length; i++) {
                const componentStartingLetter = this.getComponentStartingLetter(this.componentNames[i])

                if (startingLetter === componentStartingLetter) {
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
#responsive-view {
    resize: vertical;
}

#documentation {
    display: flex;

    .nav-wrapper {
        background: var(--default-background-color);
        flex: none;
        border-right: var(--default-border);
        box-shadow: .2rem 0 .4rem #999;

        nav {
            width: auto;
            flex-direction: column;
            gap: 0;
            padding: var(--default-padding) 0;

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

                    a.router-link-active {
                        background: var(--primary-color);
                        color: var(--pure-white);
                    }
                }
            }
        }
    }

    main {
        width: 100%;
        padding: calc(var(--default-padding) * 2);
    }
}
</style>
