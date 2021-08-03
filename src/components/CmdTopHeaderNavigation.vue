<template>
    <div class="cmd-top-header-navigation">
        <ul class="flex-container" role="navigation">
            <li v-for="(link, index) in topHeaderNavigationData" :key="index">
                <a :href="link.path" :target="link.target" :title="!link.linkName ? link.tooltip : ''">
                    <span v-if="link.iconClass" :class="link.iconClass"></span>
                    <span v-if="link.linkName">{{ link.linkName }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "CmdTopHeaderNavigation",
    props: {
        topHeaderNavigationData: {
            type: Array,
            required: false
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-top-header-navigation ------------------------------------------------------------------------------------------ */
@import '../assets/styles/variables';

.cmd-top-header-navigation {
    > ul.flex-container {
        justify-content: flex-end;
        margin: 0 auto;

        li {
            flex: none;
            list-style-type: none;
            margin: 0;

            a {
                display: flex;
                align-items: center;
                padding-top: calc(var(--default-padding) / 2);
                padding-bottom: calc(var(--default-padding) / 2);
                text-decoration: none;

                &:hover, &:focus, &:active {
                    span:not([class*="icon-"]) {
                        text-decoration: underline;
                    }
                }

                [class*="icon-"] {
                    font-size: 1.5rem;
                }
            }
        }
    }

    @media only screen and (max-width: $small-max-width) {
        > ul.flex-container {
            justify-content: center;
            flex-direction: row; /* overwrite default settings from framework.css */

            li {
                display: table;

                a {
                    [class*="icon-"] {
                      & + span {
                          display: none;
                      }
                    }
                }
            }
        }
    }
}
/* end cmd-top-header-navigation ------------------------------------------------------------------------------------------ */
</style>