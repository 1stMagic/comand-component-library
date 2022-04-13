<script setup>
// import functions
import {defineProps, defineAsyncComponent, computed, ref} from "vue"
import {useRoute, useRouter} from "vue-router"
import {isFrameMode} from "../../utils/common"
import {useScrollspy} from "../../composables/scrollspy"

// import components
import CmdListOfLinks from "../../components/CmdListOfLinks"

// import data
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
const iconToggleSidebar = computed(() => showPageAnchors.value ? "icon-double-arrow-right" : "icon-double-arrow-left")

const route = useRoute()
const router = useRouter()
const scrollSpy = useScrollspy(() => examples.value.querySelectorAll(".example-section"))
const examples = ref(null)
const listOfLinks = ref([])
const showPageAnchors = ref(true)

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
        <aside class="flex-container no-gap" id="page-anchors">
            <a href="#" @click.prevent="showPageAnchors = !showPageAnchors" title="Toggle Iterations-Sidebar">
                <span :class="iconToggleSidebar"></span>
            </a>
            <transition v-show="showPageAnchors" name="slide-right">
                <CmdListOfLinks
                    v-if="listOfLinks.length > 1"
                    :cmdCustomHeadline="{headlineText: 'Iterations', headlineLevel: 6}"
                    :sectionAnchors="true"
                    :activeSection="scrollSpy.activeItem"
                    :links="listOfLinks"

                />
            </transition>
        </aside>
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

<style lang="scss">
main {
    #page-anchors {
        position: fixed;
        right: 0;
        z-index: 100;
        background: var(--pure-white);
        border: var(--default-border);
        border-right: 0;
        top: var(--default-margin);
        box-shadow: -.2rem .2rem .4rem #999;

        > a {
            flex: none;
            display: flex;
            align-items: center;
            text-decoration: none;
            padding: .2rem;
            border-right: var(--default-border);

            span[class*="icon"] {
                font-size: 1rem;
            }

            &:hover, &:active, &:focus {
                background: var(--primary-color);

                span[class*="icon"] {
                    color: var(--pure-white);
                }
            }
        }

        .cmd-custom-headline {
            margin: 0;
            padding: var(--default-padding);
        }

        ul {
            gap: 0;
            margin: 0;

            li {
                transition: var(--default-transition);

                a {
                    display: block;
                    padding: calc(var(--default-padding) / 2);
                    transition: var(--default-transition);
                    font-size: 1.2rem;
                }

                &.active {
                    background: var(--primary-color);
                    transition: var(--default-transition);
                    color: var(--pure-white);

                    a {
                        span, span[class*="icon"] {
                            color: var(--pure-white);
                            transition: var(--default-transition);
                        }
                    }

                }
            }
        }
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

