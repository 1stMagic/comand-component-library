<template>
    <!-- begin CmdTooltip -->
    <CmdTooltip
        class="box"
        :class="validationStatus"
        :relatedId="relatedId"
        ref="tooltip"
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
        showRequirements: {
            type: Boolean,
            default: false
        },
        validationStatus: {
            type: String,
            default: ""
        },
        validationMessage: {
            type: String,
            default: ""
        },
        validationTooltip: {
            type: String,
            default: ""
        },
        helplink: {
            type: String,
            default: ""
        },
        relatedId: {
            type: String,
            default: ""
        },
        inputRequirements: {
            type: Array,
            default() {
                return []
            }
        },
        inputModelValue: {
            type: [String, Boolean, Array, Number],
            default: ""
        },
        inputAttributes: {
            type: Object,
            default() {
                return {}
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