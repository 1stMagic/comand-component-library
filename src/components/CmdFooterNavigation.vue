<template>
    <div class="cmd-footer-navigation">
        <h4 v-if="headline">{{ headline }}</h4>
        <ul class="flex-container">
            <li v-for="(entry, index) in footerNavigation" :key="index">
                <router-link v-if="entry.type === 'router'" :to="getRoute(entry)">
                    <span v-if="entry.iconClass" :class="entry.iconClass"></span>
                    <span v-if="entry.linkName">{{ entry.linkName }}</span>
                </router-link>
                <a v-else :href="entry.path" :target="entry.target" @click="executeLink(entry, $event)">
                    <span v-if="entry.iconClass" :class="entry.iconClass"></span>
                    <span v-if="entry.linkName">{{ entry.linkName }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { getRoute } from "../utilities.js"
import { openFancyBox } from "./CmdFancyBox.vue"

export default {
    name: "CmdFooterNavigation",
    props: {
        headline: {
            type: String,
            required: false
        },
        footerNavigation: {
            type: Array,
            required: false
        }
    },
    methods: {
        getRoute (language) {
            return getRoute(language)
        },
        executeLink (entry, event) {
            if(entry.fancybox) {
                event.preventDefault()
                openFancyBox({url: entry.link.path})
            }
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-footer-navigation --------------------------------------------------------------------------------------------------------------------------------------------------- */
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
/* end cmd-footer-navigation --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>