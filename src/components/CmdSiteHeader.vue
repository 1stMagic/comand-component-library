<template>
    <div :class="['cmd-site-header', {sticky: sticky, 'navigation-inline': navigationInline, 'off-canvas-right': cmdMainNavigation?.offcanvasPosition === 'right'}]" role="banner">
        <!-- begin slot for elements above header -->
        <div v-if="$slots.topheader" class="top-header">
            <slot name="topheader"></slot>
        </div>
        <!-- end slot for elements above header -->

        <header
            :class="[
                useGrid ? 'grid-container-create-columns': 'flex-container',
                {'has-navigation': (cmdMainNavigation?.navigationEntries?.length && navigationInline) || $slots.navigation}
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
                    :offcanvasPosition="cmdMainNavigation.offcanvasPosition"
                    :closeOffcanvas="closeOffcanvas"
                    @offcanvas="emitOffcanvasStatus"
                />
                <!-- end CmdMainNavigation -->
            </template>
            <!-- end content given by data -->
        </header>

        <!-- begin CmdMainNavigation -->
        <CmdMainNavigation
            v-if="cmdMainNavigation?.navigationEntries?.length && !navigationInline"
            :navigationEntries="cmdMainNavigation.navigationEntries"
            :offcanvasPosition="cmdMainNavigation.offcanvasPosition"
            :closeOffcanvas="closeOffcanvas"
            @offcanvas="emitOffcanvasStatus"
        />
        <!-- end CmdMainNavigation -->
    </div>
</template>

<script>
export default {
    name: "CmdSiteHeader",
    emits: ["offcanvas"],
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
    methods: {
        emitOffcanvasStatus(event){
            this.$emit("offcanvas", event)
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

        &.flex-container {
            width: 100%;

            .cmd-company-logo {
                grid-area: company-logo;
                flex: none;
            }
        }

        .cmd-main-navigation nav {
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
    }

    &.navigation-inline {
        header {
            &.has-navigation {
                grid-template-rows: 1fr;
                grid-template-areas: "company-logo main-navigation";
                padding-bottom: calc(var(--default-padding) * 2);
            }

            .cmd-company-logo {
                grid-area: company-logo;
                grid-column: span var(--grid-small-span);
            }

            #main-navigation-wrapper {
                grid-area: main-navigation;
                display: flex;
                align-items: center;
                justify-content: flex-end;
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

                &:not(.persist-on-mobile) {
                    padding-left: 0 !important;
                }
            }
        }

        &.off-canvas-right {
            header {
                &.has-navigation {
                    grid-template-areas: "company-logo main-navigation";
                }
            }
        }
    }
}

@media only screen and (max-width: $medium-max-width) {
    .cmd-site-header {
        header {
            grid-auto-rows: auto; /* items should be as large as their content */

            .cmd-main-navigation#main-navigation-wrapper {
                &:not(.persist-on-mobile) {
                    padding: 0;
                }
            }
        }

        &.navigation-inline {
            .cmd-main-navigation#main-navigation-wrapper {
                &:not(.persist-on-mobile) {
                    padding-left: var(--default-padding);
                }
            }

            &.off-canvas-right {
                .cmd-main-navigation#main-navigation-wrapper {
                    &:not(.persist-on-mobile) {
                        padding: 0;
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: $small-max-width) {
    .cmd-site-header {
        gap: calc(var(--default-gap) / 2);

        .top-header {
            .cmd-list-of-links {
                padding: 0;
            }
        }

        .cmd-company-logo {
            margin: 0 auto
        }

        &.navigation-inline {
            header {
                .cmd-company-logo, #main-navigation-wrapper {
                    grid-column: span calc(var(--grid-small-span) / 2);
                }
            }
        }
    }
}

/* end cmd-site-header ------------------------------------------------------------------------------------------ */
</style>
