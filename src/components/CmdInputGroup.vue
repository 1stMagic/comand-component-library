<template>
    <div :class="[
        'cmd-input-group label',
        validationStatus,
        {inline: labelInline,
        'multiple-switch': multipleSwitch,
        disabled: disabled,
        'toggle-switch': toggleSwitch,
        'has-state': validationStatus
        }
        ]"
         :aria-labelledby="htmlId">
        <span v-show="showLabel" class="label-text">
             <span :id="htmlId">{{ labelText }}<sup v-if="required">*</sup></span>

            <!-- begin CmdTooltipForInputElements -->
            <CmdTooltipForInputElements
                v-if="useCustomTooltip && (validationStatus === '' || validationStatus === 'error')"
                ref="tooltip"
                :showRequirements="showRequirements"
                :cmdListOfRequirements="listOfRequirements"
                :validationStatus="validationStatus"
                :validationMessage="getValidationMessage"
                :inputAttributes="$attrs"
                :inputModelValue="modelValue"
                :helplink="helplink"
                :relatedId="tooltipId"
                :role="validationStatus === 'error' ? 'alert' : 'dialog'"
            />
            <!-- end CmdTooltipForInputElements -->

            <a v-if="required || inputRequirements.length"
               href="#"
               @click.prevent
               :title="validationTooltip"
               :aria-errormessage="tooltipId"
               aria-live="assertive"
               :id="tooltipId">
               <!-- begin CmdIcon -->
               <CmdIcon :iconClass="getStatusIconClass" />
               <!-- end CmdIcon -->
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
                <!-- begin CmdIcon -->
                <CmdIcon v-if="multipleSwitch && inputElement.iconClass" :iconClass="inputElement.iconClass" :type="inputElement.iconType" />
                <!-- end CmdIcon -->
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
// import mixins
import FieldValidation from "../mixins/FieldValidation.js"
import Identifier from "../mixins/Identifier"
import Tooltip from "../mixins/Tooltip.js"

// import components
import CmdIcon from "./CmdIcon"
import CmdTooltipForInputElements from "./CmdTooltipForInputElements"

export default {
    components: {
        CmdIcon,
        CmdTooltipForInputElements
    },
    mixins: [
        FieldValidation,
        Identifier,
        Tooltip
    ],
    data() {
        return {
            value: ""
        }
    },
    props: {
        /**
         * set value for v-model (must be named modelValue in vue3 if default v-model should be used)
         */
        modelValue: {
            type: [Array, String],
            required: false
        },
        /**
         * set if input-group should be required
         */
        required: {
            type: Boolean,
            default: false
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
         * set status for label and inner form-elements
         *
         * @allowedValues: error, warning, success, info
         *
         * @affectsStyling: true
         */
        status: {
            type: String,
            required: false
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
    methods: {
        updateStatus() {
            if (this.required) {
                if(this.inputValue?.length) {
                    this.validationStatus = ""
                    return
                }
                this.validationStatus =  "error"
                return
            }
            this.validationStatus = this.status
        }
    },
    computed: {
        validationTooltip() {
            if (!this.useCustomTooltip) {
                return this.getValidationMessage
            }

            // set default-tooltip if customTooltip is not set
            if (this.validationStatus === 'error') {
                return this.getMessage("cmdformelement.validationTooltip.an_error_occurred")
            } else if (this.validationStatus === 'success') {
                return this.getMessage("cmdformelement.validationTooltip.information_is_filled_correctly")
            }
            return this.getMessage("cmdformelement.validationTooltip.open_field_requirements")
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
    watch: {
        status: {
            handler() {
                this.updateStatus()
            },
            immediate: true
        },
        modelValue: {
            handler() {
                this.updateStatus()
            },
            immediate: true
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
    &.toggle-switch {
        display: block;
    }

    /* overwrite default behavior from frontend-framework */
    .label-text {
        display: inline-flex;

        > [class*="icon-"] {
            margin-left: calc(var(--default-margin) / 2);
        }
    }

    &.has-state {
        label {
            color: var(--status-color);
        }

        &.multiple-switch {
            label {
                border-color: var(--status-color);
            }
        }
    }
}
</style>