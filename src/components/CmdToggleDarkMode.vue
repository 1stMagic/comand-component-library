<template>
    <div :class="['cmd-toggle-dark-mode', {'dark-mode': darkMode}]">
        <CmdFormElement
            element="input"
            type="checkbox"
            :labelText="labelText"
            :showLabel="showLabel"
            v-model="darkMode"
            :toggle-switch="true"
        />
    </div>
</template>

<script>
import CmdFormElement from "./CmdFormElement"

export default {
    name: "ToggleDarkMode",
    components: {
        CmdFormElement
    },
    data() {
        return {
            darkMode: false,
            labelText: "Light mode activated"
        }
    },
    props: {
        showLabel: {
            type: Boolean,
            default: false
        }
    },
    created() {
        // get color-scheme (light-/dark-mode) from browser-settings
        // this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        // document.body.classList.add(this.darkMode ? 'dark-mode' : 'light-mode');

        const mql = window.matchMedia('(prefers-color-scheme: dark)')
        mql.addEventListener("change", this.onColorSchemeChange)
        this.onColorSchemeChange(mql)
    },
    beforeUnmount() {
        window.matchMedia('(prefers-color-scheme: dark)').removeEventListener("change", this.onColorSchemeChange)
    },
    methods: {
        onColorSchemeChange(event) {
            this.darkMode = event.matches
            document.querySelector('html').classList.add(this.darkMode ? 'dark-mode' : 'light-mode')
        }
    },
    watch: {
        darkMode() {
            // toggle classes to overwrite media-query styles for color-schemes
            const htmlTag = document.querySelector('html')
            if(this.darkMode) {
                htmlTag.classList.replace("light-mode", "dark-mode");
                this.labelText = "Dark-Mode enabled"
            } else {
                htmlTag.classList.replace("dark-mode", "light-mode");
                this.labelText = "Light-Mode enabled"
            }
            htmlTag.dispatchEvent(new CustomEvent('toggle-color-scheme', { detail: this.darkMode ? 'dark-mode' : 'light-mode' }))
        }
    }
}
</script>

<style lang="scss">
.cmd-toggle-dark-mode {
    .cmd-form-element {
        input {
            --dark-blue: hsl(195, 96%, 45%);
            --medium-blue: hsl(194, 97%, 39%);
            --light-blue: hsl(195, 97%, 76%);
            background: linear-gradient(to bottom, var(--dark-blue) 0%,var(--light-blue) 67%);
            border-color: var(--medium-blue);

            &:after {
                --yellow-hue: 60;
                --yellow-saturation: 100%;
                --yellow-lightness: 76.7%;
                background: radial-gradient(ellipse at center, var(--pure-white) 20%, hsl(var(--yellow-hue), var(--yellow-saturation), var(--yellow-lightness)) 30%, hsla(var(--yellow-hue), var(--yellow-saturation), var(--yellow-lightness),0) 100%);
                border-color: transparent;
                box-shadow: 0 0 1rem hsl(var(--yellow-hue), var(--yellow-saturation), var(--yellow-lightness));
            }
        }
    }

    &.dark-mode {
        input {
            background: var(--color-scheme-background-color);
            border-color: var(--color-scheme-text-color);

            &:before {
                --size: 1.2rem;
                content: "";
                width: var(--size);
                aspect-ratio: 1/1;
                background: var(--color-scheme-background-color);
                border-radius: var(--full-circle);
                position: absolute;
                top: 0;
                right: calc(var(--size) / 2);
                transform: translateY(calc(50% - 35%));
                z-index: 100;
            }

            &:after {
                background: radial-gradient(ellipse at center,  var(--pure-white) 50%,var(--medium-gray) 100%);
                border-color: transparent;
                box-shadow: .2rem .1rem .2rem hsla(var(--pure-white-hue), var(--pure-white-saturation), var(--pure-white-lightness), .3);
            }
        }

        .label-text {
            span {
                color: var(--color-scheme-text-color);
            }
        }
    }
}
</style>