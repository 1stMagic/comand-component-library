<template>
    <div :class="[validationStatus,
    'cmd-fake-select label',
    {color: type === 'color',
    'has-state': validationStatus && validationStatus !== 'none'}]
"
     :aria-labelledby="labelText"
     :aria-required="$attrs.required !== undefined"
     ref="fakeselect"
    >
        <span>
            <span>
                {{ labelText }}<sup v-if="$attrs.required !== undefined">*</sup>
            </span>
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
        <ul :class="{'open': showOptions}" @clickout="closeOptions">
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

                        <a v-else-if="type === 'color'" href="#" @click.prevent="selectOption(option.value)" :class="{'active' : option.value === value}">
                            <span class="color" :style="'background: ' + option.value"></span>
                            <span>{{ option.text }}</span>
                        </a>
                    </li>
                    <li v-if="showSelectAllOptions && type === 'checkboxOptions'" class="select-all-options">
                        <a href="#" @click.prevent="toggleAllOptions">
                            <span :class="selectAllOptionsIcon"></span>
                            <span>{{ selectAllOptionsText }}</span>
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
    <CmdTooltip v-if="useCustomTooltip" class="box" :class="validationStatus" :relatedId="tooltipId" :toggle-visibility-by-click="true">
        <CmdSystemMessage v-if="getValidationMessage" :message="getValidationMessage" :status="validationStatus" :iconClose="{show: false}" />
        <template v-if="showRequirements && (validationStatus === '' || validationStatus === 'error')">
            <!-- begin list of requirements -->
            <h6>Requirements for input<br />"{{labelText}}"</h6>
            <dl class="list-of-requirements">
                <template v-for="(requirement, index) in inputRequirements" :key="index">
                    <dt aria-live="assertive" :class="requirement.valid(value, $attrs) ? 'success' : 'error'">{{requirement.message}}:</dt>
                    <dd :class="requirement.valid(value, $attrs) ? 'success' : 'error'">
                        <span aria-live="assertive" :class="requirement.valid(value, $attrs) ? 'icon-check-circle' : 'icon-error-circle'" :title="requirement.valid(value, $attrs) ? 'success' : 'error'"></span>
                    </dd>
                </template>
            </dl>
            <!-- end list of requirements -->

            <!-- begin helplink -->
            <hr v-if="helplink?.show" />
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
import CmdSystemMessage from "./CmdSystemMessage"
import CmdTooltip from "./CmdTooltip"

export default {
    name: 'CmdFakeSelect',
    inheritAttrs: false,
    mixins: [FieldValidation, Tooltip],
    components: {
        CmdSystemMessage,
        CmdTooltip
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
         * values: "(default === default list, similar to native selectbox), color, country, checkboxOptions"
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
        selectAllOptionsText() {
            if(Array.isArray(this.value) && this.value.length === this.selectData.length) {
                return "Deselect all options"
            }
            return "Select all options"
        },
        selectAllOptionsIcon() {
            return "icon-check"
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
            if(this.value.length === this.selectData.length) {
                if(this.$attrs.required) {
                    this.validationStatus = "error"
                }
            } else {
                for (let i = 0; i < this.selectData.length; i++) {
                    checkboxValues.push(this.selectData[i].value)
                }
            }

            this.$emit("update:value", checkboxValues)
        },
        limitWidth() {
            if(this.$refs.fakeselect) {
                const outerWidth = this.$refs.fakeselect.offsetWidth
                this.limitWidthStyle = {width: outerWidth / 100 * 90 + "px"}
            }
        },
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
            this.validationStatus = "success"

            if (this.$attrs.required !== undefined && (!this.value || this.value.length === 0)) {
                this.validationStatus = "error"
            }
        },
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

    & + .cmd-tooltip {
        border-color: var(--status-color);
    }

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
        background: var(--pure-white);
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

                    &.select-all-options {
                        border-top: var(--primary-border);
                        padding: 0;
                    }
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
                        background: var(--pure-white);

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
