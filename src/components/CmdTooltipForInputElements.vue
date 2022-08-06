<template>
    <!-- begin CmdTooltip -->
    <CmdTooltip
        ref="tooltip"
        class="box"
        :class="validationStatus"
        :relatedId="relatedId"
        :toggle-visibility-by-click="true">

        <!-- begin CmdSystemMessage -->
        <CmdSystemMessage
            v-if="inputAttributes.required && validationMessage"
            :systemMessage="validationMessage"
            :validation-status="validationStatus"
            :iconClose="{show: false}"
        />
        <!-- end CmdSystemMessage -->

        <!-- begin CmdListOfRequirements -->
        <CmdListOfRequirements
            v-if="showRequirements"
            :inputRequirements="inputRequirements"
            :helplink="helplink"
            :inputModelValue="inputModelValue"
            :inputAttributes="inputAttributes"
            :validationTooltip="validationTooltip"
            :labelText="labelText"
        />
        <!-- end CmdListOfRequirements -->
    </CmdTooltip>
    <!-- end CmdTooltip -->
</template>

<script>
// import components
import CmdListOfRequirements from "./CmdListOfRequirements"
import CmdSystemMessage from "./CmdSystemMessage"
import CmdTooltip from "./CmdTooltip"

export default {
    name: "CmdTooltipForInputElements",
    components: {
        CmdListOfRequirements,
        CmdSystemMessage,
        CmdTooltip
    },
    props: {
        /**
         * text for label (used in headline)
         */
        labelText: {
            type: String,
            required: false
        },
        /**
         * related-id for CmdTooltip-component
         */
        relatedId: {
            type: String,
            default: ""
        },
        /**
         * validation-status for CmdSystemMessage-component and CmdTooltip-component
         */
        validationStatus: {
            type: String,
            default: ""
        },
        /**
         * validation-message for CmdSystemMessage-component
         */
        validationMessage: {
            type: String,
            default: ""
        },
        /**
         * toggle visibility for CmdListOfRequirements-component
         */
        showRequirements: {
            type: Boolean,
            default: false
        },
        /**
         * validation-tooltip for CmdListOfRequirements-component
         */
        validationTooltip: {
            type: String,
            default: ""
        },
        /**
         * list of input-requirements for CmdListOfRequirements-component
         */
        inputRequirements: {
            type: Array,
            default() {
                return []
            }
        },
        /**
         * input-attributes for CmdListOfRequirements-component
         */
        inputAttributes: {
            type: Object,
            default() {
                return {}
            }
        },
        /**
         * input-model-value for CmdListOfRequirements-component
         */
        inputModelValue: {
            type: [String, Boolean, Array, Number],
            default: ""
        },
        /**
         * helplink for CmdListOfRequirements-component
         */
        helplink: {
            type: Object,
            required: false
        }
    },
    methods: {
        hideTooltip() {
            // close tooltip by calling function from CmdTooltip using $refs
            this.$refs.tooltip.hideTooltip()
        }
    }
}
</script>