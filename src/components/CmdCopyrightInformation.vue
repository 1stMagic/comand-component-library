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
/* begin cmd-copyright-information --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-copyright-information {
    padding: var(--default-padding);
}
/* end cmd-copyright-information --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>