<template>
    <div :class="['cmd-list-of-links', 'align-' + align, {box: styleAsBox, horizontal: orientation === 'horizontal', 'section-anchors': sectionAnchors}]">
        <!-- begin CmdHeadline -->
        <CmdHeadline v-if="CmdHeadline"
                           v-bind="CmdHeadline" />
        <!-- end CmdHeadline -->

        <!-- begin list of links -->
        <ul :class="['flex-container', {'no-gap': !useGap}]">
            <li v-for="(link, index) in links" :key="index" :class="{'active': sectionAnchors && activeSection === index}">
                <!-- begin use href -->
                <a v-if="link.type === 'href' || link.type === undefined"
                   :href="link.path"
                   :target="link.target"
                   @click="executeLink(link, $event)"
                   :title="link.tooltip && link.tooltip !== undefined ? link.tooltip : undefined">
                    <span v-if="link.iconClass" :class="link.iconClass"></span>
                    <span v-if="link.text">{{ link.text }}</span>
                </a>
                <!-- end use href --->

                <!-- begin use router-link -->
                <router-link v-else-if="link.type === 'router'"
                             :to="getRoute(link)"
                             :title="link.tooltip">
                    <span v-if="link.iconClass" :class="link.iconClass"></span>
                    <span v-if="link.text">{{ link.text }}</span>
                </router-link>
                <!-- end use router-link -->
            </li>
        </ul>
        <!-- end list of links -->
    </div>
</template>

<script>
// import functions
import {getRoute} from "../utilities.js"
import {openFancyBox} from "./CmdFancyBox.vue"

// import components
import CmdHeadline from "./CmdHeadline"

export default {
    name: "CmdListOfLinks",
    components: {
        CmdHeadline
    },
    props: {
        /**
         * activate if component should contain a list of anchors for the section within th page
         */
        sectionAnchors: {
            type: Boolean,
            default: false
        },
        /**
         * given active section from outside to set class for styling
         *
         * sectionAnchors-property must be activated
         */
        activeSection: {
            type: Number,
            default: 0
        },
        /**
         * set horizontal alignment
         *
         * orientation-property must be set to 'horizontal'
         *
         * @allowedValues: left, center, right
         */
        align: {
            type: String,
            default: "left"
        },
        /**
         * properties for CmdHeadline-component
         */
        CmdHeadline: {
            type: Object,
            required: false
        },
        /**
         * list of displayed links
         */
        links: {
            type: Array,
            required: false
        },
        /**
         * toggle orientation of list
         *
         * @allowedValues: horizontal, vertical
         */
        orientation: {
            type: String,
            default: "vertical"
        },
        /**
         * toggle gab between links
         */
        useGap: {
            type: Boolean,
            default: true
        },
        /**
         * style component like a box
         *
         * @affectsStyling: true
         */
        styleAsBox: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        getRoute(link) {
            return getRoute(link)
        },
        executeLink(link, event) {
            if (link.fancybox) {
                event.preventDefault()
                openFancyBox({url: link.path})
            }
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-list-of-links ---------------------------------------------------------------------------------------- */
.cmd-list-of-links {
    display: flex;
    flex-direction: column;

    ul {
        flex-direction: column;
        gap: calc(var(--default-gap) / 2);
        margin: 0;

        li {
            list-style: none;
            margin-left: 0;
        }
    }

    &.horizontal {
        flex-direction: row;

        ul {
            gap: var(--default-gap);
            flex-direction: row;

            > li {
                flex: none;
                display: flex;
            }
        }

        &.align-center {
            justify-content: center;
        }

        &.align-right {
            justify-content: flex-end;
        }
    }
}
/* end cmd-list-of-links------------------------------------------------------------------------------------------ */
</style>