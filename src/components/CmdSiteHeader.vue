<template>
    <div :class="['cmd-site-header', { sticky: sticky }]" role="banner">
        <slot name="top-header"></slot>
        <header :class="useGrid ? 'grid-container-create-columns': 'flex-container'">
            <slot name="logo"></slot>
            <slot name="header"></slot>
        </header>
        <!-- begin CmdMainNavigation -->
        <CmdMainNavigation v-if="mainNavigationEntries" :navigationEntries="mainNavigationEntries" :closeOffcanvas="closeOffcanvas"/>
        <!-- end CmdMainNavigation -->
    </div>
</template>

<script>
import CmdMainNavigation from "./CmdMainNavigation"

export default {
    name: "CmdSiteHeader",
    components: {
        CmdMainNavigation
    },
    props: {
        /**
         * list of main-navigation-entries (incl. sub-entries) given to inner navigationcomponent
         */
        mainNavigationEntries: {
            type: Array,
            required: true
        },
        /**
         * activated sticky-header (stays on top if page is scrolled)
         */
        sticky: {
            type: Boolean,
            default: true
        },
        /**
         * use a grid for positioning of inner-elements (else a flex-container will be used)
         */
        useGrid: {
            type: Boolean,
            default: true
        },
        /**
         * use only if default-button of inner navigation-component should not be used
         */
        closeOffcanvas: {
            type: Object,
            required: false
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
    gap: var(--default-gap);
    border-bottom: var(--default-border);
    background: var(--pure-white);

    &.sticky {
        position: sticky;
        z-index: 300;
    }

    header, .cmd-main-navigation nav, .cmd-top-header-navigation > ul {
        max-width: var(--max-width);
        margin: 0 auto;
        padding: 0 var(--default-padding);
    }

    > .cmd-main-navigation:last-child {
        border-bottom: 0;
    }

    header {
        &.flex-container {
            width: 100%;

            .cmd-logo {
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
