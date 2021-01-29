<template>
    <div class="width-limitation-wrapper">
        <component :is="innerComponent" :class="innerClass" :id="innerId">
            <slot></slot>
        </component>
    </div>
</template>

<script>
export default {
    name: "CmdWidthLimitationWrapper",
    props: {
        innerComponent: {
            type: String,
            default: "section"
        },
        innerClass: {
            type: String,
            required: false
        },
        innerId: {
            type: String,
            required: false
        }
    }
}
</script>

<style lang="scss">
.width-limitation-wrapper {
    > * {
        max-width: 128rem;
        margin: 0 auto;
        padding: 1rem;
    }
}
</style>