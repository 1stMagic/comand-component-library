<template>
    <div class="cmd-footer-navigation">
        <h4 v-if="headline">{{ headline }}</h4>
        <template v-for="(entry, index) in footerNavigation">
            <li :key="index">
                <router-link v-if="entry.link.type === 'router'" :to="getRoute(entry)">{{ entry.name }}</router-link>
                <a v-else :href="entry.link.path" :target="entry.link.target" @click="executeLink(entry, $event)">{{ entry.name }}</a>
            </li>
        </template>
    </div>
</template>

<script>
import { getRoute } from '@/utilities.js'
import { openFancyBox } from '@/components/CmdFancyBox.vue'

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
    li {
        list-style: none;
        margin-bottom: var(--default-margin);

        &:last-child {
            margin-bottom: 0;
        }
    }
}
/* end cmd-footer-navigation --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>