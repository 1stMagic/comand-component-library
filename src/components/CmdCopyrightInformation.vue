<template>
    <div :class="['cmd-widget', 'cmd-copyright-information', htmlClass]">
        <a href="http://www.comand-cms.com" target="_blank" lang="en" title="CoManD-Website">&copy; CoManD</a>
    </div>
</template>

<script>
export default {
    name: "CmdCopyrightWrapper",
    props: {
        htmlClass: {
            type: String,
            required: false
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-copyright-information ---------------------------------------------------------------------------------------- */
.cmd-copyright-information {
    background: var(--text-color);
    border-top: var(--border-width) var(--border-style) var(--pure-white);
    text-align: center;
    padding: var(--default-padding);

    a {
        text-decoration: none;
        color: var(--pure-white);

        &:hover, &:active, &:focus {
            text-decoration: underline;
            color: var(--pure-white);
        }
    }
}

/* end cmd-copyright-information ------------------------------------------------------------------------------------------ */
</style>