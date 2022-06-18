<template>
    <div :class="['cmd-toggle-dark-mode', {'dark-mode': darkMode}]">
        <CmdFormElement
            element="input"
            type="checkbox"
            :labelText="labelText"
            :showLabel="showLabel"
            v-model="darkMode"
        />
    </div>
</template>

<script>
import CmdFormElement from "./CmdFormElement"

export default {
    data() {
      return {
          darkMode: false
      }
    },
    components: {
        CmdFormElement
    },
    props: {
        labelText: {
            type: String,
            default: "Toggle Darkmode"
        },
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
            } else {
                htmlTag.classList.replace("dark-mode", "light-mode");
            }
            htmlTag.dispatchEvent(new CustomEvent('toggle-color-scheme', { detail: this.darkMode ? 'dark-mode' : 'light-mode' }))
        }
    }
}
</script>