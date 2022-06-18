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
        this.toggleColorScheme()

        window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", this.onColorSchemeChange)

        /* observe if class changes in html-tag */
        const htmlTag = document.querySelector("html")
        this.$_observer = new MutationObserver(this.observeDom)
        this.$_observer.observe(htmlTag, {attributes: true})
    },
    beforeUnmount() {
        window.matchMedia("(prefers-color-scheme: light)").removeEventListener("change", this.onColorSchemeChange)
        this.$_observer.disconnect()
    },
    methods: {
        onColorSchemeChange(event) {
            this.prefersColorScheme = event.matches ? "light" : "dark"
        },
        observeDom(mutationList) {
            for(let i = 0; i < mutationList.length; i++) {
                if(mutationList[i].type === 'attributes') {
                    this.toggleColorScheme()
                    break
                }
            }
        },
        getRoute(language) {
            return getRoute(language)
        },
        toggleColorScheme() {
            if (document.querySelector("html").classList.contains("light-mode")) {
                this.prefersColorScheme = "light"
            } else if(document.querySelector("html").classList.contains("dark-mode")) {
                this.prefersColorScheme = "dark"
            } else if (matchMedia("(prefers-color-scheme: light)").matches) {
                this.prefersColorScheme = "light"
            } else {
                this.prefersColorScheme = "dark"
            }
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