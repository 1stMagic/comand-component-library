<template>
    <label :class="['toggle-switch',
                    {'switch-label': onLabel && offLabel && !labelText,
                    'colored' : colored, 'on' : colored && isChecked,
                    'off' : colored && !isChecked, 'disabled': $attrs.disabled
                    }
                    ]" :for="id">
        <input :type="type" :id="id" :name="name" :value="inputValue" :checked="isChecked" @change="onChange" v-bind="$attrs" />
        <span class="label" v-if="onLabel && offLabel && !labelText">{{ onLabel }}</span>
        <span class="label" v-if="onLabel && offLabel && !labelText">{{ offLabel }}</span>
        <span class="label" v-if="!onLabel && !offLabel && labelText">{{ labelText }}</span>
    </label>
</template>

<script>
export default {
    inheritAttrs: false,
    name: "SwitchButton",
    props: {
        type: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: false
        },
        value: {
            type: [String, Array, Boolean],
            required: false
        },
        inputValue: {
            type: String,
            required: false
        },
        labelText: {
          type: String,
          required: false
        },
        onLabel: {
            type: String,
            required: false
        },
        offLabel: {
            type: String,
            required: false
        },
        colored: {
            type: Boolean,
            required: false
        }
    },
    computed: {
        isChecked () {
            if (typeof this.value === 'boolean') {
                return this.value
            }
            if (typeof this.value === 'string') {
                return this.value === this.inputValue
            }
            return this.value.includes(this.inputValue)
        }
    },
    methods: {
        onChange (e) {
            if (typeof this.value === 'boolean') {
                this.$emit('update:value', e.target.checked)
            } else if (typeof this.value === 'string') {
                this.$emit('update:value', e.target.value)
            } else {
                let values = [...this.value]
                if (e.target.checked) {
                    values.push(e.target.value)
                } else {
                    values = values.filter(value => value !== e.target.value)
                }
                this.$emit('update:value', values)
            }
        }
    }
}
</script>