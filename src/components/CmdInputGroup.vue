<template>
    <div :class="['cmd-input-group', {inline: labelInline, 'multiple-switch': multipleSwitch}]">
        <span :class="['label', { hidden: !showLabel}]" :id="labelId" :aria-labelledby="labelId">{{ labelText }}</span>
        <span v-if="!useSlot" :class="['flex-container', {'no-flex': !stretchHorizontally, 'no-gap': multipleSwitch}]">
            <label v-for="(inputElement, index) in inputElements" :key="index" :for="inputElement.id">
                <input :type="inputTypes"
                       :id="inputElement.id"
                       :name="inputElement.name"
                       v-model="inputElement.value"
                       @change="onChange()"
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

export default {
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
            type: Array,
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
        }
    },
    computed: {
        // get ID for accessibility
        labelId() {
            if(this.$attrs.id !== undefined) {
                return this.$attrs.id
            }
            return "label-" + createUuid()
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
        },
    }
}
</script>

<style lang="scss">
.cmd-input-group {
    &.inline {
        display: flex;
        gap: var(--default-gap);
    }
}
</style>