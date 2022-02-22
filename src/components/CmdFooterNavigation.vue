<template>
    <div class="cmd-footer-navigation">
        <!-- begin headline -->
        <CmdCustomHeadline v-if="cmdCustomHeadline" :headline="cmdCustomHeadline" />
        <!-- end headline -->

        <ul class="flex-container">
            <li v-for="(link, index) in footerNavigation" :key="index">
                <router-link v-if="link.type === 'router'" :to="getRoute(link)" :title="link.tooltip">
                    <span v-if="link.iconClass" :class="link.iconClass"></span>
                    <span v-if="link.linkName">{{ link.linkName }}</span>
                </router-link>
                <a v-else :href="link.path" :target="link.target" @click="executeLink(link, $event)"
                   :title="link.tooltip">
                    <span v-if="link.iconClass" :class="link.iconClass"></span>
                    <span v-if="link.linkName">{{ link.linkName }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import {getRoute} from "../utilities.js"
import {openFancyBox} from "./CmdFancyBox.vue"

export default {
    name: "CmdFooterNavigation",
    props: {
        /**
         * properties for cmdCustomHeadline-component
         */
        cmdCustomHeadline: {
            type: Object,
            required: false
        },
        /**
         * list of links shown vertically
         */
        footerNavigation: {
            type: Array,
            required: false
        }
    },
    methods: {
        getRoute(language) {
            return getRoute(language)
        },
        executeLink(link, event) {
            if (link.fancybox) {
                event.preventDefault()
                openFancyBox({url: link.link.path})
            }
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-footer-navigation ---------------------------------------------------------------------------------------- */
.cmd-footer-navigation {
    ul {
        flex-direction: column;
        gap: calc(var(--default-gap) / 2);

        li {
            list-style: none;
            margin-left: 0;
        }
    }
}

/* end cmd-footer-navigation ------------------------------------------------------------------------------------------ */
</style>