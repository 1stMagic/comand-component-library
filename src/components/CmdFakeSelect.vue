<template>
    <div :class="[validationStatus,
    'cmd-fake-select label',
    {color: type === 'color',
    'has-state': validationStatus && validationStatus !== 'none'}]
"
         :aria-labelledby="labelText"
         :aria-required="$attrs.required !== undefined"
    >
        <span>
            {{ labelText }}
            <sup v-if="$attrs.required !== undefined">*</sup>
          <a href="#"
             @click.prevent
             :class="getStatusIconClass"
             :title="!useCustomTooltip ? getValidationMessage : ''"
             :aria-errormessage="getValidationMessage"
             aria-live="assertive"
             :id="tooltipId"
             :role="validationStatus === 'error' ? 'alert' : 'dialog'">
          </a>
        </span>
        <ul :class="{'open': showOptions}" @clickout="closeOptions">
            <li>
                <!-- begin default/selected-option -->
                <a href="#" @click.prevent="toggleOptions" @blur="onBlur">
                    <img v-if="type === 'country' && optionCountry" :src="pathFlag(optionCountry)" :alt="optionCountry" :class="['flag', optionCountry]"/>
                    <span v-else-if="type === 'color'" :style="'background: ' + optionColor"></span>
                    <span v-if="optionIcon" :class="optionIcon"></span>
                    <span>{{ optionName }}</span>
                    <span v-if="dropdownIcon" :class="dropdownIcon.iconClass" :title="dropdownIcon.tooltip"></span>
                </a>
                <!-- end default/selected-option-->

                <!-- begin default dropdown (incl. optional icon) -->
                <ul v-if="type === 'default' && showOptions" :aria-expanded="showOptions">
                    <li v-for="(option, index) in selectData" :key="index" role="option">
                        <a href="#" @click.prevent="selectOption(option.value)" :class="{'active' : option.value === value}">
                            <span v-if="option.icon?.iconClass" :class="option.icon.iconClass"></span>
                            <span>{{ option.text }}</span>
                        </a>
                    </li>
                </ul>
                <!-- end default dropdown (incl. optional icon) -->

                <!-- begin dropdown with checkboxes -->
                <ul v-else-if="type !== 'default' && type !== 'content' && showOptions" :class="{'checkbox-options': type === 'checkboxOptions'}" :aria-expanded="showOptions">
                    <li v-for="(option, index) in selectData" :key="index">
                        <label v-if="type === 'checkboxOptions'" :for="'option-' + (index + 1)" :class="{'active' : value.includes(`${option.value}`)}">
                            <input type="checkbox" :value="option.value" @change="optionSelect"
                                   :checked="value.includes(`${option.value}`)" :id="'option-' + (index + 1)"/>
                            <span>{{ option.text }}</span>
                        </label>

                        <a v-else-if="type === 'country'" href="#"
                           @click.prevent="selectOption(option.value)" :class="{'active' : option.value === value}">
                            <img class="flag" :src="pathFlag(option.value)"
                                 :alt="option.text"/>
                            <span>{{ option.text }}</span>
                        </a>

                        <a v-else href="#" @click.prevent="selectOption(option.value)" :class="{'active' : option.value === value}">
                            <span class="color" :style="'background: ' + option.value"></span>
                            <span>{{ option.text }}</span>
                        </a>
                    </li>
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
    <!-- begin tooltip -->
    <!--        <CmdTooltip v-if="tooltipText && $attrs.type === 'password'" :tooltipText="tooltipText" :status="validationStatus" />-->
    <CmdTooltip v-if="useCustomTooltip" class="box" :relatedId="tooltipId" :toggle-visibility-by-click="true">
        <template v-if="getValidationMessage">
            {{ getValidationMessage }}
        </template>
        <template v-if="validationStatus === '' || validationStatus === 'error'">
            <h6>Requirements</h6>
<!--            <dl class="list-of-requirements">-->
<!--                <template v-for="(requirement, index) in inputRequirements" :key="index">-->
<!--                    <dt :class="requirement.valid(value, $attrs) ? 'success' : 'error'">{{requirement.message}}:</dt>-->
<!--                    <dd :class="requirement.valid(value, $attrs) ? 'success' : 'error'">{{ requirement.condition(value, $attrs) }}</dd>-->
<!--                </template>-->
<!--            </dl>-->
            <!--
            <dl class="list-of-requirements">
                <dt :class="($attrs.required && !value) ? 'error' : 'success'">Required:</dt>
                <dd :class="($attrs.required && !value) ? 'error' : 'success'">{{ $attrs.required ? 'yes' : 'no' }}</dd>
                <dt>Allowed characters:</dt>
                <dd>{{ allowedCharacters }}</dd>
                <dt :class="($attrs.minlength && (value.length < $attrs.minlength)) ? 'error' : 'success'">Minlength:</dt>
                <dd :class="($attrs.minlength && (value.length < $attrs.minlength)) ? 'error' : 'success'"><template v-if="$attrs.minlength">{{value.length}}/</template>{{ $attrs.minlength ? $attrs.minlength : 'none' }}</dd>
                <dt :class="($attrs.maxlength && (value.length <= $attrs.maxlength)) ? 'error' : 'success'">Maxlength:</dt>
                <dd :class="($attrs.maxlength && (value.length <= $attrs.maxlength)) ? 'error' : 'success'">{{ $attrs.maxlength ? $attrs.maxlength : 'none' }}</dd>
                <template v-if="$attrs.type === 'number'">
                    <dt :class="($attrs.min && (Number(value) < Number($attrs.min))) ? 'error' : 'success'">Min (value):</dt>
                    <dd :class="($attrs.min && (Number(value) < Number($attrs.min))) ? 'error' : 'success'">{{ $attrs.min ? $attrs.min : 'none' }}</dd>
                    <dt :class="($attrs.max && (Number(value) > Number($attrs.max))) ? 'error' : 'success'">Max (value):</dt>
                    <dd :class="($attrs.max && (Number(value) > Number($attrs.max))) ? 'error' : 'success'">{{ $attrs.max ? $attrs.max : 'none' }}</dd>
                </template>
            </dl>
            <ul>
                <li v-for="(requirement, index) in additionalRequirements" :key="index">
                    {{ requirement.message }}: {{ requirement.valid(value) }}<br />
                    value: {{value}}
                </li>
            </ul>
            -->
            <a v-if="helplink?.url" :href="helplink.url" :target="helplink.target" @click.prevent>
                <span v-if="helplink.icon?.iconClass" :class="helplink.icon?.iconClass" :title="helplink.icon?.tooltip"></span>
                <span v-if="helplink.text">{{ helplink.text }}</span>
            </a>
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

export default {
    name: 'CmdFakeSelect',
    inheritAttrs: false,
    mixins: [FieldValidation, Tooltip],
    components: {
        CmdTooltip
    },
    data() {
        return {
            showOptions: false,
            validationStatus: "",
            hasError: false
        }
    },
    props: {
        helplink: {
            type: Object,
            default() {}
        },
        /**
         * set different default selectbox-types for
         *
         * values: "(none), color, country, filterlist"
         */
        type: {
            type: String,
            default: "default"
        },
        /**
         * set default value
         */
        value: {
            type: [String, Array],
            required: false
        },
        /**
         * list of options to select (incl. displayed names and values)
         */
        selectData: {
            type: Array,
            required: false
        },
        /**
         * status (i.e. for validation)
         *
         * values: "error, success, disabled"
         */
        status: {
            type: String,
            required: false
        },
        /**
         * icon for dropdown-icon (i.e. an angle/arrow)
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
         */
        labelText: {
            type: String,
            required: false
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
        // get the displayed option name
        optionName() {
            // fake a normal checkbox
            if (this.type !== "checkboxOptions" && this.type !== "content" && this.value) {
                const result = this.selectData.find(option => option.value === this.value)?.text

                // if find() returns some data, return this data
                if (result) {
                    return result
                }
            }

            // selectbox with checkbox-options
            else if (this.type === "checkboxOptions") {
                if (this.value.length === 1) {
                    return this.selectData.find(option => option.value === this.value[0])?.text
                } else if (this.value.length > 1) {
                    return this.value.length + " options selected"
                }
            }

            else if (this.selectData?.length) {
                return this.selectData[0].text
            }

            return "Please select"
        },
        // get the displayed icon (only available for default selectbox)
        optionIcon() {
            if (this.type === "default") {
                return this.selectData.find(option => {
                    return option.value === this.value
                })?.icon?.iconClass
            }
            return null
        },
        optionCountry() {
            if (this.type === "country") {
                return this.value
            }
            return null
        },
        optionColor() {
            if (this.type === "color") {
                return this.value
            }
            return null
        },
        overflowWidth() {
            let outerWidth = document.querySelector(".cmd-fake-select").outerWidth()
            return "width: " + outerWidth + "px;"
        }
    },
    methods: {
        toggleOptions() {
            if (this.status !== 'disabled') {
                this.showOptions = !this.showOptions
            }
        },
        // check is an option is selected for default-selectbox
        selectOption(optionValue) {
            this.validationStatus = "success"
            if(this.$attrs.required !== undefined) {
                if(!optionValue) {
                    this.validationStatus = "error"
                }
            }

            this.showOptions = false
            this.$emit('update:value', optionValue);
        },
        // check if a checkbox is changed for selectbox with checkboxes
        optionSelect(event) {
            this.validationStatus = "success"

            let value = [...this.value] // copy array from props
            if (event.target.checked) {
                value.push(event.target.value); // attention: value will be transformed into string!
            } else {
                value = value.filter(v => v !== event.target.value);
            }
            if(this.$attrs.required !== undefined && !value.length) {
                this.validationStatus = "error"
            }

            this.$emit('update:value', value);
        },
        closeOptions() {
            this.showOptions = false
        },
        pathFlag(isoCode) {
            return this.pathFlags + "/flag-" + isoCode + ".svg"
        },
        onBlur() {
            if (this.$attrs.required !== undefined && !this.value) {
                this.hasError = true
            }
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
/* begin cmd-fake-select ------------------------------------------------------------------------------------------ */
@mixin disabled-styles {
    color: var(--disabled-color);
    border-color: var(--disabled-color);
    background: var(--disabled-background-color);
}

.cmd-fake-select {
    > ul {
        height: var(--input-height);
        margin: 0;
        display: block;
        min-width: 0;
        background: var(--pure-white);
        box-shadow: none;
        border-radius: var(--border-radius);

        > li {
            height: 100%;

            &:first-child {
                > a {
                    height: inherit;
                    border: var(--default-border);

                    > span:not([class*="icon"]) {
                        text-overflow: ellipsis;
                        overflow: hidden;
                        width: 95%;
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
            color: var(--text-color);
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

                &:hover, &:active, &:focus {
                    background: var(--primary-color);
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
            background: var(--pure-white);
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
                }
            }
        }
    }

    &.error {
        > ul {
            > li {
                > a {
                    border-color: var(--error-color);

                    > span, span[class*="icon-"] {
                        color: var(--error-color);
                    }

                    &:hover, &:active, &:focus {
                        border-color: var(--error-color);

                        span {
                            color: var(--error-color);
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
                    aspect-ratio: 1;
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
