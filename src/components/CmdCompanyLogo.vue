<template>
    <div class="cmd-company-logo">
        <router-link v-if="link.type === 'router'" :href="link.path" :title="link.tooltip">
            <img :src="pathCurrentLogo" :alt="altText"/>
        </router-link>
        <a v-else :to="link.path" :title="link.tooltip">
            <img :src="pathCurrentLogo" :alt="altText"/>
        </a>
    </div>
</template>

<script>
import {getRoute} from "../utilities.js"

export default {
    name: "CmdLogo",
    data() {
        return {
            prefersColorScheme: ""
        }
    },
    props: {
        /**
         * link for company logo (i.e. to homepage)
         */
        link: {
            type: Object,
            required: false
        },
        /**
         * path to (default) logo-file
         */
        pathDefaultLogo: {
            type: String,
            required: true
        },
        /**
         * path to dark-mode logo-file
         */
        pathDarkmodeLogo: {
            type: String,
            required: false
        },
        /**
         * alternative text for image
         *
         * @requiredForAccessibility: true
         */
        altText: {
            type: String,
            required: true /* w3c requirements */
        }
    },
    computed: {
        pathCurrentLogo() {
            if (this.prefersColorScheme === "light" || !this.pathDarkmodeLogo) {
                return this.pathDefaultLogo
            }
            return this.pathDarkmodeLogo
        }
    },
    created() {
        if (matchMedia("(prefers-color-scheme: light)").matches || document.querySelector("html").classList.contains("light-mode")) {
            this.prefersColorScheme = "light"
        } else {
            this.prefersColorScheme = "dark"
        }

        window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", e => {
            this.prefersColorScheme = e.matches ? "light" : "dark"
        });
    },
    methods: {
        getRoute(language) {
            return getRoute(language)
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-company-logo ---------------------------------------------------------------------------------------- */
@import '../assets/styles/variables';

.cmd-company-logo {
    > a {
        display: block;

        img {
            border: 0;
            max-height: 15rem;
        }

        @media only screen and (max-width: $medium-max-width) {
            img {
                max-width: 100%;
                max-height: none;
            }
        }
    }
}

/* end cmd-company-logo ------------------------------------------------------------------------------------------ */
</style>