<template>
    <pre :class="classLanguage"><code :class="classLanguage" v-html="codeFormatted"></code></pre>
    <p v-if="codeCopied">Code was copied to clipboard!</p>
    <a href="#" @click.prevent="copyToClipboard">
        <span class="icon-duplicate-content"></span>
        <span>Copy code</span>
    </a>
</template>

<script>
import Prism from "prismjs"
import "prismjs/components/prism-json"

export default {
    name: "ComponentCode",
    data() {
        return {
            codeCopied: false
        }
    },
    props: {
        code: {
            type: [String, Object, Array],
            required: true
        },
        language: {
            type: String,
            default: "markup"
        }
    },
    computed: {
        codeFormatted() {
            let codeUnformatted = this.code
            if(typeof this.code !== "string") {
                codeUnformatted = JSON.stringify(codeUnformatted, null, 2)
            }
            return Prism.highlight(codeUnformatted, Prism.languages[this.language], this.language)
        },
        classLanguage() {
            return "language-" + this.language
        }
    },
    methods: {
        copyToClipboard() {
            navigator.clipboard.writeText(this.code)
            this.codeCopied = true
        }
    }
}
</script>
