<template>
    <form class="cmd-form" :data-use-validation="useValidation" @submit="onSubmit" :class="{error: errorOccurred}" :novalidate="novalidate">
        <template v-if="useFieldset">
            <fieldset class="flex-container">
                <legend :class="{hidden : !showLegend}">{{ textLegend }}</legend>
                <!-- begin default-slot-content -->
                <slot></slot>
                <!-- end default-slot-content -->
            </fieldset>

            <!-- begin button-row-slot-content -->
            <slot name="button-row"></slot>
            <!-- end button-row-slot-content -->
        </template>

        <!-- begin default-slot-content -->
        <slot v-else></slot>
        <!-- end default-slot-content -->
    </form>
</template>

<script>
export default {
    name: "CmdForm",
    emits: ["submit"],
    data(){
        return {
            errorOccurred: false
        }
    },
    props: {
        /**
         * deactivate if browser-validation should be used
         */
        novalidate: {
          type: Boolean,
          default: true
        },
        /**
         * if activated the entire form will be validated by pre-coded validation
         *
         * @affectsStyling: true
         */
        useValidation: {
          type: Boolean,
          default: true
        },
        /**
         * activate if you want to use a fieldset
         *
         * @requiredForAccessibility: true
         */
        useFieldset: {
            type: Boolean,
            default: true
        },
        /**
         * toggle visibility for legend-text
         *
         * useFieldset must be activated
         */
        showLegend: {
            type: Boolean,
            default: true
        },
        /**
         * text for legend
         *
         * useFieldset must be activated
         *
         * @requiredForAccessibility: true
         */
        textLegend: {
            type: String,
            required: false
        }
    },
    methods: {
        onSubmit(event) {
            if(this.useValidation) {
                event.preventDefault()
                if(event.target.checkValidity()) {
                    this.errorOccurred = false
                    this.$emit("submit", event)
                } else {
                    this.errorOccurred = true
                }
            }
        }
    }
}
</script>

<style lang="scss">
.cmd-form {
    &:not([data-use-validation="true"]) {
        label.error :where(::placeholder, select option:first-child),
        :where(input, select, textarea):invalid:focus {
            color: var(--error-color);
        }

        :where(input, select, textarea):valid:focus[required],
        select:invalid:focus[required] option:not(:first-child) {
            color: var(--success-color);
        }
    }

    &.error {
        fieldset, *:invalid {
            border-color: var(--error-color);
        }
    }
}
</style>
