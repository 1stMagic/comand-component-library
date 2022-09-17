<template>
    <label v-if="(element === 'input' || element === 'select' || element === 'textarea')"
           :class="[
            'cmd-form-element',
             validationStatus,
             $attrs.class,
               {
                disabled: $attrs.disabled,
                inline : displayLabelInline,
                checked: isChecked,
                'toggle-switch': toggleSwitch,
                colored: colored,
                on: colored && isChecked,
                off: colored && !isChecked,
                'has-state': validationStatus
               }
           ]"
           :for="htmlId"
           :title="$attrs.title"
           ref="label">

        <!-- begin label-text (+ required asterisk) -->
        <span v-if="(labelText || $slots.labeltext) && $attrs.type !== 'checkbox' && $attrs.type !== 'radio'"
              v-show="showLabel"
              class="label-text">
            <span>
                <template v-if="labelText">{{ labelText }}</template>
                <!-- begin slot 'labeltext' -->
                <slot v-else name="labeltext" />
                <!-- end slot 'labeltext' -->
                <sup v-if="$attrs.required">*</sup>
            </span>

            <!-- begin CmdTooltipForInputElements -->
            <CmdTooltipForInputElements
                v-if="useCustomTooltip && (validationStatus === '' || validationStatus === 'error')"
                ref="tooltip"
                :validationStatus="validationStatus"
                :validationMessage="getValidationMessage"
                :relatedId="tooltipId"
                :cmdListOfRequirements="listOfRequirements"
                :role="validationStatus === 'error' ? 'alert' : 'dialog'"
            />
            <!-- end CmdTooltipForInputElements -->

            <a v-if="$attrs.required || inputRequirements.length"
                href="#"
                @click.prevent
                :class="getStatusIconClass"
                :title="validationTooltip"
                :aria-errormessage="tooltipId"
                aria-live="assertive"
                :id="tooltipId">
            </a>
        </span>
        <!-- end label-text (+ required asterisk) -->

        <!-- begin icon inside field -->
        <span v-if="$attrs.type !== 'checkbox' && $attrs.type !== 'radio' && fieldIconClass" :class="['place-inside', fieldIconClass]"></span>
        <!-- end icon inside field -->

        <!-- begin inputfield -->
        <template v-if="element === 'input' && $attrs.type !== 'checkbox' && $attrs.type !== 'radio' && $attrs.type !== 'search'">
            <input
                v-bind="elementAttributes"
                :id="htmlId"
                :class="inputClass"
                @focus="tooltip = true"
                @blur="onBlur"
                @input="onInput"
                @mouseover="datalistFocus"
                @keyup="checkForCapsLock"
                @change="$emit('change', $event)"
                :autocomplete="autocomplete"
                :list="datalist ? datalist.id : null"
                :value="modelValue"
                :maxlength="getMaxLength()"
                ref="input"
            />
        </template>
        <!-- end inputfield -->

        <!-- begin show-password-icon -->
        <a v-if="$attrs.type === 'password'"
           href="#"
           :class="['place-inside', iconPasswordVisible.iconClass]"
           @mousedown.prevent="showPassword"
           @mouseup.prevent="hidePassword"
           @mouseleave.prevent="hidePassword"
           @click.prevent
           :title="iconPasswordVisible.tooltip">
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
            <template v-if="!(onLabel && offLabel)">
                <input
                    v-bind="elementAttributes"
                    @change="onChange"
                    @blur="onBlur"
                    :checked="isChecked"
                    :value="inputValue"
                    :class="[inputClass, validationStatus, toggleSwitchIconClass, { 'replace-input-type': replaceInputType, 'toggle-switch': toggleSwitch }]"
                    :id="htmlId"
                    :disabled="$attrs.disabled"
                    :aria-invalid="validationStatus === 'error'"
                />
                <span v-if="labelText || $slots.labeltext" :class="['label-text', { hidden: !showLabel }]">
                    <span>
                        <template v-if="labelText">{{ labelText }}</template>
                        <!-- begin slot 'labeltext' -->
                        <slot v-else name="labeltext" />
                        <!-- end slot 'labeltext' -->
                        <sup v-if="$attrs.required">*</sup>
                    </span>
                </span>
            </template>

            <!-- begin labels for toggle-switch with switch-label -->
            <template v-else-if="onLabel && offLabel">
                <span class="switch-label-wrapper">
                    <input v-bind="elementAttributes"
                           @change="onChange"
                           @blur="onBlur"
                           :checked="isChecked"
                           :value="inputValue"
                           :class="{inputClass, validationStatus}"
                           :id="htmlId"
                           :disabled="$attrs.disabled"
                           :aria-invalid="validationStatus === 'error'"
                    />
                    <span class="label-text">{{ onLabel }}</span>
                    <span class="label-text">{{ offLabel }}</span>
                </span>
                <span v-if="labelText" class="label-text">
                    <span>{{ labelText }}<sup v-if="$attrs.required">*</sup></span>
                </span>
            </template>
            <slot v-else></slot>
            <!-- end labels for toggle-switch with switch-label -->
        </template>
        <!-- end checkbox and radiobutton -->

        <!-- begin selectbox -->
        <select v-if="element === 'select'"
                v-bind="elementAttributes"
                :id="htmlId"
                @blur="onBlur"
                @change="$emit('update:modelValue', $event.target.value)">
            <option v-for="(option, index) in selectOptions" :key="index" :value="option.value"
                    :selected="option.value === modelValue">{{ option.text }}
            </option>
        </select>
        <!-- end selectbox -->

        <!-- begin textarea -->
        <textarea v-if="element === 'textarea'"
                  v-bind="elementAttributes"
                  :id="htmlId"
                  :value="modelValue"
                  :maxlength="getMaxLength()"
                  @input="onInput"
                  @focus="tooltip = true"
                  @blur="onBlur">
        </textarea>
        <span v-if="element === 'textarea' && showCharactersTextarea">{{ charactersTextarea }}</span>
        <!-- end textarea -->

        <!-- begin searchfield -->
        <template v-else-if="element === 'input' && $attrs.type === 'search'">
            <span class="search-field-wrapper flex-container no-gap">
                <input
                    v-bind="elementAttributes"
                    :id="htmlId"
                    @input="onInput"
                    :maxlength="getMaxLength()"
                    :value="modelValue"
                />
                <a v-if="showSearchButton" href="#" :class="['button no-flex', {disabled: $attrs.disabled}]" :title="iconSearch.tooltip" @click.prevent="executeSearch">
                    <span :class="iconSearch.iconClass"></span>
                </a>
                <a v-if="iconDelete.show" href="#" @click.prevent="$emit('update:modelValue', '')" :class="iconDelete.iconClass" :title="iconDelete.tooltip"></a>
            </span>
        </template>
    </label>
    <!-- end searchfield -->

    <!-- begin button -->
    <button v-else class="button" v-bind="buttonAttrs">
        <span v-if="nativeButton?.icon?.show && (nativeButton?.icon?.position === 'before' || !nativeButton?.icon?.position)" :class="nativeButton?.icon?.iconClass"></span>
        <span v-if="nativeButton?.icon && nativeButton?.text">{{ nativeButton.text }}</span>
        <template v-else>
            {{ nativeButton.text }}
        </template>
        <span v-if="nativeButton?.icon?.show && nativeButton?.icon?.position === 'after'" :class="nativeButton?.icon?.iconClass"></span>
    </button>
    <!-- end button -->
</template>

<script>
// import mixins
import I18n from "../mixins/I18n"
import DefaultMessageProperties from "../mixins/CmdFormElement/DefaultMessageProperties"
import FieldValidation from "../mixins/FieldValidation.js"
import Identifier from "../mixins/Identifier.js"
import Tooltip from "../mixins/Tooltip.js"

// import components
import CmdTooltipForInputElements from "./CmdTooltipForInputElements"

export default {
    inheritAttrs: false,
    name: "CmdFormElement",
    components: {
        CmdTooltipForInputElements
    },
    mixins: [
        I18n,
        DefaultMessageProperties,
        FieldValidation,
        Identifier,
        Tooltip
    ],
    data() {
        return {
            errorOccurred: 0
        }
    },
    props: {
        /**
         * set value for v-model (must be named modelValue in vue3 if default v-model should be used)
         */
        modelValue: {
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
         *
         * @requiredForAccessibility: true
         */
        labelText: {
            type: String,
            required: false
        },
        /**
         * set to activate to use toggle-switch-styling
         *
         * element-prop must be set to "input" and type-attribute must be set to "checkbox" or "radio"
         *
         * @affectsStyling: true
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
         *
         * @affectsStyling: true
         */
        colored: {
            type: Boolean,
            required: false
        },
        /**
         * allow checkbox/radio-buttons to get value from outside
         */
        inputValue: {
            type: [String, Number],
            required: false
        },
        /**
         * for replacing native checkboxes/radio-buttons by custom ones (based on frontend-framework)
         *
         * @affectsStyling: true
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
        inputClass: {
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
         * @allowedValues: error, warning, success, info
         *
         * @affectsStyling: true
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
        },
        /**
         * text shown in front of character-count below textarea
         *
         * type-property must be set to textarea
         * showCharactersTextarea-property must be activated
         */
        textCharacters: {
            type: String,
            default: "Characters"
        },
        /**
         * toggle visibility of search-button (next to search-field)
         */
        showSearchButton: {
            type: Boolean,
            default: true
        },
        /**
         * icon to delete search term
         *
         * element-property must me set to 'input'
         * type-property must be set to 'search'
         *
         */
        iconDelete: {
            type: Object,
            default() {
                return {
                    show: true,
                    iconClass: "icon-cancel-circle",
                    tooltip: "Delete term"
                }
            }
        },
        /**
         * icon to search term
         *
         * element-property must me set to 'input'
         * type-property must be set to 'search'
         *
         */
        iconSearch: {
            type: Object,
            default() {
                return {
                    show: true,
                    iconClass: "icon-search",
                    tooltip: "Search"
                }
            }
        },
        /**
         * icon for error-validated items in list-of-requirements
         *
         * element-property must me set to 'input'
         * showRequirements-subproperty (of CmdListOfRequirements)  must be set to 'true'
         *
         */
        iconHasStateError: {
            type: Object,
            default() {
                return {
                    show: true,
                    iconClass: "icon-error-circle",
                    tooltip: "Error"
                }
            }
        },
        /**
         * icon for warning-validated items in list-of-requirements
         *
         * element-property must me set to 'input'
         * showRequirements-subproperty (of CmdListOfRequirements)  must be set to 'true'
         *
         */
        iconHasStateWarning: {
            type: Object,
            default() {
                return {
                    show: true,
                    iconClass: "icon-warning-circle",
                    tooltip: "Warning"
                }
            }
        },
        /**
         * icon for success-validated items in list-of-requirements
         *
         * element-property must me set to 'input'
         * showRequirements-subproperty (of CmdListOfRequirements)  must be set to 'true'
         *
         */
        iconHasStateSuccess: {
            type: Object,
            default() {
                return {
                    show: true,
                    iconClass: "icon-check-circle",
                    tooltip: "Success"
                }
            }
        },
        /**
         * icon for info-validated items in list-of-requirements
         *
         * element-property must me set to 'input'
         * showRequirements-subproperty (of CmdListOfRequirements) must be set to 'true'
         *
         */
        iconHasStateInfo: {
            type: Object,
            default() {
                return {
                    show: true,
                    iconClass: "icon-info-circle",
                    tooltip: "Info"
                }
            }
        },
        /**
         * toggle if toggle-switch shows icons for checked/unchecked-status
         */
        useIconsForToggleSwitch: {
            type: Boolean,
            default: false
        },
        /**
         * icon for toggle-switch checked
         *
         * toggle-switch-property must be activated
         * use-icons-for-toggle-switch-property must be activated
         */
        toggleSwitchCheckedIconClass: {
            type: String,
            default: "icon-check-circle"
        },
        /**
         * icon for toggle-switch unchecked
         *
         * toggle-switch-property must be activated
         * use-icons-for-toggle-switch-property must be activated
         */
        toggleSwitchUncheckedIconClass: {
            type: String,
            default: "icon-cancel-circle"
        },
        /**
         * icon to toggle password-visibility
         *
         * element-property must me set to 'input'
         * type-property must be set to 'password'
         *
         */
        iconPasswordVisible: {
            type: Object,
            default() {
                return {
                    show: true,
                    iconClass: "icon-visible",
                    tooltip: "Show password"
                }
            }
        },
        /**
         * icon to toggle password-visibility
         *
         * element-property must me set to 'input'
         * type-property must be set to 'password'
         *
         */
        iconPasswordInvisible: {
            type: Object,
            default() {
                return {
                    show: true,
                    iconClass: "icon-not-visible",
                }
            }
        }
    },
    computed: {
        elementAttributes() {
            const commonAttributes = ["name", "required", "readonly", "disabled", "autofocus"]
            const attributes = {
                input: [...commonAttributes, "type", "minlength", "pattern", "min", "max", "multiple", "step", "autocomplete", "placeholder"],
                select: [...commonAttributes, "multiple"],
                textarea: [...commonAttributes, "placeholder"]
            }
            const attrs = {}
            if (attributes[this.element]) {
                Object.entries(this.$attrs).filter(([name]) => attributes[this.element].includes(name)).forEach(([name, value]) => attrs[name] = value)
            }
            return attrs
        },
        buttonAttrs() {
            // copy all native attributes
            const allAttrs = {...this.$attrs}

            // check if specific tooltip for icon is set (and add as title-attribute)
            if (this.nativeButton.icon?.tooltip) {
                allAttrs.title = this.nativeButton.icon?.tooltip
            }

            return allAttrs
        },
        tooltipHeadline() {
            return {
                text: this.labelText,
                level: "5"
            }
        },
        isChecked() {
            if (typeof this.modelValue === "boolean") {
                return this.modelValue
            }
            if (typeof this.modelValue === "string") {
                return this.modelValue === this.inputValue
            }
            if (typeof this.modelValue === "number") {
                return this.modelValue === this.inputValue
            }
            if (this.modelValue !== undefined) {
                return this.modelValue.includes(this.inputValue)
            }
            return false
        },
        charactersTextarea() {
            return this.textCharacters + " " + this.modelValue.length + "/" + this.getMaxLength()
        },
        validationTooltip() {
            if (!this.useCustomTooltip) {
                return this.getValidationMessage
            }

            // set default-tooltip if customTooltip is not set
            if (this.validationStatus === 'error') {
                return this.getMessage("cmdformelement.validationTooltip.an_error_occurred")
            } else if (this.validationStatus === 'success') {
                return this.getMessage("cmdformelement.validationTooltip.information_is_filled_correctly")
            } else if (this.capsLockActivated) {
                return this.getMessage("cmdformelement.validationTooltip.caps_lock_is_activated")
            }
            return this.getMessage("cmdformelement.validationTooltip.open_field_requirements")
        },
        autocomplete() {
            if (this.$attrs.type !== 'file') {
                return this.datalist ? 'off' : 'on'
            }
            return null
        },
        // toggle icons for toggle-switch
        toggleSwitchIconClass() {
            if(this.toggleSwitch && this.useIconsForToggleSwitch && this.toggleSwitchUncheckedIconClass && this.toggleSwitchCheckedIconClass) {
                if(this.isChecked) {
                    return this.toggleSwitchCheckedIconClass
                }
                return this.toggleSwitchUncheckedIconClass
            }
            return null
        }
    },
    methods: {
        additionalStandardRequirements() {
            const requirements = []
            // check if field is type "email"
            if(this.$attrs.type === "email") {
                requirements.push({
                    message: this.getMessage("cmdformelement.validationTooltip.is_valid_email"),
                    valid: () => this.$refs.input.checkValidity()
                })
            }
            return requirements
        },
        getDomElement() {
            return this.$refs.label
        },
        // define max-length for different input-types
        getMaxLength() {
            if (this.$attrs.element === 'textarea') {
                return this.$attrs.maxlength > 0 ? this.$attrs.maxlength : 5000
            }

            if (this.$attrs.type !== 'file' && this.$attrs.type !== 'number' && this.$attrs.type !== 'date') {
                return this.$attrs.maxlength > 0 ? this.$attrs.maxlength : 255
            }
            return null
        },
        validateInput(event) {
            // check if surrounding form with data-use-validation exists
            const useValidation = event.target.closest("form")?.dataset.useValidation === "true"

            if (useValidation) {
                // if input is filled, set status to success (expect for checkboxes and radiobuttons)
                if (!["checkbox", "radio"].includes(this.$attrs.type) && this.modelValue) {
                    this.validationStatus = "success"
                }

                if (typeof event.target.checkValidity === "function" && !event.target.checkValidity()) {
                    this.validationStatus = "error"
                } else {
                    if (this.customRequirements) {
                        // check if customRequirement returns invalid result
                        const invalidCustomRequirement = this.customRequirements.some(requirement => {
                            return !requirement.valid(this.modelValue)
                        })

                        // set validation-status if invalidCustomRequirement returns at least one invalid entry
                        if (invalidCustomRequirement) {
                            this.validationStatus = "error"
                        }
                    }
                }

                this.$emit('validation-status-change', this.validationStatus)
            }
        },
        onBlur(event) {
            this.validateInput(event)
            this.closeTooltipOnBlur()
        },
        onInput(event) {
            this.validateInput(event)
            this.$emit('update:modelValue', event.target.value)
        },
        onChange(event) {
            if (typeof this.modelValue === "boolean") {
                this.$emit("update:modelValue", event.target.checked)
            } else if (typeof this.modelValue === "string") {
                this.$emit("update:modelValue", event.target.value)
            } else if (this.modelValue !== undefined) {
                let values = [...this.modelValue]
                if (event.target.checked) {
                    values.push(event.target.value)
                } else {
                    values = values.filter(value => value !== event.target.value)
                }
                this.$emit("update:modelValue", values)
            }
        },
        datalistFocus() {
            /* corrects focus-bug for datalist in firefox */
            if (this.datalist) {
                this.$refs.label.focus()
            }
        },
        showPassword() {
            // get password-field
            const passwordField = this.$refs.input

            // get value of password field (to save it temporary)
            const password = passwordField.value

            // toggle input-type to make password visible
            passwordField.nextElementSibling.classList.replace(this.iconPasswordVisible.iconClass, this.iconPasswordInvisible.iconClass)
            passwordField.setAttribute("type", "text")

            // assign saved password back to field
            passwordField.setAttribute("value", password)
        },
        hidePassword() {
            this.$refs.input.nextElementSibling.classList.replace(this.iconPasswordInvisible.iconClass, this.iconPasswordVisible.iconClass)
            this.$refs.input.setAttribute("type", "password")
        },
        executeSearch() {
            this.$emit("search", this.value)
        },
        closeTooltipOnBlur() {
            // close tooltip by calling function from CmdTooltipForInputElements using $refs
            if(this.$refs.tooltip) {
                this.$refs.tooltip.hideTooltip()
            }
        }
    },
    watch: {
        status: {
            handler() {
                this.validationStatus = this.status || ""
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-form-element ------------------------------------------------------------------------------------------ */
.cmd-form-element {
    input + .place-inside[class*="icon"] {
        left: auto;
        right: .5rem
    }

    &.has-state, & + .cmd-tooltip {
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

    &.inline {
        & > span {
            & > a:not(.button) {
                margin-left: calc(var(--default-margin) / 2);
            }
        }
    }

    .search-field-wrapper {
        margin: 0;

        a[class*="icon"] {
            position: absolute;
            top: 50%;
            right: 1rem;
            transform: translateY(-50%);
            z-index: 100;
        }

        input:not(:only-child) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }

        a.button {
            & + a[class*="icon"] {
                right: 5rem;
            }
        }
    }

    .place-inside {
        + .search-field-wrapper {
            input {
                padding-left: calc(var(--default-padding) * 3);
            }
        }
    }

    /* begin toggle-switch */
    /* no cmd-prefix-styling (class based on frontend-framework) */
    &.toggle-switch {
        &.colored {
            &.off {
                .switch-label-wrapper {
                    border-color: var(--error-color);

                    span {
                        &.label-text {
                            color: var(--error-color);

                            &::before {
                                border-color: var(--error-color);
                                background-color: var(--pure-white);
                            }
                        }
                    }
                }
            }

            &.on {
                .switch-label-wrapper {
                    border-color: var(--success-color);

                    span {
                        &.label-text {
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
    /* end toggle-switch */
}
/* end cmd-form-element------------------------------------------------------------------------------------------ */
</style>
