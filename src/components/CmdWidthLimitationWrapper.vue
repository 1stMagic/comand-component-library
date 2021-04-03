<template>
    <div class="cmd-width-limitation-wrapper" :class="{'sticky': sticky}" :id="setOuterId">
        <component :is="innerComponent" :class="setInnerClass">
            <a :id="anchorId" v-if="anchorId"></a>
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
            default: "section",
            validator (value) {
                if(!value) {
                    return false
                }
                return true
            }
        },
        sticky:{
          type: Boolean,
          default: false
        },
        innerClass: {
            type: String,
            required: false
        },
        anchorId: {
            type: String,
            required: false
        }
    },
    computed: {
        setInnerClass() {
            if (this.innerClass) {
                return this.innerClass
            }
            if (this.innerComponent === "header") {
                return "grid-container-create-columns"
            }
            if (this.innerComponent === "footer") {
                return "flex-container"
            }
            return ""
        },
        setOuterId() {
            if (this.innerComponent === "header") {
                return "site-header"
            }
            if (this.innerComponent === "footer") {
                return "site-footer"
            }
            return ""
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-width-limitation-wrapper --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-width-limitation-wrapper {
    > * {
        max-width: 128rem;
        margin: 0 auto;
        padding: 1rem;
    }

    &.sticky {
        position: sticky;
        left: 0;
        right: 0;
        top: 0;
    }

    &#site-header {
        z-index: 100;
        border-bottom: var(--default-border);
        background: var(--pure-white);

        header {
            display: grid;
            padding-top: calc(var(--default-padding) * 2);
            padding-bottom: calc(var(--default-padding) * 2);

            #inner-header-wrapper {

            }

            nav {
                padding: 0;
            }

            #main-navigation, nav ul li, #navigation-wrapper {
                background: none;
            }

            #navigation-wrapper {
                align-self: center;
            }

            .cmd-logo {
                grid-column: span var(--grid-small-span);
            }
        }

        &.top-header-navigation {
            header {
                padding-top: 0;
            }
        }
    }

    &#site-footer {
        padding: var(--grid-gap) 0;
        border-top: var(--default-border);

        &.sticky {
            top: auto;
            bottom: 0;
        }

        footer {
            display: grid;

            [class*="cmd-"] {
                grid-column: span var(--grid-small-span);

                &.cmd-switch-language {
                    grid-column: span var(--grid-columns);
                }
            }
        }
    }
}
/* end cmd-width-limitation-wrapper --------------------------------------------------------------------------------------------------------------------------------------------------- */

/* begin cmd-width-limitation-wrapper --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-width-limitation-wrapper {
    > * {
        margin: 0 auto;
        padding: 1rem;
    }

    &.sticky {
        position: sticky;
        left: 0;
        right: 0;
        top: 0;
    }

    &#site-header {
        z-index: 100;

        header {
            display: grid;
            padding-top: calc(var(--default-padding) * 2);
            padding-bottom: calc(var(--default-padding) * 2);

            nav {
                padding: 0;
            }

            #navigation-wrapper {
                align-self: center;
            }

            .cmd-logo {
                grid-column: span var(--grid-small-span);
            }
        }

        &.top-header-navigation {
            header {
                padding-top: 0;
            }
        }
    }

    &#site-footer {
        padding: var(--grid-gap) 0;

        &.sticky {
            top: auto;
            bottom: 0;
        }

        footer {
            display: grid;

            [class*="cmd-"] {
                grid-column: span var(--grid-small-span);

                &.cmd-switch-language {
                    grid-column: span var(--grid-columns);
                }
            }
        }
    }
}
/* end cmd-width-limitation-wrapper --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>