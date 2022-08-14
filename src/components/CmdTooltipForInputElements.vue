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
            v-if="cmdListOfRequirements?.inputAttributes?.required && validationMessage"
            :systemMessage="validationMessage"
            :validation-status="validationStatus"
            :iconClose="{show: false}"
        />
        <!-- end CmdSystemMessage -->

        <!-- begin CmdListOfRequirements -->
        <CmdListOfRequirements
            v-if="cmdListOfRequirements.showRequirements"
            :showHeadline="cmdListOfRequirements.showHeadline"
            :inputRequirements="cmdListOfRequirements.inputRequirements"
            :helplink="cmdListOfRequirements.helplink"
            :inputModelValue="cmdListOfRequirements.inputModelValue"
            :inputAttributes="cmdListOfRequirements.inputAttributes"
            :validationTooltip="cmdListOfRequirements.validationTooltip"
            :labelText="cmdListOfRequirements.labelText"
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
         * properties for CmdListOfRequirements-component
         */
        cmdListOfRequirements: {
            type: Object,
            default() {
                return {
                    showRequirements: true,
                    validationTooltip: "",
                    inputRequirements: [],
                    inputAttributes: {},
                    showHeadline: true,
                    inputModelValue: "",
                    helplink: {},
                    labelText: ""
                }
            }
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