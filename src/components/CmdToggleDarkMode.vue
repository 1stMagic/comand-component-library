<template>
    <div :class="['cmd-toggle-dark-mode', {'styled-layout': useStyledLayout, 'dark-mode': darkMode}]">
        <!-- begin button-style -->
        <a v-if="styledAsButton"
           href="#"
           :class="['button', {'dark-mode': darkMode}]"
           @click.prevent="toggleColorScheme"
        >
            <span v-if="showLabel">{{ labelText }}</span>
            <!-- begin CmdIcon -->
            <CmdIcon
                :iconClass="iconClass"
                :type="iconType"
                :tooltip="!showLabel ? labelText: ''"
            />
            <!-- end CmdIcon -->
        </a>
        <!-- end button-style -->

        <!-- begin CmdFormElement -->
        <CmdFormElement
            v-else
            element="input"
            type="checkbox"
            :labelText="labelText"
            :showLabel="showLabel"
            v-model="darkMode"
            :toggle-switch="true"
            :title="!showLabel ? labelText: ''"
            @update:modelValue="setColorScheme"
        />
        <!-- end CmdFormElement -->
    </div>
</template>

<script>
export default {
    name: "ToggleDarkMode",
    data() {
        return {
            darkMode: false
        }
    },
    props: {
        /**
         * activate if toggle-switch should be replaced by a button
         *
         * @affectsStyling: true
         */
        styledAsButton: {
            type: Boolean,
            default: false
        },
        /**
         * icon for dark-mode icon if button-style is used
         *
         * (styledAsButton-property must be activated)
         */
        iconDarkMode: {
            default() {
                return {
                    iconClass: "icon-home",
                    iconType: "auto"
                }
            }
        },
        /**
         * icon for light-mode icon if button-style is used
         *
         * (styledAsButton-property must be activated)
         */
        iconLightMode: {
            default() {
                return {
                    iconClass: "icon-globe",
                    iconType: "auto"
                }
            }
        },
        /**
         * toggle visibility of label
         */
        showLabel: {
            type: Boolean,
            default: false
        },
        /**
         * activate if styled layout should be used
         *
         * @affectsStyling: true
         */
        useStyledLayout: {
            type: Boolean,
            default: false
        },
        /**
         * label-text to enable dark-mode
         *
         * @requiredForAccessibility: true
         */
        labelTextDarkMode: {
            type: String,
            default: "Dark-mode enabled"
        },
        /**
         * label-text to enable light-mode
         *
         * @requiredForAccessibility: true
         */
        labelTextLightMode: {
            type: String,
            default: "Light-mode enabled"
        }
    },
    created() {
        const mql = window.matchMedia("(prefers-color-scheme: dark)")
        mql.addEventListener("change", this.onColorSchemeChange)
        this.onColorSchemeChange(mql)

        // load color-scheme from local-storage
        const savedColorScheme = window.localStorage.getItem("cmd-color-scheme")

        if(savedColorScheme) {
            this.darkMode = savedColorScheme === "dark-mode"
        }

        // add eventListener on html-tag (= documentElement) to react on 'toggle-color-scheme'-event
        document.documentElement.addEventListener("toggle-color-scheme", this.onToggleColorScheme)
    },
    beforeUnmount() {
        window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", this.onColorSchemeChange)

        // remove eventListener on html-tag (= documentElement)
        document.documentElement.removeEventListener("toggle-color-scheme", this.onToggleColorScheme)
    },
    methods: {
        onColorSchemeChange(event) {
            // assign browser/os-color-scheme to data-property (and toggle class on html-tag)
            this.darkMode = event.matches
            document.documentElement.classList.add(this.darkMode ? "dark-mode" : "light-mode")
        },
        setColorScheme() {
            // save color-scheme in local-storage to avoid toggling on page-reload
            window.localStorage.setItem("cmd-color-scheme", this.darkMode ? "dark-mode": "light-mode")
        },
        onToggleColorScheme(event) {
            // get current color-scheme from event-listener (if color-scheme is toggled by (another) switch or browser-/os-settings)
            this.darkMode = event.detail === "dark-mode"
        },
        toggleColorScheme() {
            this.darkMode = !this.darkMode
            this.setColorScheme()
        }
    },
    computed: {
        labelText() {
            return this.darkMode ? this.labelTextDarkMode : this.labelTextLightMode
        },
        iconClass() {
            return this.darkMode ? this.iconDarkMode.iconClass : this.iconLightMode.iconClass
        },
        iconType() {
            return this.darkMode ? this.iconDarkMode.iconType : this.iconLightMode.iconType
        }
    },
    watch: {
        darkMode: {
            handler() {
                // toggle classes to overwrite media-query styles for color-schemes
                const htmlTag = document.documentElement
                if (this.darkMode) {
                    htmlTag.classList.replace("light-mode", "dark-mode")
                } else {
                    htmlTag.classList.replace("dark-mode", "light-mode")
                }

                // emits custom events from html-tag
                htmlTag.dispatchEvent(new CustomEvent('toggle-color-scheme', {detail: this.darkMode ? 'dark-mode' : 'light-mode'}))
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-toggle-dark-mode ---------------------------------------------------------------------------------------- */
.cmd-toggle-dark-mode {
    &.styled-layout {
        input {
            --dark-blue: hsl(195, 96%, 45%);
            --medium-blue: hsl(194, 97%, 39%);
            --light-blue: hsl(195, 97%, 76%);
            background: linear-gradient(to bottom, var(--dark-blue) 0%, var(--light-blue) 67%);
            border-color: var(--medium-blue);

            &::after {
                --yellow-hue: 60;
                --yellow-saturation: 100%;
                --yellow-lightness: 76.7%;
                background: radial-gradient(ellipse at center, var(--pure-white) 20%, hsl(var(--yellow-hue), var(--yellow-saturation), var(--yellow-lightness)) 30%, hsla(var(--yellow-hue), var(--yellow-saturation), var(--yellow-lightness), 0) 100%);
                border-color: transparent;
                box-shadow: 0 0 1rem hsl(var(--yellow-hue), var(--yellow-saturation), var(--yellow-lightness));
            }
        }

        &.dark-mode {
            input {
                background: var(--color-scheme-background-color);
                border-color: var(--color-scheme-text-color);

                &::before {
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
                    transition: var(--default-transition);
                }

                &::after {
                    background: radial-gradient(ellipse at center, var(--pure-white) 50%, var(--medium-gray) 100%);
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
}
/* end cmd-toggle-dark-mode ---------------------------------------------------------------------------------------- */
</style>