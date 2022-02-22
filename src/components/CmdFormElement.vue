<template>
    <label v-if="(element === 'input' || element === 'select' || element === 'textarea')"
           :class="[
            'cmd-form-element',
             validationStatus,
           {
            disabled: $attrs.disabled,
            inline : displayLabelInline,
            checked: isChecked,
            'toggle-switch-label': toggleSwitch,
            colored: colored,
            on: colored && isChecked,
            off: colored && !isChecked,
            'has-state': validationStatus
           }]"
           :for="id"
           ref="label">

        <!-- begin label-text (+ required asterisk) -->
        <span v-if="labelText && $attrs.type !== 'checkbox' && $attrs.type !== 'radio'"
              :class="!showLabel ? 'hidden' : undefined">
              <span>
                  {{ labelText }}<sup v-if="$attrs.required">*</sup>
              </span>
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
        <!-- end label-text (+ required asterisk) -->


        <!-- begin icon -->
        <span
            v-if="
        $attrs.type !== 'checkbox' &&
          $attrs.type !== 'radio' &&
          fieldIconClass
      "
            :class="['place-inside', fieldIconClass]"
        ></span>
        <!-- end icon -->

        <!-- begin inputfield -->
        <template
            v-if="element === 'input' && $attrs.type !== 'checkbox' && $attrs.type !== 'radio' && $attrs.type !== 'search'">
            <input v-bind="$attrs"
                   :id="id"
                   :class="htmlClass"
                   @focus="tooltip = true"
                   @blur="onBlur"
                   @input="onInput"
                   @mouseover="datalistFocus"
                   @keyup="checkForCapsLock"
                   :autocomplete="datalist ? 'off' : 'on'"
                   :list="datalist ? datalist.id : false"
                   :value="value"
                   :maxlength="$attrs.maxlength > 0 ? $attrs.maxlength : 255"
                   ref="input"
            />
        </template>
        <!-- end inputfield -->

        <!-- begin show-password-icon -->
        <a v-if="$attrs.type === 'password'"
           href="#"
           class="place-inside icon-visible"
           @mousedown.prevent="showPassword"
           @mouseup.prevent="hidePassword"
           @mouseleave.prevent="hidePassword"
           @click.prevent
           title="Toggle password visibility">
        </a>
        <!-- end show-password-icon -->

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
                   @blur="onBlur"
                   :checked="isChecked"
                   :role="$attrs.type"
                   :aria-checked="isChecked"
                   :value="inputValue"
                   :class="[htmlClass, validationStatus, { 'replace-input-type': replaceInputType, 'toggle-switch': toggleSwitch }]"
                   :id="id"
                   :aria-invalid="validationStatus === 'error'"
                   :aria-describedby="`status-message-${id}`"
            />

            <!-- begin labels for toggle-switch -->
            <span v-if="!(onLabel && offLabel)" :class="{ hidden: !showLabel }">
                <span v-if="labelText">{{ labelText }}<sup v-if="$attrs.required">*</sup></span>
            </span>
            <template v-else-if="onLabel && offLabel">
                <span v-if="labelText">
                    <span>{{ labelText }}<sup v-if="$attrs.required">*</sup></span>
                </span>
                <div class="toggle-switch switch-label">
                    <span class="label">{{ onLabel }}</span>
                    <span class="label">{{ offLabel }}</span>
                </div>
            </template>
            <slot v-else></slot>
            <!-- end labels for toggle-switch -->
        </template>
        <!-- end checkbox and radiobutton -->

        <!-- begin selectbox -->
        <select v-if="element === 'select'"
                v-bind="$attrs"
                :id="id"
                @blur="onBlur"
                @change="$emit('input', $event.target.value)">
            <option v-for="(option, index) in selectOptions" :key="index" :value="option.value"
                    :selected="option.value === value">{{ option.text }}
            </option>
        </select>
        <!-- end selectbox -->

        <!-- begin textarea -->
        <textarea v-if="element === 'textarea'"
                  v-bind="$attrs"
                  :id="id"
                  :value="value"
                  :maxlength="getMaxLength"
                  @input="onInput"
                  @focus="tooltip = true"
                  @blur="onBlur">
        </textarea>
        <span v-if="element === 'textarea' && showCharactersTextarea">{{ charactersTextarea }}</span>
        <!-- end textarea -->

        <!-- begin searchfield -->
        <span v-else-if="element === 'input' && $attrs.type === 'search'" class="flex-container no-gap">
            <input
                v-bind="$attrs"
                :id="id"
                @input="onInput"
                :maxlength="$attrs.maxlength > 0 ? $attrs.maxlength : 255"
                :value="value"/>
            <button class="no-flex" type="button">
                <span class="icon-search"></span>
            </button>
        </span>
        <!-- end searchfield -->
    </label>

    <!-- begin button -->
    <button v-else class="button" v-bind="$attrs">
        <span v-if="nativeButton?.icon?.show && nativeButton?.icon?.position === 'before'" :class="nativeButton?.icon?.iconClass"></span>
        <span v-if="nativeButton?.icon && nativeButton?.text">{{ nativeButton.text }}</span>
        <template v-else>
            {{ nativeButton.text }}
        </template>
        <span v-if="nativeButton?.icon?.show && nativeButton?.icon?.position === 'after'" :class="nativeButton?.icon?.iconClass"></span>
    </button>
    <!-- end button -->

    <!-- begin tooltip -->
    <CmdTooltip v-if="useCustomTooltip" class="box" :class="validationStatus" :relatedId="tooltipId" :toggle-visibility-by-click="true">
        <CmdSystemMessage v-if="getValidationMessage" :message="getValidationMessage" :status="validationStatus" :iconClose="{show: false}"/>
        <template v-if="showRequirements && (validationStatus === '' || validationStatus === 'error')">
            <!-- begin list of requirements -->
            <h6>Requirements for input<br/>"{{ labelText }}"</h6>
            <dl class="list-of-requirements">
                <template v-for="(requirement, index) in inputRequirements" :key="index">
                    <dt aria-live="assertive" :class="requirement.valid(value, $attrs) ? 'success' : 'error'">{{ requirement.message }}:</dt>
                    <dd :class="requirement.valid(value, $attrs) ? 'success' : 'error'">
                        <span aria-live="assertive" :class="requirement.valid(value, $attrs) ? 'icon-check-circle' : 'icon-error-circle'"
                              :title="requirement.valid(value, $attrs) ? 'success' : 'error'"></span>
                    </dd>
                </template>
            </dl>
            <!-- end list of requirements -->

            <!-- begin helplink -->
            <hr v-if="helplink?.show"/>
            <a v-if="helplink?.show && helplink?.url" :href="helplink.url" :target="helplink.target" @click.prevent>
                <span v-if="helplink.icon?.iconClass" :class="helplink.icon?.iconClass" :title="helplink.icon?.tooltip"></span>
                <span v-if="helplink.text">{{ helplink.text }}</span>
            </a>
            <!-- end helplink -->
        </template>
    </CmdTooltip>
    <!-- end tooltip -->
</template>

<script>
// import mixins
import FieldValidation from "../mixins/FieldValidation.js"
import Tooltip from "../mixins/Tooltip.js"

// import components
import CmdTooltip from "./CmdTooltip"
import CmdSystemMessage from "./CmdSystemMessage";

export default {
    inheritAttrs: false,
    name: "FormElement",
    components: {
        CmdSystemMessage,
        CmdTooltip
    },
    mixins: [FieldValidation, Tooltip],
    data() {
        return {
            errorOccurred: 0
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
         * @allowedValues: input, select, textarea, button
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
        showLabel: {
            type: Boolean,
            default: true
        },
        /**
         * text for label
         */
        labelText: {
            type: String,
            required: false
        },
        /**
         * set to activate to use toggle-switch-styling
         *
         * element-prop must be set to "input" and type-attribute must be set to "checkbox" or "radio"
         */
        toggleSwitch: {
            type: Boolean,
            default: false
        },
        /**
         * text for on-label
         *
         * set to activate switch-label (=label is placed on toggle-switch (not behind))
         * toggleSwitch-prop must be set to "true"
         * element-prop must be set to "input" and type-attribute must be set to "checkbox" or "radio"
         */
        onLabel: {
            type: String,
            required: false
        },
        /**
         * text for off-label
         *
         * set to activate switch-label (=label is placed on toggle-switch (not behind))
         * toggleSwitch-prop must be set to "true"
         * element-prop must be set to "input" and type-attribute must be set to "checkbox" or "radio"
         */
        offLabel: {
            type: String,
            required: false
        },
        /**
         * on/off-, yes/no-color-styling
         *
         * set to true, if checkbox/radio-buttons should have green/checked and red/unchecked color-coding
         * toggleSwitch-prop must be set to "true"
         * element-prop must be set to "input" and type-attribute must be set to "checkbox" or "radio"
         */
        colored: {
            type: Boolean,
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
         * native button
         */
        nativeButton: {
            type: Object,
            default() {
                return {
                    text: "",
                    icon: {
                        show: true,
                        iconClass: "",
                        position: "left",
                        tooltip: ""
                    }
                }
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
        fieldIconClass: {
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
         * @allowedValues: error, success
         */
        status: {
            type: String,
            required: false
        },
        /**
         * toggle display of number of used and allowed characters for textarea
         *
         * type-property must be set to textarea
         */
        showCharactersTextarea: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        tooltipHeadline() {
            return {
                text: this.labelText,
                level: "5"
            }
        },
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
        },
        charactersTextarea() {
            return "Characters: " + this.value.length + "/" + this.getMaxLength()
        },
        validationTooltip() {
            if (!this.useCustomTooltip) {
                return this.getValidationMessage
            }

            // set default-tooltip if customTooltip is not set
            if (this.validationStatus === 'error') {
                return "An error occurred!"
            } else if (this.validationStatus === 'success') {
                return "This information is filled correctly!"
            } else if (this.capsLockActivated) {
                return "Attention: Caps lock is activated!"
            }
            return "Open field requirements!"
        }
    },
    methods: {
        getDomElement() {
            return this.$refs.label
        },
        getMaxLength() {
            return this.$attrs.maxlength > 0 ? this.$attrs.maxlength : 5000
        },
        onBlur(event) {
            // check if surrounding form with data-use-validation exists
            const useValidation = event.target.closest("form")?.dataset.useValidation === "true"

            if (useValidation) {
                this.tooltip = false
                this.validationStatus = ""

                // if input is filled, set status to success (expect for checkboxes and radiobuttons)
                if (!["checkbox", "radio"].includes(this.$attrs.type) && this.value) {
                    this.validationStatus = "success"
                }

                if (typeof event.target.checkValidity === "function" && !event.target.checkValidity()) {
                    this.validationStatus = "error"
                } else {
                    if (this.customRequirements) {
                        // check if customRequirement returns invalid result
                        const invalidCustomRequirement = this.customRequirements.some(requirement => {
                            return !requirement.valid(this.value)
                        })

                        // set validation-status if invalidCustomRequirement returns at least one invalid entry
                        if (invalidCustomRequirement) {
                            this.validationStatus = "error"
                        }
                    }
                }
            }
        },
        onChange(event) {
            if (typeof this.value === "boolean") {
                this.$emit("update:value", event.target.checked)
            } else if (typeof this.value === "string") {
                this.$emit("update:value", event.target.value)
            } else if (this.value !== undefined) {
                let values = [...this.value]
                if (event.target.checked) {
                    values.push(event.target.value)
                } else {
                    values = values.filter(value => value !== event.target.value)
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
        onInput(event) {
            this.$emit('update:value', event.target.value)
        },
        showPassword() {
            // get password-field
            const passwordField = this.$refs.input

            // get value of password field (to save it temporary)
            const password = passwordField.value

            // toggle input-type to make password visible
            passwordField.nextElementSibling.classList.replace("icon-visible", "icon-not-visible")
            passwordField.setAttribute("type", "text")

            // assign saved password back to field
            passwordField.setAttribute("value", password)
        },
        hidePassword() {
            this.$refs.input.nextElementSibling.classList.replace("icon-not-visible", "icon-visible")
            this.$refs.input.setAttribute("type", "password")
        }
    },
    watch: {
        status: {
            handler() {
                this.validationStatus = this.status
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss">
.cmd-form-element {
    input + .place-inside[class*="icon"] {
        left: auto;
        right: .5rem
    }

    &.has-state, & + .cmd-tooltip {
        &.error {
            --status-color: var(--error-color);
        }

        &.warning {
            --status-color: var(--warning-color);
        }

        &.success {
            --status-color: var(--success-color);
        }

        &.info {
            --status-color: var(--info-color);
        }

        ::placeholder {
            color: var(--status-color);
        }

        > span {
            color: var(--status-color);

            &[class*="icon-"].place-inside {
                color: var(--status-color);
            }
        }
    }

    & + .cmd-tooltip {
        border-color: var(--status-color);
    }

    &.inline {
        & > span {
            & > a {
                margin-left: calc(var(--default-margin) / 2);
            }
        }
    }

    /* begin toggle-switch */
    /* no cmd-prefix-styling (class based on frontend-framework */
    &.toggle-switch {
        &.switch-label {
            input {
                & + .label {
                    padding-right: calc(var(--default-padding) / 3 * 2);

                    &::before {
                        top: 0.2rem;
                    }

                    & + .label {
                        padding-left: calc(var(--default-padding) / 3 * 2);

                        &::before {
                            top: 0.2rem;
                        }
                    }
                }
            }

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

    /* end toggle-switch ------------------------------------------------------------------------------------------ */
}
</style>
