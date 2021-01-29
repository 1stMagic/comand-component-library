<template>
    <ul class="cmd-breadcrumbs">
        <li v-if="breadcrumbLabel">{{ breadcrumbLabel }}</li>
        <li v-for="(link, index) in breadcrumbLinks" :key="index">
            <a :href="link.path">{{ link.name }}</a>
            <span>&gt;</span>
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
        }
    }
}
</script>

<style lang="scss">
    .cmd-breadcrumbs {
        display: flex;
        margin: 0;

        li {
            list-style-type: none;
            margin: 0;

            a {
                text-decoration: none;

                &:hover, &:active, &:focus {
                    text-decoration: underline;
                }
            }

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
</style>