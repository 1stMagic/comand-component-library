<template>
    <div class="cmd-switch-language">
        <ul>
            <li v-for="(language, index) in languages" :key="index">
                <!-- begin link-type 'href' -->
                <a v-if="language.link.type === 'href'" :href="language.link.path"
                   :class="['flag', language.iso2, {'active': activeLanguage(language)}]"
                   :title="language.tooltip"
                   @click="$emit('click', { originalEvent: $event, language} )">
                    <img :src="imageSources[index]" :alt="language.name" />
                </a>
                <!-- end link-type 'href' -->

                <!-- begin link-type 'router' -->
                <router-link v-else
                     :class="['flag', language.iso2]"
                     :to="getRoute(language)" :title="language.tooltip"
                     @click="$emit('click', { originalEvent: $event, language})">
                    <img :src="imageSources[index]" :alt="language.name" />
                </router-link>
                <!-- end link-type 'router' -->
            </li>
        </ul>
    </div>
</template>

<script>
import {getRoute} from '../utilities.js'
import * as flags from "../assets/images/flags"
export default {
    name: "CmdSwitchLanguage",
    emits: ["click"],
    data() {
        return {
            imageSources: []
        }
    },
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
        activeLanguage(language) {
            return language.active
        }
    },
    watch: {
        languages: {
            handler() {
                this.imageSources = []
                this.languages.forEach(
                    async (item) => {
                        // get iso-code
                        const isoCode = item.iso2

                        // get path of current flag
                       // const path = "../assets/images/flags/flag-" + isoCode + ".svg"

                        // assign value of imported file (returns object with default-key)
                        //const { default: dynamicImage } = await import(/* @vite-ignore */ path)

                        // push image to data-property-array
                      //  this.imageSources.push(dynamicImage)
                        this.imageSources.push(flags[isoCode].default)
                    }
                )
            },
            immediate: true,
            deep: true
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