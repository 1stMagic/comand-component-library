<template>
    <!-- begin CmdTooltip -->
    <CmdTooltip
        ref="tooltip"
        class="box"
        :class="validationStatus"
        :relatedId="relatedId"
        :toggle-visibility-by-click="true">

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
import CmdTooltip from "./CmdTooltip"

export default {
    name: "CmdTooltipForInputElements",
    components: {
        CmdListOfRequirements,
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
         * validation-status for CmdTooltip-component
         */
        validationStatus: {
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