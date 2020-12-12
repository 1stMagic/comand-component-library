<template>
    <label :class="{'colored' : colored, 'on' : colored && isChecked, 'off' : colored && !isChecked}" class="toggle-switch switch-label" :for="id">
        <input :type="type" :id="id" :name="name" :value="inputValue" :checked="isChecked" @change="onChange" v-bind="$attrs" />
        <span class="label">{{ onLabel }}</span><span class="label">{{ offLabel }}</span>
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
            required: true
        },
        value: {
            type: [String, Array, Boolean],
            required: true
        },
        inputValue: {
            type: String,
            required: true
        },
        onLabel: {
            type: String,
            required: true
        },
        offLabel: {
            type: String,
            required: true
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
                this.$emit('input', e.target.checked)
            } else if (typeof this.value === 'string') {
                this.$emit('input', e.target.value)
            } else {
                let values = [...this.value]
                if (e.target.checked) {
                    values.push(e.target.value)
                } else {
                    values = values.filter(value => value !== e.target.value)
                }
                this.$emit('input', values)
            }
        }
    }
}
</script>

<style lang="scss">
/* begin toggle-switch --------------------------------------------------------------------------------------------------------------------------------------------------- */
.toggle-switch {
    &.switch-label {
        &.colored {
            &.on {
                border-color: var(--success-color);

                span {
                    color: var(--success-color);

                    &::before {
                        background-color: var(--success-color);
                    }
                }
            }

            &.off {
                border-color: var(--error-color);
                color: var(--error-color);

                span::before {
                    background-color: var(--error-color);
                }

                > input[type="radio"] {
                    & ~ span::before {
                        background: none;
                        border: var(--error-border);
                    }
                }
            }
        }

        &.error {
            border-color: var(--error-color);

            input:not(:checked) {
                & + .label::before {
                    border-color: var(--error-color);
                    background: var(--error-color);
                }
            }
        }
    }
}
/* end toggle-switch --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>