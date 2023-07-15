<template>
    <div class="cmd-text-block flex-container vertical">
        <!-- begin cmd-headline -->
        <CmdHeadline v-if="cmdHeadline" :headlineText="cmdHeadline.headlineText" :headlineLevel="cmdHeadline.headlineLevel" />
        <!-- end cmd-headline -->

        <!-- begin continuous text -->
        <textarea v-if="editModeContext?.editing" class="edit-mode" v-model="editableHtmlContent"></textarea>
        <div v-else-if="htmlContent" v-html="htmlContent"></div>
        <!-- end continuous text -->
    </div>
</template>

<script>
import {useEditModeContext} from "../editmode/editModeContext.js"

export default {
    name: "CmdTextBlock",
    provide() {
        return {
            editModeContext: this.context
        }
    },
    inject: {
        editModeContext: {
            default: null
        }
    },
    data() {
        return {
            context: useEditModeContext(this.editModeContext, {tb: true}, this.onPersist),
            editableHtmlHeadline: this.cmdHeadline?.headlineText || "",
            editableHtmlContent: this.htmlContent
        }
    },
    props: {
        editModeContextData: {
            type: Object
        },
        /**
         * properties for CmdHeadline-component
         */
        cmdHeadline: {
            type: Object,
            required: false
        },
        /**
         * content for continuous text (can contain html-tags)
         */
        htmlContent: {
            type: String,
            required: true
        }
    },
    methods: {
        onPersist(data) {
            const htmlContent = this.editableHtmlContent
            return {
                editModeContextData: {
                    ...(this.editModeContextData || {})
                },
                update(props) {
                    props.cmdHeadline = {
                        ...(props.cmdHeadline || {}),
                    }
                    props.cmdHeadline.headlineText = data[0].headlineText
                    props.htmlContent = htmlContent
                }
            }
        }
    }
}
</script>