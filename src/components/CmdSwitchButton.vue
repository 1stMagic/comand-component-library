<template>
    <label :class="['cmd-switch-button', 'toggle-switch',
                    {'switch-label': onLabel && offLabel && !labelText,
                    'colored' : colored, 'on' : colored && isChecked,
                    'off' : colored && !isChecked, 'disabled': $attrs.disabled
                    }
                    ]"
           :for="id"
           :title="$attrs.title"
    >
        <input :type="type" :id="id" :name="name" :value="inputValue" :checked="isChecked" @change="onChange" v-bind="$attrs"/>
        <span class="label" v-if="onLabel && offLabel && !labelText">{{ onLabel }}</span>
        <span class="label" v-if="onLabel && offLabel && !labelText">{{ offLabel }}</span>
        <span class="label" v-if="!onLabel && !offLabel && labelText">{{ labelText }}</span>
    </label>
</template>

<script>
export default {
    inheritAttrs: false,
    name: "CmdSwitchButton",
    emits: ["update:value"],
    props: {
        /**
         * set type for input
         *
         * values: checkbox, radio
         */
        type: {
            type: String,
            required: true
        },
        /**
         * set id for input
         *
         * required for accessibility
         *
         */
        id: {
            type: String,
            required: true
        },
        /**
         * set name for input
         *
         * require for radio-buttons (and form-submit by browser)
         */
        name: {
            type: String,
            required: false
        },
        /**
         * value for v-model
         */
        value: {
            type: [String, Array, Boolean],
            required: false
        },
        /**
         * set value to pre-check toggle-switch
         */
        inputValue: {
            type: String,
            required: false
        },
        /**
         * text for label
         *
         * required if onLabel/offLabel are not set
         */
        labelText: {
            type: String,
            required: false
        },
        /**
         * text for on-label
         *
         * set to activate switch-label (=label is placed on toggle-switch (not behind))
         */
        onLabel: {
            type: String,
            required: false
        },
        /**
         * text for off-label
         *
         * set to activate switch-label (=label is placed on toggle-switch (not behind))
         */
        offLabel: {
            type: String,
            required: false
        },
        /**
         * set to true, if checkbox/radio-buttons should have green/checked and red/unchecked color-coding
         */
        colored: {
            type: Boolean,
            required: false
        }
    },
    computed: {
        isChecked() {
            if (typeof this.value === 'boolean') {
                return this.value
            }
            if (typeof this.value === 'string') {
                return this.value === this.inputValue
            }
            if(this.value !== undefined) {
                return this.value.includes(this.inputValue)
            }
            return false
        }
    },
    methods: {
        onChange(e) {
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

<style lang="scss">
/* begin cmd-switch-button ------------------------------------------------------------------------------------------ */
/* no cmd-prefix-styling (class based on frontend-framework */
.toggle-switch {
    &.switch-label {
        &.colored {
            &.off {
                border-color: var(--error-color);

                span {
                    &.label {
                        color: var(--error-color);

                        &::before {
                            border-color: var(--error-color);
                            background-color: var(--pure-white);
                        }
                    }
                }
            }

            &.on {
                border-color: var(--success-color);

                span {
                    &.label {
                        color: var(--success-color);

                        &::before {
                            border-color: var(--success-color);
                            background-color: var(--success-color);
                        }
                    }
                }
            }
        }
    }
}
/* end cmd-switch-button ------------------------------------------------------------------------------------------ */
</style>