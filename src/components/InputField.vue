<template>
    <label :for="id" :class="[status, {'inline' : displayinline}]">
        <span>{{ labelText }}</span>
        <span class="place-inside" :class="[status, iconClass]"></span>
        <input :id="id" :class="status" :disabled="status == 'disabled'" v-bind="$attrs" @input="$emit('input', $event.target.value)" @focus="tooltip = true" @blur="tooltip = false" />
        <span class="tooltip" v-if="tooltip">{{ tooltipText }}</span>
    </label>
</template>

<script>
    export default {
        inheritAttrs: false,
        data () {
            return {
                tooltip: false,
            }
        },
        props: {
            tooltipText: {
                type: String,
                required: false
            },
            labelText: {
                type: String,
                required: false
            },
            displayinline: {
                type: String,
                required: false
            },
            id: {
                type: String,
                required: true
            },
            iconClass: {
                type: String,
                required: false
            },
            status: {
                type: String,
                required: false
            }
        }
    }
</script>

<style scoped lang="scss">

</style>