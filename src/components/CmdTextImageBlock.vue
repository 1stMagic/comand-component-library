<template>
    <div class="cmd-text-image-block flex-container vertical">
        <!-- begin cmdHeadline -->
        <CmdHeadline
            v-if="(cmdHeadline?.headlineText || editModeContext) && headlinePosition === 'aboveImage'"
            v-bind="cmdHeadline"
        />
        <!-- end cmdHeadline -->

        <!-- begin cmdImage -->
        <CmdImage
            v-if="cmdImage"
            :image="cmdImage?.image"
            :figcaption="cmdImage?.figcaption"
            :editModeConfig="{allowAddItem: false}"
        />
        <!-- end cmdImage -->

        <!-- begin cmdHeadline -->
        <CmdHeadline
            v-if="(cmdHeadline?.headlineText || editModeContext) && headlinePosition === 'belowImage'"
            v-bind="cmdHeadline"
        />
        <!-- end cmdHeadline -->

        <!-- begin continuous text -->
        <!-- begin edit-mode -->
        <EditComponentWrapper
            v-if="editModeContext"
            ref="editComponentWrapper"
            class="edit-items"
            :showComponentName="false"
            :allowedComponentTypes="[]"
            :componentProps="{htmlContent, textAlign}"
            :componentPath="paragraphComponentPath"
            :allowDeleteComponent="!!htmlContent"
        >
            <template v-slot="slotProps">
                <textarea v-if="slotProps.editing" :class="['edit-mode', textAlign]" v-model="editableHtmlContent" placeholder="Paragraph"></textarea>
                <div v-else-if="htmlContent" v-html="htmlContent" :class="textAlign"></div>
                <!-- begin show placeholder if no image exists (and component is not edited) -->
                <button v-else type="button" class="button confirm" @click="onAddItem">
                    <span class="icon-plus"></span>
                    <span>Add new paragraph</span>
                </button>
                <!-- end show placeholder if no image exists (and component is not edited) -->
            </template>
        </EditComponentWrapper>
        <!-- end edit-mode -->

        <div v-else-if="htmlContent" v-html="htmlContent" :class="textAlign"></div>
        <!-- end continuous text -->
    </div>
</template>

<script>
import EditMode from "../mixins/EditMode.vue"
import {updateHandlerProvider} from "../utils/editmode.js"

export default {
    name: "CmdTextImageBlock",
    mixins: [EditMode],
    data() {
        return {
            editableHtmlContent: null
        }
    },
    props: {
        editModeContextData: {
            type: Object
        },
        /**
         * content for continuous text (can contain html-tags)
         */
        htmlContent: {
            type: String,
            required: true
        },
        /**
         * text-alignment for paragraph/continuous text
         */
        paragraphTextAlign: {
            type: String,
            required: false
        },
        /**
         * position for headline
         *
         * @allowedValues: "aboveImage", "belowImage"
         */
        headlinePosition: {
            type: String,
            default: "aboveImage"
        },
        /**
         * properties for CmdHeadline-component
         */
        cmdHeadline: {
            type: Object,
            required: false
        },
        /**
         * property for CmdImage-component
         */
        cmdImage: {
            type: Object,
            required: false
        }
    },
    computed: {
        paragraphComponentPath() {
            /*  because paragraph is no component on its own, besides the componentPath (for the property),
             an additional flag (here $isComponent-key) is used to let the store identify this edge case.
             the '$'-prefix is set to ensure that the flag is not a generic name, that potentially is used as a property-name in any component */
            return  [{componentPath: ["props", "htmlContent"], $isComponent: false}]
        },
        textAlign() {
            if (this.paragraphTextAlign) {
                return "text-align-" + this.paragraphTextAlign
            }
            return ""
        }
    },
    methods: {
        onAddItem() {
            // execute editComponent-function from editComponentWrapper to enter editMode directly on "add"
            this.$refs.editComponentWrapper.editComponent()
        },
        addHandlerProvider() {
            return ""
        },
        updateHandlerProvider() {
            const htmlContent = this.editableHtmlContent
            this.editableHtmlContent = null // reset data-property

            return updateHandlerProvider(this, {
                update(props) {
                    props.htmlContent = htmlContent
                }
            })
        }
    },
    watch: {
        htmlContent: {
            handler() {
                this.editableHtmlContent = this.htmlContent
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss">
.edit-mode .cmd-text-image-block textarea {
    width: 100%;
}
</style>
