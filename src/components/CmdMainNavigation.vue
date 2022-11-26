<template>
    <div
        :class="[
            'cmd-main-navigation',
            {
                'hide-sub-navigation' : !showSubNavigations,
                'open-off-canvas': showOffcanvas,
                'persist-on-mobile': persistOnMobile,
                'show-content-overlay': showContentOverlay
            }
        ]" id="main-navigation-wrapper">
        <nav>
            <!-- begin main-level -->
            <ul :class="{'stretch-items' : stretchMainItems}">
                <li class="close-nav" v-if="showOffcanvas">
                    <a href="#" id="close-offcanvas" role="button" @click.prevent="closeOffcanvasNavigation">
                        <span v-if="closeOffcanvas.iconClass" :class="closeOffcanvas.iconClass"></span>
                        <span :class="{'hidden': !closeOffcanvas.showText}">{{ closeOffcanvas.text }}</span>
                    </a>
                </li>
                <li v-for="(navigationEntry, index) in navigationEntries" :key="index"
                    :class="{'active' : navigationEntry.active, 'open' : openEntry === index, 'has-subentries': navigationEntry?.subentries?.length}">
                    <!-- begin type === href -->
                    <a
                       v-if="navigationEntry.type === 'href'"
                       :href="navigationEntry.path"
                       :title="navigationEntry.tooltip"
                       :target="navigationEntry.target"
                       @click="executeLink($event, navigationEntry, index)"
                       @mouseover="closeAllSubentries()"
                       @focus="closeAllSubentries()"
                    >
                        <span v-if="navigationEntry.iconClass" :class="navigationEntry.iconClass"></span>
                        <span v-if="navigationEntry.text">{{ navigationEntry.text }}</span>
                        <span v-if="navigationEntry?.subentries?.length"
                              :class="['subentry-icon', subentriesIconClass]"
                        ></span>
                    </a>
                    <!-- end type === href -->

                    <!-- begin type === router -->
                    <router-link
                        v-if="navigationEntry.type === 'router'"
                        :to="getRoute(navigationEntry)"
                        :title="navigationEntry.tooltip"
                    >
                        <span v-if="navigationEntry.iconClass" :class="navigationEntry.iconClass"></span>
                        <span v-if="navigationEntry.text">{{ navigationEntry.text }}</span>
                        <span v-if="navigationEntry.subentries && navigationEntry.subentries.length > 0"
                              :class="['subentry-icon', subentriesIconClass]"></span>
                    </router-link>
                    <!-- end type === router -->

                    <!-- begin sub-level 1 -->
                    <ul v-if="navigationEntry?.subentries?.length" :aria-expanded="openEntry ? 'true' : 'false'">
                        <li v-for="(navigationSubEntry, subindex) in navigationEntry.subentries" :key="subindex" :class="{'open' : openSubentry === subindex}">
                            <!-- begin type === href -->
                            <a v-if="navigationSubEntry.type === 'href'"
                               :href="navigationSubEntry.path"
                               :title="navigationSubEntry.tooltip"
                               :target="navigationSubEntry.target"
                               @click="executeLink($event, navigationSubEntry, subindex, 1)"
                               @mouseover="closeAllSubentries(1)"
                               @focus="closeAllSubentries(1)"
                            >
                                <span v-if="navigationSubEntry.iconClass" :class="navigationSubEntry.iconClass"></span>
                                <span v-if="navigationSubEntry.text">{{ navigationSubEntry.text }}</span>
                                <span v-if="navigationSubEntry.subentries && navigationSubEntry.subentries.length > 0"
                                      :class="['subentry-icon', subentriesIconClass]"
                                ></span>
                            </a>
                            <!-- end type === href -->

                            <!-- begin type === router -->
                            <router-link
                                v-if="navigationSubEntry.type === 'router'"
                                :to="getRoute(navigationSubEntry)"
                                :title="navigationSubEntry.tooltip"
                            >
                                <span v-if="navigationSubEntry.iconClass" :class="navigationSubEntry.iconClass"></span>
                                <span v-if="navigationSubEntry.text">{{ navigationSubEntry.text }}</span>
                                <span v-if="navigationSubEntry.subentries && navigationSubEntry.subentries.length > 0"
                                      :class="['subentry-icon', subentriesIconClass]"></span>
                            </router-link>
                            <!-- end type === router -->

                            <!-- begin sub-level 2 -->
                            <ul v-if="navigationSubEntry.subentries" :aria-expanded="openSubentry ? 'true' : 'false'">
                                <li v-for="(navigationSubSubEntry, subsubindex) in navigationSubEntry.subentries"
                                    :key="subsubindex">
                                    <!-- begin type === href -->
                                    <a v-if="navigationEntry.type === 'href'"
                                       :href="navigationSubSubEntry.path"
                                       :title="navigationSubSubEntry.tooltip"
                                       :target="navigationSubSubEntry.target"
                                       @click="executeLink($event, navigationSubSubEntry)"
                                    >
                                        <span v-if="navigationSubSubEntry.iconClass" :class="navigationSubSubEntry.iconClass"></span>
                                        <span v-if="navigationSubSubEntry.text">{{ navigationSubSubEntry.text }}</span>
                                        <span v-if="navigationSubSubEntry.subentries && navigationSubSubEntry.subentries.length > 0"
                                              :class="['subentry-icon', subentriesIconClass]"
                                        ></span>
                                    </a>
                                    <!-- end type === href -->

                                    <!-- begin type === router -->
                                    <router-link v-if="navigationEntry.type === 'router'"
                                                 :to="getRoute(navigationSubSubEntry)"
                                                 :target="navigationSubSubEntry.target">
                                        <span v-if="navigationSubSubEntry.iconClass" :class="navigationSubSubEntry.iconClass"></span>
                                        <span v-if="navigationSubSubEntry.text">{{ navigationSubSubEntry.text }}</span>
                                        <span v-if="navigationSubSubEntry.subentries && navigationSubSubEntry.subentries.length > 0"
                                              :class="['subentry-icon', subentriesIconClass]"></span>
                                    </router-link>
                                    <!-- end type === router -->
                                </li>
                            </ul>
                            <!-- end sub-level 2 -->
                        </li>
                    </ul>
                    <!-- begin sub-level 1 -->
                </li>
            </ul>
            <!-- end main-level -->
        </nav>

        <!-- begin offCanvasButton -->
        <a v-if="persistOnMobile === false" href="#" class="button" id="toggle-offcanvas" @click.prevent="toggleOffcanvasNavigation">
            <span :class="buttonOffcanvas.iconClass"></span>
            <span :class="{'hidden' : !buttonOffcanvas.showText}">{{ buttonOffcanvas.text }}</span>
        </a>
        <!-- end offCanvasButton -->
    </div>
</template>

<script>
// import functions
import {getRoute} from "../utilities.js"

export default {
    name: "CmdMainNavigation",
    data() {
        return {
            showOffcanvas: false,
            showSubNavigations: true,
            openEntry: -1,
            openSubentry: -1
        }
    },
    props: {
        /**
         * toggle if main-entries (on first-level) should be (horizontally) stretched equally
         */
        stretchMainItems: {
            type: Boolean,
            default: false
        },
        /**
         * set if navigation should persist on mobile and not be collapsed to off-canvas
         *
         * @affectsStyling: true
         */
        persistOnMobile: {
            type: Boolean,
            default: false
        },
        /**
         * list of all navigation-entries (incl. sub-entries)
         */
        navigationEntries: {
            type: Array,
            required: true
        },
        /**
         * link shown inside off-canvas-navigation to close itself
         *
         * @requiredForAccessibility: partial
         */
        closeOffcanvas: {
            type: Object,
            default: function () {
                return {
                    iconClass: "icon-cancel",
                    text: "Close navigation",
                    showText: true
                }
            }
        },
        /**
         * button to open off-canvas-navigation
         *
         * @requiredForAccessibility: partial
         */
        buttonOffcanvas: {
            type: Object,
            default: function () {
                return {
                    iconClass: "icon-bars",
                    text: "Open navigation",
                    showText: false
                }
            }
        },
        /**
         * icon to show if an navigation-entry has sub-entries
         */
        subentriesIconClass: {
            type: String,
            default: "icon-single-arrow-down"
        },
        /**
         * icon to show if a sub-entry has further sub-entries
         */
        subSubentriesIconClass: {
            type: String,
            default: "icon-single-arrow-right"
        },
        /**
         * toggle if overlay over content should be shown if off-canvas is open
         *
         * @affectsStyling: true
         */
        showContentOverlay: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        closeAllSubentries(sublevel) {
            if(!sublevel) {
                this.openEntry = -1
            }
            this.openSubentry = -1
        },
        executeLink(event, navigationEntry, index, sublevel) {
            // execute default-link
            if (navigationEntry.target || (navigationEntry.path.length > 1)) {
                this.showOffcanvas = false
                return true
            }

            // toggle subentries (no link execution)
            if(navigationEntry?.subentries?.length) {
                event.preventDefault()
                if(!sublevel) {
                    // assign index for first sub-level (or close if already open)
                    this.openEntry = this.openEntry === index ? -1 : index
                    this.openSubentry = -1 // close all sub-entries
                } else {
                    // assign index for second sub-level (or close if already open)
                    this.openSubentry = this.openSubentry === index ? -1 : index
                }
                return
            }

            // emit event to handle navigation from outside
            if (navigationEntry.path === '#' || navigationEntry.path === '') {
                event.preventDefault()
                this.$emit('click', navigationEntry.path)
            }

            this.showOffcanvas = false
        },
        getRoute(navigationEntry) {
            return getRoute(navigationEntry)
        },
        closeOffcanvasNavigation() {
            this.showOffcanvas = false
            document.getElementById("toggle-offcanvas").focus()
        },
        toggleOffcanvasNavigation() {
            if (this.showOffcanvas) {
                this.closeOffcanvasNavigation()
            } else {
                // open offcanvas
                this.showOffcanvas = true
                this.$nextTick(() => document.getElementById("close-offcanvas").focus())
            }
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-main-navigation ---------------------------------------------------------------------------------------- */
@import '../assets/styles/variables';

.cmd-main-navigation {
    grid-area: main-navigation;

    &.hide-sub-navigation {
        ul {
            ul {
                display: none;
            }
        }
    }

    nav {
        .stretch-items {
            > li {
                flex: 1
            }
        }

        > ul {
            > li {
                .close-nav {
                    display: none;
                }

                &.open {
                    > ul {
                        display: block;
                        > li {
                            &.open {
                                > ul {
                                    display: block;
                                }
                            }
                        }
                    }
                }
            }
        }

        + div {
            display: none;
        }
    }

    .fade-enter-active, .fade-leave-active {
        left: 0;
    }

    .fade-enter, .fade-leave-to {
        left: -100%;
    }

    header nav > ul, header nav > ul > li {
        border: 0;
    }
}

@media only screen and (max-width: $medium-max-width) {
    .cmd-main-navigation#main-navigation-wrapper {
        --nav-transition: all .5s linear;
        display: flex;
        background: none; /* overwrite framework-css */
        border: 0; /* overwrite framework-css */
        padding: 0 var(--default-padding);

        /* begin offcanvas-navigation */
        &:not(.persist-on-mobile) {
            transition: var(--nav-transition);

            #toggle-offcanvas {
                display: flex;
                margin-bottom: 0;
                width: auto;
            }

            &.open-off-canvas {
                nav {
                    left: 0;
                    opacity: 1;
                    padding: 0 !important;
                    transition: var(--nav-transition);
                    background: var(--default-background-color);
                    border-right: var(--default-border);
                }

                &.show-content-overlay {
                    nav {
                        &::after {
                            content: "";
                            position: fixed;
                            width: calc(100% - var(--nav-width));
                            top: 0;
                            left: var(--nav-width);
                            height: 100%;
                            display: block;
                            background: var(--pure-black-reduced-opacity);
                        }
                    }
                }
            }

            nav {
                --nav-width: 33%;

                position: fixed;
                top: 0;
                left: -100%;
                width: var(--nav-width);
                height: 100%;
                opacity: 0;
                z-index: 500;
                transition: var(--nav-transition);

                ul {
                    flex-direction: column;
                    position: relative;
                    left: 0;
                    border: 0;

                    li {
                        border-bottom: var(--default-border);
                        border-right: 0;

                        &.close-nav {
                            display: block;
                            border-bottom: var(--default-border);

                            a {
                                display: flex;
                                align-items: center;

                                span {
                                    font-weight: bold;

                                    &[class*="icon"] {
                                        font-size: var(--font-size-small);
                                    }
                                }
                            }

                            > a {
                                text-align: left;
                            }
                        }

                        &:not(.open) {
                            &:hover, &:active, &:focus {
                                > ul {
                                    display: none;
                                }
                            }
                        }

                        /* sub-level 1 */
                        ul {
                            li {
                                &:not(:first-child) {
                                    border-top: 0;
                                }

                                &:last-child {
                                    border-bottom: 0;
                                }
                                > a {
                                    padding-left: calc(var(--default-margin) * 2);

                                    span {
                                        & + span[class*="icon"]::before {
                                            display: inline-block;
                                            transform: rotate(0);
                                        }
                                    }
                                }

                                /* sub-level 2 */
                                ul {
                                    li {
                                        a {
                                            padding-left: calc(var(--default-margin) * 4);
                                        }
                                    }
                                }
                            }
                        }

                        &.open {
                            > a span {
                                + span[class*="icon"]::before {
                                    display: inline-block;
                                    transform: rotate(-180deg);
                                }
                            }

                            > ul {
                                height: auto;
                                display: block;
                                opacity: 1;
                                transition: var(--nav-transition);
                            }
                        }
                    }
                }
            }
        }
    }
}

/* keep outside of .cmd-main-navigation to keep specificity */
#toggle-offcanvas {
    margin-left: 0;
    display: none;
}

/* end cmd-main-navigation ------------------------------------------------------------------------------------------ */
</style>