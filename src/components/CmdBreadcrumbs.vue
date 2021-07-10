<template>
    <ul class="cmd-breadcrumbs">
        <li v-if="breadcrumbLabel">{{ breadcrumbLabel }}</li>
        <li v-for="(link, index) in breadcrumbLinks" :key="index">
            <router-link v-if="link.type === 'router'" :to="link.to">{{ link.text }}</router-link>
            <a v-else :href="link.path">{{ link.text }}</a>
            <span v-if="index < breadcrumbLinks.length - 1">{{ breadcrumbSeparator }}</span>
        </li>
    </ul>
</template>

<script>
export default {
    name: "CmdBreadcrumbs",
    props: {
        breadcrumbLinks: {
            type: Array,
            required: false
        },
        breadcrumbLabel: {
            type: String,
            required: false
        },
        breadcrumbSeparator: {
            type: String,
            default: ">"
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-breadcrumbs --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-breadcrumbs {
    display: flex;
    margin: 0;

    li {
        list-style-type: none;
        margin: 0;

        > span {
            padding: 0 calc(var(--default-padding) / 2);
        }

        &:first-child {
            margin-right: calc(var(--default-margin) / 2);
        }

        &:last-child {
            > span {
                display: none;
            }
        }
    }
}
/* end cmd-breadcrumbs --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>