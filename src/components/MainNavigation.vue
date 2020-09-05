<template>
    <div>
        <div id="navigation_wrapper" :class="{'hide-sub-navigation' : !showSubNavigations, 'open': showOffcanvas }">
            <nav id="main-navigation">
                <ul :class="{'stretch-items' : stretchMainItems}">
                    <li class="close_nav" v-if="showOffcanvas">
                        <a href="#" @click.prevent="showOffcanvas = false"><span class="icon-cancel"></span><span>Close Navigation</span></a>
                    </li>
                    <li v-for="(navigationEntry, index) in navigationEntries" :key="index" :class="{'open' : navigationEntry.accordion}">
                        <a :href="navigationEntry.href" :target="navigationEntry.target" @click="clickLink($event, navigationEntry)">
                            <span :class="navigationEntry.iconClass" v-if="navigationEntry.iconClass"></span>
                            <span>{{ navigationEntry.name }}</span>
                        </a>
                        <ul v-if="navigationEntry.subentries">
                            <li v-for="(navigationSubEntry, subindex) in navigationEntry.subentries" :key="subindex" :class="{'open' : navigationSubEntry.accordion}">
                                <a :href="navigationSubEntry.href" :target="navigationSubEntry.target" @click="clickLink($event, navigationSubEntry)">
                                    <span>{{ navigationSubEntry.name }}</span>
                                    <span class="icon-single_arrow_right" v-if="navigationSubEntry.subentries"></span>
                                </a>
                                <ul v-if="navigationSubEntry.subentries">
                                    <li v-for="(navigationSubSubEntry, subsubindex) in navigationSubEntry.subentries" :key="subsubindex">
                                        <a :href="navigationSubSubEntry.href" :target="navigationSubSubEntry.target" @click="clickLink($event, navigationSubSubEntry)">
                                            <span>{{ navigationSubSubEntry.name }}</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                     </li>
                </ul>
            </nav>
        </div>
        <a href="#" class="button icon-bars" id="toggle_offcanvas" @click.prevent="showOffcanvas = !showOffcanvas" v-if="persistOnMobile == false"></a>
    </div>
</template>

<script>
import Vue from 'vue'

export default {
    data() {
        return {
            showOffcanvas: false,
            showSubNavigations: true
        }
    },
    props: {
        stretchMainItems: Boolean,
        persistOnMobile: Boolean,
        navigationEntries: Array
    },
    methods: {
        clickLink (event, navigationEntry) {
            if(!navigationEntry.target) {
                event.preventDefault()
                this.$emit('click', navigationEntry.href)
            }
            if(!(navigationEntry.subentries && navigationEntry.subentries.length > 0)) {
                this.showSubNavigations = false
                this.showOffcanvas = false
                window.setTimeout(() => this.showSubNavigations = true,500)
            } else {
                // att item to navigationEntry object and watch for changes
                Vue.set(navigationEntry, 'accordion', !navigationEntry.accordion)
            }
        }
    }
}
</script>

<style scoped lang="scss">
/* begin navigation --------------------------------------------------------------------------------------------------------------------------------------------------- */
#navigation_wrapper {
    background: var(--default-background-color);

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
            border: var(--default-border);

            > li {
                border-right: var(--default-border);

                > a {
                    text-align: center;
                }
            }

            // all list-items
            li {
                &:hover, &:active, &:focus, &.active {
                    > a {
                        background: var(--primary-color);

                        span, span[class*="icon-"] {
                            color: var(--pure-white);
                        }
                    }

                    > ul {
                        display: block;
                    }
                }

                span[class*='single_arrow'] {
                    font-size: 1rem;
                }
            }

            ul {
                border: var(--default-border);
                background: var(--default-background-color);
                display: none;
                position: absolute; /* brings subnavigation to own layer */
                left: 0; 			/* left-position of layer (as left as top-level-entries) */
                z-index: 100; 		/* brings subnavigation to front */
                min-width: 100%;
                background: var(--default-background-color);

                li {
                    border-bottom: var(--default-border);
                    white-space: nowrap;

                    &:last-child {
                        border-bottom: 0;
                        border-bottom-left-radius: var(--border-radius);
                        border-bottom-right-radius: var(--border-radius);
                    }
                }

                ul {
                    top: 0;
                    left: 100%;
                }
            }

            @media only screen and (max-width: 1023px) {
                ul, ul ul {
                    position: relative;
                    left: 0;
                }
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: all linear .5s;
        left: 0;
        opacity: 1
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
        left: -100%;
    }

    header nav > ul, header nav > ul > li {
        border: 0;
    }
}
/* end navigation --------------------------------------------------------------------------------------------------------------------------------------------------- */

.close_nav, .level_up {
    display: none;
    border-bottom: var(--default-border);

    a {
        text-align: center;

        span:not([class*="icon-"]) {
            font-weight: bold;
        }

        span[class*="icon-"] {
            font-size: 1rem;
        }
    }
}

#toggle_offcanvas {
    margin-left: 0;
    display: none;
}

@media only screen and (max-width: 1023px) {
    #toggle_offcanvas {
        display: table;
    }

    .close_nav, .level_up {
        display: block;
    }
}
</style>