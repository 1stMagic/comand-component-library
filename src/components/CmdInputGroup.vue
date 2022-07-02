<template>
    <div :class="['cmd-input-group label', {inline: labelInline, 'multiple-switch': multipleSwitch, disabled: disabled, 'toggle-switch': toggleSwitch}]">
        <span :class="['label-text', { hidden: !showLabel}]" :id="labelId" :aria-labelledby="labelId">
             <span>{{ labelText }}<sup v-if="$attrs.required">*</sup></span>

            <!-- begin CmdTooltip -->
            <CmdTooltip v-if="useCustomTooltip" class="box" :class="validationStatus" :relatedId="tooltipId" :toggle-visibility-by-click="true">
                <!-- begin CmdSystemMessage -->
                <CmdSystemMessage
                    v-if="getValidationMessage"
                    :message="getValidationMessage"
                    :validation-status="validationStatus"
                    :iconClose="{show: false}"
                />
                <!-- end CmdSystemMessage -->

                <!-- begin CmdListOfRequirements -->
                <CmdListOfRequirements
                    v-if="showRequirements && (validationStatus === '' || validationStatus === 'error')"
                    :inputRequirements="inputRequirements"
                    :helplink="helplink"
                    :inputModelValue="modelValue"
                    :inputAttributes="$attrs"
                />
                <!-- end CmdListOfRequirements -->
            </CmdTooltip>
            <!-- end CmdTooltip -->

            <a v-if="$attrs.required || inputRequirements.length"
               href="#"
               @click.prevent
               :class="getStatusIconClass"
               :title="validationTooltip"
               :aria-errormessage="getValidationMessage"
               aria-live="assertive"
               :id="tooltipId"
               :role="validationStatus === 'error' ? 'alert' : 'dialog'">
            </a>
        </span>
        <span v-if="!useSlot" :class="['flex-container', {'no-flex': !stretchHorizontally, 'no-gap': multipleSwitch}]">
            <label v-for="(inputElement, index) in inputElements" :key="index" :for="inputElement.id">
                <input
                    :type="inputTypes"
                    :id="inputElement.id"
                    :name="inputElement.name"
                    :value="inputElement.value"
                    v-model="inputValue"
                    :disabled="disabled"
                    :class="{'replace-input-type': replaceInputType, 'toggle-switch': toggleSwitch}"
                />
                <span v-if="multipleSwitch && inputElement.iconClass" :class="inputElement.iconClass"></span>
                <span v-if="inputElement.labelText">{{ inputElement.labelText }}</span>
            </label>
        </span>

        <!-- begin useSlot -->
        <div v-else class="flex-container no-flex">
            <!-- begin slot -->
            <slot></slot>
            <!-- end slot -->
        </div>
        <!-- end useSlot -->
    </div>
</template>

<script>
import {createUuid} from "../utils/common"

// import mixins
import FieldValidation from "../mixins/FieldValidation.js"
import Tooltip from "../mixins/Tooltip.js"

// import components
import CmdListOfRequirements from "./CmdListOfRequirements"
import CmdSystemMessage from "./CmdSystemMessage"
import CmdTooltip from "./CmdTooltip"

export default {
    components: {
        CmdListOfRequirements,
        CmdSystemMessage,
        CmdTooltip
    },
    mixins: [
        FieldValidation,
        Tooltip
    ],
    data() {
        return {
            value: ""
        }
    },
    props: {
        validationTooltip: {
            type: String,
            default: ""
        },
        /**
         * set value for v-model (must be named modelValue in vue3 if default v-model should be used)
         */
        modelValue: {
            type: [Array, String],
            required: false
        },
        /**
         * list of input-elements inside group
         *
         * useSlot-property must be set to 'false'
         */
        inputElements: {
            type: Array,
            required: false
        },
        /**
         * set type for inputs in group
         *
         * @allowedValues: checkbox, radio
         */
        inputTypes: {
            type: String,
            default: "radio"
        },
        /**
         * for replacing native checkboxes/radio-buttons by custom ones (based on frontend-framework)
         *
         * toggleSwitch-property must be set to 'false'
         *
         * @affectsStyling: true
         */
        replaceInputType: {
            type: Boolean,
            default: false
        },
        /**
         * for replacing native checkboxes/radio-buttons by toggle-switches (based on frontend-framework)
         *
         * replaceInputType-property must be set to 'false'
         *
         * @affectsStyling: true
         */
        toggleSwitch: {
            type: Boolean,
            default: false
        },
        /**
         * activate if input-elements should be given by slot
         */
        useSlot: {
            type: Boolean,
            default: false
        },
        /**
         * toggle multipleSwitch-styling
         *
         * @affectsStyling: true
         */
        multipleSwitch: {
            type: Boolean,
            default: false
        },
        /**
         * toggle label-text visibility
         */
        showLabel: {
            type: Boolean,
            default: true
        },
        /**
         * label-text for input-group
         *
         * @requiredForAccessibility: true
         */
        labelText: {
            type: String,
            required: true
        },
        /**
         * toggle label-position (inline/left of input-elements or above input-elements)
         */
        labelInline: {
            type: Boolean,
            default: false
        },
        /**
         * toggle if input-elements will be stretched horizontally
         *
         * @affectsStyling: true
         */
        stretchHorizontally: {
            type: Boolean,
            default: false
        },
        /**
         * define disabled-property to set disabled-style
         *
         * component cannot handle native disabled-attribute, because it is no native form-element
         */
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        // get ID for accessibility
        labelId() {
            if (this.$attrs.id !== undefined) {
                return this.$attrs.id
            }
            return "label-" + createUuid()
        },
        inputValue: {
            // read inputValue
            get() {
                return this.modelValue
            },
            // set/write a value to update v-model for this component
            set(value) {
                this.$emit("update:modelValue", value)
            }
        }
    },
    methods: {
        onChange(e) {
            if (typeof this.value === "string") {
                this.$emit("update:value", e.target.value)
            } else if (this.value !== undefined) {
                let values = [...this.value]
                if (e.target.checked) {
                    values.push(e.target.value)
                } else {
                    values = values.filter(value => value !== e.target.value)
                }
                this.$emit("update:modelValue", values)
            }
        }
    }
}
</script>

<style lang="scss">
.cmd-input-group {
    &.inline {
        display: flex;
        gap: var(--default-gap);
    }

    /* overwrite default behavior from frontend-framework */
    .label-text {
        display: inline-flex;

        > a[class*="icon"] {
            margin-left: calc(var(--default-margin) / 2);
        }
    }
}
</style>