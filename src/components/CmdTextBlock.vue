<template>
    <div class="cmd-text-block flex-container vertical">
        <!-- begin cmd-headline -->
        <input v-if="editContent" class="edit-mode headline" type="text" v-model="editableHtmlHeadline" />
        <CmdHeadline v-else-if="cmdHeadline" :headlineText="cmdHeadline.headlineText" :headlineLevel="cmdHeadline.headlineLevel"/>
        <!-- end cmd-headline -->

        <!-- begin text for single-paragraph -->
        <input v-if="editContent" class="edit-mode" type="text" v-model="editableText" />
        <p v-if="textContent">{{textContent}}</p>
        <!-- end text for single-paragraph -->

        <!-- begin continuous text -->
        <textarea v-if="editContent" class="edit-mode" v-model="editableHtmlContent"></textarea>
        <div v-else-if="htmlContent" v-html="htmlContent"></div>
        <!-- end continuous text -->
    </div>
</template>

<script>
export default {
    name: "CmdTextBlock",
    data() {
        return {
            editableHtmlHeadline: "",
            editableText: "",
            editableHtmlContent: ""
        }
    },
    props: {
        /**
         * set to activate edit-mode
         */
        editContent: {
            type: Boolean,
            default: false
        },
        /**
         * properties for CmdHeadline-component
         */
        cmdHeadline: {
            type: Object,
            required: false
        },
        /**
         * text placed in a single paragraph
         */
        textContent: {
            type: String,
            required: false
        },
        /**
         * content for continuous text (can contain html-tags)
         */
        htmlContent: {
            type: String,
            required: true
        }
    }
}
</script>