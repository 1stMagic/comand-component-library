<template>
    <div class="cmd-switch-language">
        <ul>
            <li v-for="(language, index) in languages" :key="index">
                <router-link v-if="language.link.type === 'router'" :class="['flag', language.iso2]" :to="getRoute(language)" :title="language.tooltip" @click.native="$emit('click', $event, language)">
                    <img :src="getFlagURL(language.iso2)" :alt="language.name" />
                </router-link>
                <a v-else :href="language.link.path" :class="['flag', language.iso2, {'active': language.active}]" :title="language.tooltip" @click="$emit('click', $event, language)">
                    <img :src="getFlagURL(language.iso2)" :alt="language.name" />
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    import { getRoute } from '@/utilities.js'

    export default {
        name: "CmdSwitchLanguage",
        props: {
            languages: {
                type: Array,
                required: true
            }
        },
        methods: {
            getRoute (language) {
              return getRoute(language)
            },
            switchLanguage(iso2) {
                alert("Switch to " + iso2)
            },
            getFlagURL(isoCode) {
                return require("@/assets/images/flags/flag-" + isoCode + ".svg")
            }
        }
    }
</script>

<style lang="scss">
/* begin cmd-switch-language --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-switch-language {
    ul {
        display: flex;
        margin: 0;

        li {
            list-style-type: none;
            margin: 0;

            a {
                &:hover, &:active, &:focus, &.active {
                    box-shadow: var(--box-shadow);
                }
            }
        }
    }
}
/* end cmd-switch-language --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>