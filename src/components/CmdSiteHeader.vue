<template>
    <div :class="['cmd-site-header', {sticky: sticky, 'navigation-inline': navigationInline }]" role="banner">
        <!-- begin slot for elements above header -->
        <div v-if="$slots.topheader" class="top-header">
            <slot name="topheader"></slot>
        </div>
        <!-- end slot for elements above header -->

        <header :class="[
            useGrid ? 'grid-container-create-columns': 'flex-container',
            {'has-navigation': (cmdMainNavigation?.navigationEntries?.length && navigationInline) || $slots.navigation,
            'one-child-only' : oneChildOnly}
            ]">
            <!-- begin slots for logo and other header elements -->
            <template v-if="$slots.logo || $slots.header || $slots.navigation">
                <slot name="logo"></slot>
                <slot name="header"></slot>
                <slot name="navigation"></slot>
            </template>
            <!-- end slots for logo and other header elements -->

            <!-- begin content given by data -->
            <template v-if="cmdCompanyLogo || cmdMainNavigation?.navigationEntries?.length">
                <!-- begin CmdCompanyLogo -->
                <CmdCompanyLogo
                    v-if="cmdCompanyLogo"
                    v-bind="cmdCompanyLogo"
                />
                <!-- end CmdCompanyLogo -->

                <!-- begin CmdMainNavigation -->
                <CmdMainNavigation
                    v-if="cmdMainNavigation?.navigationEntries?.length && navigationInline"
                    :navigationEntries="cmdMainNavigation.navigationEntries"
                    :closeOffcanvas="closeOffcanvas"
                />
                <!-- end CmdMainNavigation -->
            </template>
            <!-- end content given by data -->
        </header>

        <!-- begin CmdMainNavigation -->
        <CmdMainNavigation
            v-if="cmdMainNavigation?.navigationEntries?.length && !navigationInline"
            :navigationEntries="cmdMainNavigation.navigationEntries"
            :closeOffcanvas="closeOffcanvas"
        />
        <!-- end CmdMainNavigation -->
    </div>
</template>

<script>
// import components
import CmdCompanyLogo from "./CmdCompanyLogo"
import CmdMainNavigation from "./CmdMainNavigation"

export default {
    name: "CmdSiteHeader",
    components: {
        CmdCompanyLogo,
        CmdMainNavigation
    },
    props: {
        /**
         * use only if default-button of inner navigation-component should not be used
         */
        closeOffcanvas: {
            type: Object,
            required: false
        },
        /**
         * activated sticky-header (stays on top if page is scrolled)
         */
        sticky: {
            type: Boolean,
            default: true
        },
        /**
         * activate if navigation should be displayed inline to logo (otherwise it will be displayed below)
         *
         * @affectsStyling: true
         */
        navigationInline: {
            type: Boolean,
            default: false
        },
        /**
         * use a grid for positioning of inner-elements (else a flex-container will be used)
         *
         * @affectsStyling: true
         */
        useGrid: {
            type: Boolean,
            default: true
        },
        /**
         * properties for CmdCompanyLogo-component
         */
        cmdCompanyLogo: {
            type: Object,
            required: false
        },
        /**
         * properties for CmdMainNavigation-component
         */
        cmdMainNavigation: {
            type: Object,
            required: false
        }
    },
    computed: {
        oneChildOnly() {
            // check if sum of children equals "1" by turning objects into booleans, which will be converted to numbers by using "+".
            return (!!this.cmdCompanyLogo + !!this.cmdMainNavigation + !!this.$slots.logo + !!this.$slots.header + !!this.$slots.navigation) === 1
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-site-header ---------------------------------------------------------------------------------------- */
@import '../assets/styles/variables';

.cmd-site-header {
    grid-area: site-header;
    display: flex;
    flex-direction: column;
    border-bottom: var(--default-border);
    background: var(--color-scheme-background-color);

    &.sticky {
        position: sticky;
        z-index: 300;
    }

    header, .cmd-main-navigation nav, .cmd-list-of-links {
        max-width: var(--max-width);
        width: 100%; /* stretch flex-item */
        margin: 0 auto;
        padding: 0 var(--default-padding);
    }

    .cmd-main-navigation nav {
        width: auto;
    }

    .top-header {
        .cmd-list-of-links {
            padding-top: calc(var(--default-padding) / 2);
            padding-bottom: calc(var(--default-padding) / 2);
        }
    }

    #main-navigation-wrapper {
        grid-column: span var(--grid-columns);
        border-bottom: 0;

        nav {
            padding: 0;

        }
    }

    // use id to ensure high specificity
    > .cmd-main-navigation#main-navigation-wrapper:last-child {
        border-bottom: 0;
    }

    header {
        padding-top: calc(var(--default-padding) * 2);
        padding-bottom: calc(var(--default-padding) * 2);

        &.has-navigation {
            grid-template-rows: 1fr min-content;
            grid-template-areas: "company-logo" "main-navigation";
            padding-bottom: 0;
        }

        &.one-child-only {
            gap: 0;
        }

        &.flex-container {
            width: 100%;

            .cmd-company-logo {
                grid-area: company-logo;
                flex: none;
            }
        }

        nav {
            padding: 0;
        }

        .cmd-main-navigation,
        nav ul li {
            border-bottom: 0;
            background: none;
        }

        .cmd-company-logo {
            grid-column: span var(--grid-small-span);
        }

         > *:only-child {
             gap: 0;
         }
    }

    &.navigation-inline {
        header {
            &.has-navigation {
                grid-template-rows: 1fr;
                grid-template-areas: "company-logo main-navigation";
                padding-bottom: calc(var(--default-padding) * 2);
            }

            .cmd-company-logo {
                grid-column: span var(--grid-small-span);
            }

            #main-navigation-wrapper {
                grid-area: main-navigation;
                display: flex;
                align-items: center;
                border: 0;
                grid-column: span var(--grid-large-span);
                background: none;

                :where(nav, .nav) {
                    margin-right: 0;

                    > ul {
                        border: 0;
                        background: none;

                        li {
                            border: 0;

                            ul {
                                border-top: var(--default-border);
                            }
                        }
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: $medium-max-width) {
    .cmd-site-header {
        padding-bottom: calc(var(--default-padding) * 2);

        header {
            grid-auto-rows: auto; /* items should be as large as their content */
        }
    }
}

@media only screen and (max-width: $small-max-width) {
    .cmd-site-header {
        gap: calc(var(--default-gap) / 2);
        padding-bottom: var(--default-padding);

        .cmd-company-logo {
            margin: 0 auto;

            img {
                max-width: 80%;
            }
        }
    }
}

/* end cmd-site-header ------------------------------------------------------------------------------------------ */
</style>
