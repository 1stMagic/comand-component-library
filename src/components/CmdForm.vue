<template>
    <form class="cmd-form" :data-use-validation="useValidation" @submit="onSubmit" :class="{error: errorOccurred}">
        <template v-if="useFieldset">
            <fieldset>
                <legend v-if="showLegend">{{ textLegend }}</legend>
                <slot></slot>
            </fieldset>
            <slot name="button-row"></slot>
        </template>
        <slot v-else></slot>
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
         * if activated the entire form will be validated by pre-coded validation
         */
        useValidation: {
          type: Boolean,
          default: true
        },
        /**
         * activate if you want to use a fieldset (recommended for accessibility)
         */
        useFieldset: {
            type: Boolean,
            default: true
        },
        /**
         * if a fieldset is used, the legend is required for accessibility
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
