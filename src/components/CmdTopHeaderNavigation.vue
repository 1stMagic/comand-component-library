<template>
    <div class="cmd-top-header-navigation">
        <ul :class="['flex-container', align]" role="navigation">
            <li v-for="(link, index) in topHeaderNavigationData" :key="index">
                <a v-if="link.linkType === 'href'" :href="link.path" :target="link.target" :title="link.icon.tooltip">
                    <span v-if="link.icon && link.icon.iconClass" :class="link.icon.iconClass"></span>
                    <span v-if="link.text">{{ link.text }}</span>
                </a>
                <router-link v-else-if="link.linkType === 'router'" :to="link.path" :target="link.target" :title="link.icon.tooltip">
                    <span v-if="link.icon && link.icon.iconClass" :class="link.icon.iconClass"></span>
                    <span v-if="link.text">{{ link.text }}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "CmdTopHeaderNavigation",
    props: {
        /**
         * list of navigation-entries
         */
        topHeaderNavigationData: {
            type: Array,
            required: false
        },
        /**
         * horizontal alignment
         *
         * @allowedValues: left, center, right
         * @affectsStyling: true
         */
        align: {
          type: String,
          default: "right"
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-top-header-navigation ------------------------------------------------------------------------------------------ */
@import '../assets/styles/variables';

.cmd-top-header-navigation {
    > ul.flex-container {
        margin: 0 auto;
        justify-content: flex-end;

        &.left {
            justify-content: flex-start;
        }

        &.center {
            justify-content: center;
        }

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