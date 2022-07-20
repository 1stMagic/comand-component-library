import {nextSequenceValue} from "../utils/globalSequence"

export default {
    data() {
        return {
            tooltip: false,
            tooltipId: "tooltip-" + nextSequenceValue()
        }
    },
    props: {
        /**
         * useCustomTooltip
         */
        useCustomTooltip: {
            type: Boolean,
            default: true
        },
        /**
         * allow closing tooltip by escape-key
         */
        allowEscapeKey: {
            type: Boolean,
            default: true
        }
    }
}