<template>
    <div :class="['cmd-multiple-switch multiple-switch label', {disabled: status === 'disabled', error: status === 'error'}]" :aria-labelledby="labelId">
        <span :class="{hidden: !showLabel}" :id="labelId">{{ labelText }}</span>
        <span class="flex-container no-gap no-flex">
            <label :class="{disabled: status === 'disabled'}" :for="multipleswitch.id"
                   v-for="(multipleswitch, index) in multipleSwitches" :key="index">
                <input :type="switchTypes"
                       :id="multipleswitch.id"
                       :disabled="status === 'disabled'"
                       :name="switchNames"
                       :value="multipleswitch.value"
                       :checked="isChecked(multipleswitch)"
                       @change="onChange"
                />
                <span v-if="multipleswitch.iconClass" :class="multipleswitch.iconClass"></span>
                <span v-if="multipleswitch.labelText">{{ multipleswitch.labelText }}</span>
            </label>
        </span>
    </div>
</template>

<script>
// import utils
import {createUuid} from "../utils/common.js"

export default {
    name: "CmdMultipleSwitch",
    props: {
        /**
         * value for v-model
         */
        value: {
            type: [String, Array],
            required: false,
            default: ""
        },
        /**
         * toggle label visibility
         */
        showLabel: {
            type: Boolean,
            default: true
        },
        /**
         * text for label
         *
         * @requiredForAccessibility: true
         */
        labelText: {
            type: String,
            required: false
        },
        /**
         * list of switches
         */
        multipleSwitches: {
            type: Array,
            required: true
        },
        /**
         * set type for switches
         *
         * @allowedValues: checkbox, radio
         */
        switchTypes: {
            type: String,
            required: true
        },
        /**
         * name-attribute for switches
         */
        switchNames: {
            type: String,
            required: true
        },
        /**
         * status for all switches
         *
         * @allowedValues: error, disabled
         */
        status: {
            type: String,
            required: false
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
                this.$emit("update:value", values)
            }
        },
        isChecked(multipleswitch) {
            if (typeof this.value === "string") {
                return this.value === multipleswitch.value
            }
            if (this.value !== undefined) {
                return this.value.includes(multipleswitch.value)
            }
            return false
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-multiple-switch ------------------------------------------------------------------------------------------ */

/* end cmd-multiple-switch ------------------------------------------------------------------------------------------ */
</style>