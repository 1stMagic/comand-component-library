<template>
    <label v-if="(element === 'input' || element === 'select' || element === 'textarea')"
           :for="id"
           :class="['cmd-form-element', status, {'inline' : displayLabelInline, 'checked': isChecked}]"
           ref="label">
        <!-- begin label (+ required) -->
        <span v-if="labelText && $attrs.type !== 'checkbox' && $attrs.type !== 'radio'"
              :class="{'hidden': hideLabel}">
          <span>{{ labelText }}</span>
          <sup v-if="$attrs.required">*</sup>
        </span>
        <!-- end label (+ required) -->

        <!-- begin icon -->
        <span v-if="$attrs.type !== 'checkbox' && $attrs.type !== 'radio' && innerIconClass" class="place-inside"
              :class="[status, innerIconClass]"></span>
        <!-- end icon -->

        <!-- begin inputfield -->
        <template
            v-if="element === 'input' && $attrs.type !== 'checkbox' && $attrs.type !== 'radio' && $attrs.type !== 'search'">
            <input v-bind="$attrs"
                   :id="id" :class="htmlClass"
                   @focus="tooltip = true"
                   @blur="tooltip = false"
                   @input="onInput"
                   @mouseover="datalistFocus"
                   @change="$emit('change', $event)"
                   :autocomplete="datalist ? 'off' : 'on'"
                   :list="datalist ? datalist.id : false"
                   :disabled="status === 'disabled'"
                   :value="value"
            />
        </template>
        <!-- end inputfield -->

        <!-- begin datalist -->
        <template v-if="datalist && datalist.options.length">
            <datalist :id="datalist.id">
                <option v-for="(option, index) in datalist.options" :key="index" :value="option"></option>
            </datalist>
        </template>
        <!-- end datalist -->

        <!-- begin checkbox and radiobutton -->
        <template v-else-if="element === 'input' && ($attrs.type === 'checkbox' || $attrs.type === 'radio')">
            <input v-bind="$attrs"
                   @change="onChange"
                   :checked="isChecked"
                   :value="inputValue"
                   :class="[htmlClass, status, { 'replace-input-type': replaceInputType }]"
                   :id="id"
                   :disabled="status === 'disabled'"
                   :aria-invalid="status === 'error'"
                   :aria-describedby="`status-message-${id}`"
            />
            <span v-if="labelText">
        <span>{{ labelText }}</span>
        <sup v-if="$attrs.required">*</sup>
      </span>
            <slot v-else></slot>
        </template>
        <!-- end checkbox and radiobutton -->

        <!-- begin selectbox -->
        <select v-if="element === 'select'"
                v-bind="$attrs"
                :id="id"
                :disabled="status === 'disabled'"
                @change="$emit('input', $event.target.value)"
        >
            <option v-for="(option, index) in selectOptions" :key="index" :value="option.value"
                    :selected="option.value === value">{{ option.text }}
            </option>
        </select>
        <!-- end selectbox -->

        <!-- begin textarea -->
        <textarea v-if="element === 'textarea'"
                  v-bind="$attrs"
                  :id="id"
                  :disabled="status === 'disabled'"
                  :value="value"
                  @input="onInput"
                  @focus="tooltip = true"
                  @blur="tooltip = false">
        </textarea>
        <!-- end textarea -->

        <!-- begin tooltip -->
        <CmdTooltip v-if="tooltip && tooltipText" :tooltipText="tooltipText"/>
        <!-- end tooltip -->

        <!-- begin searchfield -->
        <span v-else-if="element === 'input' && $attrs.type === 'search'" class="flex-container no-gap">
      <input v-bind="$attrs" :id="id" @input="onInput" :value="value"/>
      <button class="no-flex" type="button" :disabled="status === 'disabled'">
        <span class="icon-search"></span>
      </button>
    </span>
        <!-- end searchfield -->
    </label>

    <!-- begin button -->
    <button v-else class="button" v-bind="$attrs" :disabled="status === 'disabled'">
        <span v-if="buttonIcon.iconPosition === 'before'" :class="buttonIcon.iconClass"></span>
        <span v-if="buttonIcon.iconPosition">{{ buttonText }}</span>
        <template v-else>
            {{ buttonText }}
        </template>
        <span v-if="buttonIcon.iconPosition === 'after'" :class="buttonIcon.iconClass"></span>
    </button>
    <!-- end button -->
</template>

<script>
import CmdTooltip from "./CmdTooltip"

export default {
    inheritAttrs: false,
    name: "FormElement",
    components: {
        CmdTooltip
    },
    data() {
        return {
            tooltip: false
        }
    },
    props: {
        /**
         * set value for v-model
         */
        value: {
            type: [String, Boolean, Array, Number],
            default: ""
        },
        /**
         * set type of native form-element
         *
         * values: input, select, textarea, button
         */
        element: {
            type: String,
            validator(value) {
                return value === "input" ||
                    value === "select" ||
                    value === "textarea" ||
                    value === "button";
            },
            required: true
        },
        /**
         * hide label (and asterisk if mandatory)
         *
         * label may not be removed, because it is required for accessibility
         */
        hideLabel: {
            type: Boolean,
            default: false
        },
        /**
         * text for label
         */
        labelText: {
            type: String,
            required: false
        },
        /**
         * allow checkbox/radio-buttons to get value from outside
         */
        inputValue: {
            type: String,
            required: false
        },
        /**
         * for replacing native checkboxes/radio-buttons by custom ones (based on frontend-framework)
         */
        replaceInputType: {
            type: Boolean,
            default: false
        },
        /**
         * set an optional class on native form-element (use native class="" on component ot set class on outer-component-element)
         *
         * may not be named as 'class' because it is a reserved keyword in JavaScript
         */
        htmlClass: {
            type: String,
            required: false
        },
        /**
         * if for native form-element
         */
        id: {
            type: String,
            required: false
        },
        /**
         * set if a native datalist should be used
         */
        datalist: {
            type: Object,
            required: false
        },
        /**
         * list of options for selectbox
         *
         * element-property must be 'select'
         */
        selectOptions: {
            type: Array,
            required: false
        },
        /**
         * text for native button
         */
        buttonText: {
            type: String,
            required: false
        },
        /**
         * set icon for native button
         */
        buttonIcon: {
            type: Object,
            default() {
                return {}
            }
        },
        /**
         * set text for tooltip
         */
        tooltipText: {
            type: String,
            required: false
        },
        /**
         * set class for inner icon (icon placed 'inside' input/ left of input-text)
         *
         * element-property must be 'input' and type-property may not be checkbox or radio
         */
        innerIconClass: {
            type: String,
            required: false
        },
        /**
         * activate if label-text should be place inline/left of form-element (and not above)
         *
         * type-property may not be checkbox or radio
         */
         displayLabelInline: {
            type: Boolean,
            required: false
        },
        /**
         * set status for label and form-element
         *
         * values: error (red-styling), success (green-styling)
         */
        status: {
            type: String,
            required: false
        }
    },
    computed: {
        isChecked() {
            if (typeof this.value === "boolean") {
                return this.value
            }
            if (typeof this.value === "string") {
                return this.value === this.inputValue
            }
            if (typeof this.value === "number") {
                return this.value === this.inputValue
            }
            if (this.value !== undefined) {
                return this.value.includes(this.inputValue)
            }
            return false
        }
    },
    methods: {
        onChange(e) {
            if (typeof this.value === "boolean") {
                this.$emit("update:value", e.target.checked)
            } else if (typeof this.value === "string") {
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
        datalistFocus() {
            /* corrects focus-bug for datalist in firefox */
            if (this.datalist) {
                this.$refs.label.focus()
            }
        },
        onInput(e) {
            this.$emit('update:value', e.target.value)
        }
    }
}
</script>
