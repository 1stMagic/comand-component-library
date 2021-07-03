<template>
    <div class="cmd-logo">
        <a href="./" :title="tooltip">
            <img :src="pathCurrentLogo" :alt="altText" />
        </a>
    </div>
</template>

<script>
export default {
    name: "CmdLogo",
    data () {
        return {
            prefersColorScheme: ""
        }
    },
    props: {
        tooltip: {
            type: String,
            required: false
        },
        pathDefaultLogo: {
            type: String,
            required: true
        },
        pathDarkmodeLogo: {
            type: String,
            required: false
        },
        altText: {
            type: String,
            required: true /* w3c requirements */
        }
    },
    computed: {
        pathCurrentLogo () {
            if(this.prefersColorScheme === 'light' || !this.pathDarkmodeLogo) {
                return this.pathDefaultLogo
            }
            return this.pathDarkmodeLogo
        }
    },
    created() {
        if(matchMedia('(prefers-color-scheme: light)').matches) {
            this.prefersColorScheme = "light"
        } else {
            this.prefersColorScheme = "dark"
        }

        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
            this.prefersColorScheme = e.matches ? "light" : "dark"
        });
    }
}
</script>

<style lang="scss">
/* begin cmd-logo --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-logo {
    > a {
        display: block;

        img {
            border: 0;
            max-height: 15rem;
        }

        @media only screen and (max-width: 1023px) {
            img {
                max-width: 100%;
                max-height: none;
            }
        }
    }
}
/* end cmd-logo --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>