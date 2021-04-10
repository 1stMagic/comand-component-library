<template>
    <label class="multiple-switch" :class="htmlClass">
        <span v-if="labelText">{{ labelText }}</span>
        <span class="flex-container no-gap no-flex">
            <label :for="multipleswitch.id" v-for="(multipleswitch, index) in multipleSwitches" :key="index">
                <input :type="switchTypes"
                       :id="multipleswitch.id"
                       :name="switchNames"
                       :value="multipleswitch.value"
                       :checked="isChecked(multipleswitch)"
                       @change="onChange"
                />
                <span v-if="multipleswitch.iconClass" :class="multipleswitch.iconClass"></span>
                <span v-if="multipleswitch.labelText">{{ multipleswitch.labelText }}</span>
            </label>
        </span>
    </label>
</template>

<script>
export default {
    name: "CmdMultipleSwitch",
    props: {
        value: { /* required for v-model */
            type: [String, Array],
            required: false,
            default: ""
        },
        htmlClass: {
          type: String,
          required: false
        },
        labelText: {
            type: String,
            required: false
        },
        multipleSwitches: {
            type: Array,
            required: true
        },
        switchTypes: {
          type: String,
          required: true
        },
        switchNames: {
            type: String,
            required: true
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