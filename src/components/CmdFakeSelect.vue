<template>
    <div
        :class="[
            validationStatus,
            'cmd-fake-select label',
            {
                color: type === 'color',
                'has-state': validationStatus && validationStatus !== 'none',
                disabled: $attrs.disabled
            }
        ]"
        :title="$attrs.title"
        :aria-labelledby="labelId"
        :aria-required="$attrs.required !== undefined"
        ref="fakeselect"
    >
        <template v-if="showLabel">
            <!-- begin label -->
            <span class="label-text" :id="labelId">
                <span>{{ labelText }}<sup v-if="$attrs.required !== undefined">*</sup></span>

                <!-- begin CmdTooltipForInputElements -->
                <CmdTooltipForInputElements
                    v-if="useCustomTooltip && (validationStatus === '' || validationStatus === 'error')"
                    ref="tooltip"
                    :showRequirements="showRequirements"
                    :inputRequirements="inputRequirements"
                    :validationStatus="validationStatus"
                    :validationMessage="getValidationMessage"
                    :validationTooltip="validationTooltip"
                    :inputAttributes="$attrs"
                    :inputModelValue="modelValue"
                    :helplink="helplink"
                    :relatedId="tooltipId"
                />
                <!-- end CmdTooltipForInputElements -->

                <a v-if="$attrs.required || inputRequirements.length"
                   href="#"
                   @click.prevent
                   :class="getStatusIconClass"
                   :title="!useCustomTooltip ? getValidationMessage : ''"
                   :aria-errormessage="getValidationMessage"
                   aria-live="assertive"
                   :id="tooltipId"
                   :role="validationStatus === 'error' ? 'alert' : 'dialog'">
                </a>
            </span>
            <!-- end label -->
        </template>
        <ul :class="{'open': showOptions}" @clickout="closeOptions" :aria-expanded="showOptions">
            <li>
                <!-- begin default/selected-option -->
                <a href="#" @click.prevent="toggleOptions" @blur="onBlur">
                    <img v-if="type === 'country' && optionCountry" :src="pathFlag(optionCountry)" :alt="optionCountry" :class="['flag', optionCountry]"/>
                    <span v-else-if="type === 'color'" :style="'background: ' + optionColor"></span>
                    <span v-if="optionIcon" :class="optionIcon"></span>
                    <span class="option-name" :style="limitWidthStyle">{{ optionName }}</span>
                    <span v-if="dropdownIcon" :class="dropdownIcon.iconClass" :title="dropdownIcon.tooltip"></span>
                </a>
                <!-- end default/selected-option-->

                <!-- begin default dropdown (incl. optional icon) -->
                <ul v-if="type === 'default' && showOptions" role="listbox">
                    <li v-for="(option, index) in selectData" :key="index" role="option" :aria-selected="option.value === modelValue">
                        <!-- begin type 'href' -->
                        <a v-if="optionLinkType === 'href'" href="#" @click.prevent="selectOption(option.value)" :class="{'active' : option.value === modelValue}">
                            <span v-if="option.iconClass" :class="option.iconClass"></span>
                            <span>{{ option.text }}</span>
                        </a>
                        <!-- end type 'href' -->

                        <!-- begin type 'router' -->
                        <router-link v-if="optionLinkType === 'router'" to="#" @click.prevent="selectOption(option.value)" :class="{'active' : option.value === modelValue}">
                            <span v-if="option.iconClass" :class="option.iconClass"></span>
                            <span>{{ option.text }}</span>
                        </router-link>
                        <!-- end type 'router' -->
                    </li>
                </ul>
                <!-- end default dropdown (incl. optional icon) -->

                <!-- begin dropdown with checkboxes -->
                <ul v-else-if="type !== 'default' && type !== 'content' && showOptions" :class="{'checkbox-options': type === 'checkboxOptions'}" :aria-expanded="showOptions">
                    <li v-for="(option, index) in selectData" :key="index">
                        <label v-if="type === 'checkboxOptions'" :for="'option-' + (index + 1)" :class="{'active' : modelValue.includes(`${option.value}`)}">
                            <input type="checkbox" :value="option.value" @change="optionSelect"
                                   :checked="compareValues(option.value)" :id="'option-' + (index + 1)"/>
                            <span>{{ option.text }}</span>
                        </label>

                        <a v-else-if="type === 'country'" href="#"
                           @click.prevent="selectOption(option.value)" :class="{'active' : option.value === modelValue}">
                            <img class="flag" :src="pathFlag(option.value)"
                                 :alt="option.text"/>
                            <span>{{ option.text }}</span>
                        </a>

                        <a v-else-if="type === 'color'" href="#" @click.prevent="selectOption(option.value)" :class="{'active' : option.value === modelValue}">
                            <span class="color" :style="'background: ' + option.value"></span>
                            <span>{{ option.text }}</span>
                        </a>
                    </li>
                    <!-- begin (de)select all options -->
                    <li v-if="showSelectAllOptions && type === 'checkboxOptions'" class="select-all-options">
                        <a href="#" @click.prevent="toggleAllOptions">
                            <span :class="selectAllOptionsIcon"></span>
                            <span>{{ selectAllOptionsText }}</span>
                        </a>
                    </li>
                    <!-- end (de)select all options -->
                </ul>
                <!-- end dropdown with checkboxes -->

                <!-- begin dropdown with slot -->
                <template v-else-if="type === 'content' && showOptions" :aria-expanded="showOptions">
                    <slot></slot>
                </template>
                <!-- end dropdown with slot -->
            </li>
        </ul>
    </div>
</template>

<script>
// import utils
import {createUuid} from "../utils/common.js"

// import mixins
import I18n from "../mixins/I18n"
import DefaultMessageProperties from "../mixins/CmdFakeSelect/DefaultMessageProperties"
import FieldValidation from "../mixins/FieldValidation.js"
import Tooltip from "../mixins/Tooltip.js"

// import components
import CmdTooltipForInputElements from "./CmdTooltipForInputElements"

export default {
    name: 'CmdFakeSelect',
    inheritAttrs: false,
    mixins: [
        I18n,
        DefaultMessageProperties,
        FieldValidation,
        Tooltip
    ],
    components: {
        CmdTooltipForInputElements
    },
    data() {
        return {
            showOptions: false,
            validationStatus: "",
            limitWidthStyle: {}
        }
    },
    props: {
        /**
         * set different default selectbox-types for
         *
         * @allowedValues: default, color, country, checkboxOptions
         */
        type: {
            type: String,
            default: "default"
        },
        /**
         * set type of option-links
         *
         * @allowedValues: href, router
         */
        optionLinkType: {
            type: String,
            default: "href"
        },
        /**
         * set default v-model (must be named modelValue in Vue3)
         */
        modelValue: {
            type: [String, Number, Array],
            default: ""
        },
        /**
         * list of options to select (incl. displayed names and values)
         *
         * type-property must be set to "checkboxOptions"
         */
        selectData: {
            type: Array,
            required: false
        },
        /**
         * toggles option to (de)select all options in a checkbox-list
         *
         * type-property must be set to "checkboxOptions"
         */
        showSelectAllOptions: {
            type: Boolean,
            default: true
        },
        /**
         * status (i.e. for validation)
         *
         * @allowedValues: error, warning, success, info
         * @affectsStyling: true
         */
        status: {
            type: String,
            required: false
        },
        /**
         * icon for dropdown-icon (i.e. an angle/arrow)
         *
         * @requiredForAccessibility: partial
         * @defaultIcon: icon-single-arrow-down
         */
        dropdownIcon: {
            type: Object,
            default() {
                return {
                    iconClass: "icon-single-arrow-down",
                    tooltip: "Toggle dropdown visibility"
                }
            }
        },
        /**
         * label-text for fake-select
         *
         *  @requiredForAccessibility: true
         */
        labelText: {
            type: String,
            required: false
        },
        /**
         * toggle label visibility
         */
        showLabel: {
            type: Boolean,
            default: true
        },
        /**
         * path to flag-files (will be combined with flag isoCode to load svg)
         */
        pathFlags: {
            type: String,
            default: "/media/images/flags"
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
        // get the displayed option name
        optionName() {
            // fake a native selectbox
            if (this.type !== "checkboxOptions" && this.type !== "content" && this.modelValue) {
                const result = this.selectData.find(option => option.value === this.modelValue)?.text

                // if find() returns some data, return this data
                if (result) {
                    return result
                }
            }

            // selectbox with checkbox-options
            else if (this.type === "checkboxOptions") {
                if (this.modelValue.length === 1) {
                    return this.selectData.find(option => String(option.value) === String(this.modelValue[0]))?.text
                } else if (this.modelValue.length > 1) {
                    return this.modelValue.length + " options selected"
                }
            } else if (this.selectData?.length) {
                return this.selectData[0].text
            }

            return "Please select"
        },
        // get the displayed icon (only available for default selectbox)
        optionIcon() {
            if (this.type === "default") {
                return this.selectData.find(option => {
                    return option.value === this.modelValue
                })?.icon?.iconClass
            }
            return null
        },
        optionCountry() {
            if (this.type === "country") {
                return this.modelValue
            }
            return null
        },
        optionColor() {
            if (this.type === "color") {
                return this.modelValue
            }
            return null
        },
        selectAllOptionsText() {
            if (Array.isArray(this.modelValue) && this.modelValue.length === this.selectData.length) {
                return "Deselect all options"
            }
            return "Select all options"
        },
        selectAllOptionsIcon() {
            return "icon-check"
        },
        // get ID for accessibility
        labelId() {
            if (this.$attrs.id !== undefined) {
                return this.$attrs.id
            }
            return "label-" + createUuid()
        }
    },
    mounted() {
        //this.$nextTick(this.limitWidth)
        //setTimeout(this.limitWidth, 250)
        const hnd = setInterval(() => {
            if (this.$refs.fakeselect) {
                clearInterval(hnd)
                this.limitWidth()
            }
        }, 100)
    },
    methods: {
        toggleAllOptions() {
            this.validationStatus = "success"
            const checkboxValues = []
            if (this.modelValue.length === this.selectData.length) {
                if (this.$attrs.required) {
                    this.validationStatus = "error"
                }
            } else {
                for (let i = 0; i < this.selectData.length; i++) {
                    checkboxValues.push(String(this.selectData[i].value))
                }
            }

            this.$emit("update:modelValue", checkboxValues)
        },
        limitWidth() {
            if (this.$refs.fakeselect) {
                const outerWidth = this.$refs.fakeselect.offsetWidth
                this.limitWidthStyle = {width: outerWidth / 100 * 90 + "px"}
            }
        },
        toggleOptions() {
            if (this.$attrs.disabled !== 'disabled') {
                this.showOptions = !this.showOptions
            }
        },
        // check if array of selected options includes number or string version of value
        compareValues(option) {
            return this.modelValue.some((item) => {
                return item === option || item === String(option)
            })
        },
        // check if an option is selected for default-selectbox
        selectOption(optionValue) {
            this.validationStatus = "success"
            if (this.$attrs.required !== undefined) {
                if (!optionValue) {
                    this.validationStatus = "error"
                }
            }

            this.showOptions = false
            this.$emit('update:modelValue', optionValue)
        },
        // check if a checkbox is changed for selectbox with checkboxes
        optionSelect(event) {
            this.validationStatus = "success"

            let value = [...this.modelValue] // copy array from props
            if (event.target.checked) {
                value.push(event.target.value) // attention: value will be transformed into string!
            } else {
                value = value.filter(item => item !== event.target.value && String(item) !== event.target.value)
            }
            if (this.$attrs.required !== undefined && !value.length) {
                this.validationStatus = "error"
            }

            this.$emit('update:modelValue', value)
        },
        closeOptions() {
            this.showOptions = false
        },
        pathFlag(isoCode) {
            return this.pathFlags + "/flag-" + isoCode + ".svg"
        },
        onBlur() {
            this.validationStatus = "success"

            if (this.$attrs.required !== undefined && (!this.modelValue || this.modelValue.length === 0)) {
                this.validationStatus = "error"
            }
        },
        // overwrite requirement-message form fieldValidation.js
        getRequirementMessage() {
            return "An option is selected"
        }
    },
    watch: {
        status: {
            handler() {
                this.validationStatus = this.status
            },
            immediate: true
        },
        selectData: {
            handler() {
                // check if given value by modelValue exists (else pre-select first option)
                if (this.type === "default" && this.selectData?.length && !this.selectData.some((option) => option.value === this.modelValue)) {
                    this.$emit("update:modelValue", this.selectData[0].value)
                }
            },
            immediate: true,
            deep: true
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-fake-select ------------------------------------------------------------------------------------------ */
@mixin disabled-styles {
    color: var(--disabled-color);
    border-color: var(--disabled-color);
    background: var(--disabled-background-color);
}

.cmd-fake-select {
    align-self: flex-end;

    > span:first-child {
        a {
            align-self: flex-end;
        }
    }

    > ul {
        height: var(--input-height);
        margin: 0;
        display: block;
        min-width: 0;
        background: var(--color-scheme-background-color);
        box-shadow: none;
        border-radius: var(--border-radius);

        > li {
            height: 100%;

            &:first-child {
                > a {
                    height: inherit;
                    border: var(--default-border);

                    .option-name {
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }

                    > [class*="icon-"]:last-child {
                        margin-left: auto;
                        font-size: 1rem;
                    }
                }
            }
        }

        &.open {
            border-bottom: 0;

            > li {
                &:first-child {
                    > a {
                        border-color: var(--primary-color);
                    }
                }
            }
        }
    }

    li {
        margin-left: 0;
        list-style: none;

        a, a:visited {
            display: flex;
            align-items: center;
            padding: .7rem;
            padding-top: .8rem;
            outline: none;
            border-bottom: var(--default-border);
            color: var(--color-scheme-text-color);
            text-decoration: none;

            &:hover, &:active, &:focus {
                background: var(--primary-color);

                span {
                    color: var(--pure-white);
                }
            }

            span {
                &:first-child, &:nth-child(2) {
                    border: 0;
                }
            }

            img {
                &.flag {
                    margin: 0 calc(var(--default-margin) / 2) 0 0;
                }
            }

            &.active {
                background: var(--light-gray);

                span {
                    color: var(--text-color);
                }

                &:hover, &:active, &:focus {
                    background: var(--primary-color);

                    span {
                        color: var(--pure-white);
                    }
                }
            }
        }

        label {
            display: flex;
        }

        span {
            white-space: nowrap;
        }

        ul {
            position: absolute;
            list-style: none;
            z-index: 10;
            min-width: 100%;
            margin: 0;
            border-bottom-right-radius: var(--border-radius);
            border-bottom-left-radius: var(--border-radius);
            background: var(--color-scheme-background-color);
            border: var(--primary-border);

            li {
                &:last-child {
                    a {
                        border-bottom: 0;
                    }
                }
            }

            &.custom-fake-select-content {
                padding: var(--default-padding);

                img {
                    display: block;
                }
            }

            &.checkbox-options {
                li {
                    padding: calc(var(--default-padding) / 2);

                    &.select-all-options {
                        border-top: var(--primary-border);
                        padding: 0;
                    }
                }
            }
        }
    }

    &.has-state {
        > ul {
            > li {
                > a {
                    border-color: var(--status-color);

                    > span, span[class*="icon-"] {
                        color: var(--status-color);
                    }

                    &:hover, &:active, &:focus {
                        background: var(--pure-white);

                        span {
                            color: var(--status-color);
                        }
                    }
                }
            }
        }
    }

    &.disabled {
        > ul {
            > li {
                > a {
                    @include disabled-styles;

                    span {
                        color: var(--disabled-color);
                    }

                    &:hover, &:active, &:focus {
                        cursor: not-allowed;
                        @include disabled-styles;

                        span {
                            color: var(--disabled-color);
                        }
                    }
                }
            }
        }
    }

    &.error, &.disabled {
        a {
            &:hover, &:focus, &:active {
                img {
                    &.flag {
                        border-color: var(--border-color);
                    }
                }
            }
        }
    }

    &.color {
        li {
            a {
                gap: calc(var(--default-gap) / 2);

                > span:first-child {
                    width: 1.5rem;
                    aspect-ratio: 1/1;
                    border: var(--default-border);

                    &[style=""] {
                        display: none;
                    }
                }
            }
        }
    }
}

/* end cmd-fake-select ------------------------------------------------------------------------------------------ */
</style>
