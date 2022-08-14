<template>
    <div class="cmd-switch-language">
        <ul>
            <li v-for="(language, index) in languages" :key="index">
                <!-- begin link-type 'href' -->
                <a v-if="language.link.type === 'href'" :href="language.link.path"
                   :class="['flag', language.iso2, {'active': activeLanguage(language)}]"
                   :title="language.tooltip"
                   @click="$emit('click', { originalEvent:  $event, language} )">
                    <img :src="getFlagURL(language.iso2)" :alt="language.name" />
                </a>
                <!-- end link-type 'href' -->

                <!-- begin link-type 'router' -->
                <router-link v-else
                     :class="['flag', language.iso2]"
                     :to="getRoute(language)" :title="language.tooltip"
                     @click="$emit('click', { originalEvent:  $event, language})">
                    <img :src="getFlagURL(language.iso2)" :alt="language.name" />
                </router-link>
                <!-- end link-type 'router' -->
            </li>
        </ul>
    </div>
</template>

<script>
import {getRoute} from '../utilities.js'

export default {
    name: "CmdSwitchLanguage",
    emits: ["click"],
    props: {
        /**
         * list of languages
         */
        languages: {
            type: Array,
            required: true
        }
    },
    methods: {
        getRoute(language) {
            return getRoute(language)
        },
        getFlagURL(isoCode) {
            return require("../assets/images/flags/flag-" + isoCode + ".svg")
        },
        activeLanguage(language) {
            return language.active
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-switch-language ---------------------------------------------------------------------------------------- */
.cmd-switch-language {
    ul {
        display: flex;
        gap: calc(var(--default-gap) / 2);
        margin: 0;

        li {
            list-style-type: none;
            margin: 0;

            a:not([class*="active"]) {
                filter: contrast(.5);

                &:hover, &:focus, &:active {
                    filter: none;
                }
            }
        }
    }
}

/* end cmd-switch-language ------------------------------------------------------------------------------------------ */
</style>