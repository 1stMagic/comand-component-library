<template>
    <div :class="['cmd-input-group', {inline: labelInline}]">
        <span :class="['label', { hidden: !showLabel}]">{{ labelText }}</span>
        <div class="flex-container no-flex">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        /**
         * toggle label-text visibility
         */
        showLabel: {
            type: Boolean,
            default: true
        },
        /**
         * label-text for input-group
         *
         * @requiredForAccessibility: true
         */
        labelText: {
            type: String,
            required: true
        },
        /**
         * toggle label-position (inline/left of input-elements or above input-elements)
         */
        labelInline: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss">
.cmd-input-group {
    &.inline {
        display: flex;
        gap: var(--default-gap);
    }
}
</style>