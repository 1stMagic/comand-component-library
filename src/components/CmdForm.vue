<template>
    <form :data-use-validation="useValidation" @submit="onSubmit" :class="{error: errorOccurred}">
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
        useValidation: {
          type: Boolean,
          default: true
        },
        useFieldset: {
            type: Boolean,
            default: true
        },
        showLegend: {
            type: Boolean,
            default: true
        },
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
form.error {
    fieldset {
        border-color: var(--error-color);
    }

    *:invalid {
        border-color: var(--error-color);
    }
}
</style>
