<template>
    <div class="cmd-top-header-navigation">
        <ul class="flex-container">
            <li v-for="(link, index) in topHeaderNavigationData" :key="index">
                <a :href="link.path" :target="link.target">
                    <span :class="link.iconClass" v-if="link.iconClass"></span>
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
    @import '../assets/styles/variables';

    .cmd-top-header-navigation {
        background: var(--default-background-color);

        > ul.flex-container {
            justify-content: flex-end;

            li {
                flex: none;

                a {
                    text-decoration: none;
                    vertical-align: middle;
                    display: block;
                    padding-top: calc(var(--default-padding) / 2);
                    padding-bottom: calc(var(--default-padding) / 2);

                    &:hover, &:focus, &:active {
                        span:not([class*="icon-"]) {
                            text-decoration: underline;
                        }
                    }

                    [class*="icon-"] {
                        font-size: 1.5rem;
                    }
                }

                &:not(:first-child) {
                    margin-left: calc(var(--default-margin) * 2);
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
</style>