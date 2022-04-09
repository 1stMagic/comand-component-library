<script setup>
import {defineProps, defineAsyncComponent, computed, ref} from "vue"
import {useRoute, useRouter} from "vue-router"
import {isFrameMode} from "../../utils/common"
import {useScrollspy} from "../../composables/scrollspy"
import componentDescription from "../data/componentsDescription"
import CmdListOfLinks from "../../components/CmdListOfLinks"

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
const idMainContainer = computed(() => {
    if(isFrameMode()) {
        return props.componentName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
    }
    return null
})
const HelpView = computed(
    () => componentNameHelp.value
        ? defineAsyncComponent(() => import("./" + componentNameHelp.value))
        : {render: () => ""}
)

const route = useRoute()
const router = useRouter()
const scrollSpy = useScrollspy(() => examples.value.querySelectorAll(".example-section"))
const examples = ref(null)
const listOfLinks = ref([])

function getAnchorId(sectionSelector) {
    return "#" + sectionSelector.querySelector(".pre-headline-text")
        ?.innerText
        .replace(/[# ]/g, "")
        .toLowerCase()
}

function getHeadlineText(sectionSelector) {
    if (sectionSelector.classList.contains("has-pre-headline-text")) {
        return sectionSelector.querySelector(".pre-headline-text + *")?.innerText
    }
    return sectionSelector.querySelector("*:first-child")?.innerText
}

function onViewResolve() {
    scrollSpy.reset()
    listOfLinks.value = []
    const sectionSelector = examples.value.querySelectorAll(".example-section > .cmd-custom-headline")
    for (let i = 0 ; i < sectionSelector.length; i++) {
        listOfLinks.value.push({
            text: getHeadlineText(sectionSelector.item(i)),
            path: getAnchorId(sectionSelector.item(i))
        })
    }
}
</script>

<template>
    <main :id="idMainContainer">
        <CmdListOfLinks v-if="listOfLinks.length > 1" :sectionAnchors="true" :activeSection="scrollSpy.activeItem" :links="listOfLinks" />
        <template v-if="!isFrameMode()">
            <a href="#" @click.prevent="router.go(-1)">
                <span class="icon-single-arrow-left"></span>
                <span>Back to previous component</span>
            </a>
            <h1>{{ componentDescription[props.componentName]?.headline }}</h1>
            <p>{{ componentDescription[props.componentName]?.shorttext }}</p>
        </template>
        <div class="flex-container vertical">
           <section id="tabs-wrapper" ref="examples">
               <div v-show="isFrameMode()" id="frame-component-target"></div>
               <Suspense @resolve="onViewResolve">
                   <HelpView />
               </Suspense>
           </section>
            <template v-if="!isFrameMode()">
                <section class="flex-container" id="component-link-wrapper">
                    <router-link :to="{name: previousComponentName, params: {tab: route.params.tab}}">
                        <span class="icon-single-arrow-left"></span>
                        <span>{{ previousComponentName }}</span>
                    </router-link>
                    <router-link :to="{name: nextComponentName, params: {tab: route.params.tab}}">
                        <span>{{ nextComponentName }}</span>
                        <span class="icon-single-arrow-right"></span>
                    </router-link>
                </section>
            </template>
        </div>
        <footer></footer>
    </main>
</template>

<style lang="scss" scoped>
main {
    > .cmd-list-of-links:first-child {
        position: fixed;
        right: 0;
        z-index: 100;
        background: white;
    }
}

#tabs-wrapper {
    > .cmd-tabs {
        > ul > li {
            border: 0;
            border-bottom: var(--default-border);
            font-weight: bold;

            &:first-child {
                border-right: var(--default-border);
            }

            &.active {
                top: 0;
            }
        }

        > div {
            border: 0;
            border-bottom: var(--default-border);
            padding: calc(var(--default-padding) * 2)
        }
    }
}

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

