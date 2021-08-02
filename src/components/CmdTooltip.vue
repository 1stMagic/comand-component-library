<template>
    <span class="cmd-tooltip">{{ tooltipText }}</span>
</template>

<script>
export default {
    name: "CmdTooltip",
    props: {
        tooltipText: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-tooltip ------------------------------------------------------------------------------------------ */
.cmd-tooltip {
    position: absolute;
    padding: .2rem calc(var(--default-padding) / 2);
    top: .3rem;
    line-height: 100%;
    right: 0;
    background: var(--pure-white);
    border: var(--primary-border);
    font-weight: bold;
    font-size: 1.2rem;
    border-bottom: 0;
}
/* end cmd-tooltip ------------------------------------------------------------------------------------------ */
</style>