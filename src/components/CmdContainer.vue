<template>
    <div class="cmd-container">
        <slot></slot>
    </div>
</template>

<script>
import EditMode from "../mixins/EditMode.vue"
export default {
    name: "CmdContainer",
    mixins: [EditMode],
    methods: {
        addHandlerProvider() {
            return ""
        }
    }
}
</script>

<style lang="scss">
.cmd-container {
    min-height: 5rem;
}
</style>
