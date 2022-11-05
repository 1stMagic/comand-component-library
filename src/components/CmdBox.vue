<template>
    <!-- begin boxType 'content' -->
    <div v-if="boxType === 'content'"
         :class="['cmd-box box content', {open : open, collapsible: collapsible, 'stretch-vertically': stretchVertically && open, 'stretch-horizontally': stretchHorizontally}]">
        <template v-if="useSlots?.includes('header')">
            <!-- begin collapsible header with slot -->
            <div v-if="collapsible" class="box-header">
                <!-- begin slot 'header' -->
                <slot name="header"></slot>
                <!-- end slot 'header' -->

                <a href="#" @click.prevent="toggleContentVisibility" :title="open ? iconOpen.tooltip : iconClosed.tooltip" class="toggle-icon">
                    <span :class="[open ? iconOpen.iconClass : iconClosed.iconClass]"></span>
                </a>
            </div>
            <!-- end collapsible header with slot -->

            <!-- begin default header with slot -->
            <div v-else class="box-header">
                <!-- begin slot 'header' -->
                <slot name="header"></slot>
                <!-- end slot 'header' -->
            </div>
            <!-- end default header with slot -->
        </template>
        <template v-else>
            <!-- begin header for collapsible -->
            <a v-if="collapsible" class="box-header" href="#" :title="open ? iconOpen.tooltip : iconClosed.tooltip" @click.prevent="toggleContentVisibility">
                <!-- begin CmdHeadline -->
                <CmdHeadline
                    v-if="cmdHeadline?.headlineText"
                    v-bind="cmdHeadline"
                />
                <!-- end CmdHeadline -->
                <span class="toggle-icon" :class="[open ? iconOpen.iconClass : iconClosed.iconClass]"></span>
            </a>
            <!-- end header for collapsible -->

            <!-- begin CmdHeadline -->
            <CmdHeadline
                v-else-if="!collapsible && cmdHeadline?.headlineText"
                class="box-header"
                v-bind="cmdHeadline"
            />
            <!-- end CmdHeadline -->
        </template>

        <!-- begin box-body -->
        <div v-if="open" class="box-body" aria-expanded="true" role="article">
            <!-- begin slot 'body' -->
            <slot name="body">
                <transition :name="toggleTransition">
                    <p class="padding">{{ textBody }}</p>
                </transition>
            </slot>
            <!-- end slot 'body' -->
        </div>
        <!-- end box-body -->

        <div v-if="useSlots?.includes('footer')" class="box-footer">
            <!-- begin slot 'footer' -->
            <slot name="footer"></slot>
            <!-- end slot 'footer' -->
        </div>
    </div>
    <!-- end boxType 'content' -->

    <!-- begin boxType 'product' -->
    <a v-else-if="boxType === 'product' && product" :class="['cmd-box box product', {'stretch-vertically': stretchVertically, 'stretch-horizontally': stretchHorizontally}]" href="#" @click.prevent="clickOnProduct(product)">
        <div class="box-header flex-container vertical">
            <figure v-if="product.image !== undefined">
                <img :src="product.image.src" :alt="product.image.alt"/>
                <figcaption>{{ product.name }}</figcaption>
            </figure>
            <p v-else>{{ product.name }}</p>

            <!-- begin ribbons -->
            <div v-if="product.new" class="ribbon-new">
                <span>{{ getMessage("cmdbox.productbox.new") }}</span>
            </div>
            <div v-if="product.discount" class="ribbon-discount">
                <span>{{ product.discount }}</span>
            </div>
            <!-- end ribbons -->
        </div>
        <div class="box-body">
            <p v-if="product.articleNumber">{{ getMessage("cmdbox.productbox.article_no") }} {{ product.articleNumber }}</p>
            <p v-if="product.price" class="price">
                <span>{{ product.price }}</span><span :title="globalCurrency.name">{{ globalCurrency.symbol }}</span>
            </p>
            <p v-if="product.description">{{ product.description }}</p>
        </div>
    </a>
    <!-- end boxType 'product' -->

    <!-- begin boxType 'user' -->
    <div v-else-if="boxType === 'user' && user" :class="['cmd-box box user', {'stretch-vertically': stretchVertically,'stretch-horizontally': stretchHorizontally}]">
        <div class="box-header flex-container vertical">
            <figure v-if="user.image">
                <img :src="user.image.src" :alt="user.image.alt"/>
                <figcaption>{{ user.name }}</figcaption>
            </figure>
            <div v-else>
                <span :class="defaultProfileIconClass" :title="user.name"></span>
                <p>{{ user.name }}</p>
            </div>
        </div>
        <div class="box-body">
            <p v-if="user.profession">{{ user.profession }}</p>
            <p v-if="user.position">{{ user.position }}</p>
            <p v-if="user.description" class="description">{{ user.description }}</p>
        </div>
        <div v-if="user.links" class="box-footer">
            <CmdListOfLinks :links="user.links" orientation="horizontal" :useGap="false"/>
        </div>
    </div>
    <!-- end boxType 'user' -->
</template>

<script>
// import mixins
import I18n from "../mixins/I18n"
import DefaultMessageProperties from "../mixins/CmdBox/DefaultMessageProperties"
import GlobalCurrency from "../mixins/GlobalCurrency"

// import components
import CmdHeadline from "./CmdHeadline"
import CmdListOfLinks from "./CmdListOfLinks"

export default {
    name: "CmdBox",
    components: {
        CmdHeadline,
        CmdListOfLinks,
    },
    mixins: [
        I18n,
        DefaultMessageProperties,
        GlobalCurrency
    ],
    data() {
        return {
            open: this.collapsible ? this.collapsingBoxesOpen : true,
            active: true
        }
    },
    emits: ["click", "toggle-collapse"],
    props: {
        collapsingBoxesOpen: {
            type: Boolean,
            required: false
        },
        /**
         * set boyType to show different types of boxes/contents
         *
         * @allowedValues: content, product, user
         * @affectsStyling: true
         */
        boxType: {
            type: String,
            default: "content"
        },
        /**
         * activate if box should be collapsible
         */
        collapsible: {
            type: Boolean,
            default: false
        },
        /**
         * use transition to expand and collapse box-body
         *
         * boyType must be 'content' and 'collapsible' must be activated
         */
        useTransition: {
            type: Boolean,
            default: true
        },
        /**
         * set default profile-icon (will eb shown if no user-image exists)
         */
        defaultProfileIconClass: {
            type: String,
            default: "icon-user-profile"
        },
        /**
         * the shown product (incl. name, price, image, description)
         *
         * @required: only available for boxtype===product
         */
        product: {
            type: Object,
            required: false
        },
        /**
         * the shown user-profile (incl. name, image, contact-data)
         *
         * @required: only available for boxtype===user
         */
        user: {
            type: Object,
            required: false
        },
        /**
         * activated if all content (incl. headline) is given by slot
         *
         * if false textBody-property must be set
         */
        useSlots: {
            type: Array,
            required: false
        },
        /**
         * String used as content (placed in a paragraph-tag) for box-body
         *
         * should only be used, if no further html-structure is required for box-body
         */
        textBody: {
            type: String,
            default: ""
        },
        /**
         * icon to expand an accordion
         *
         * @requiredForAccessibility: partial
         */
        iconOpen: {
            type: Object,
            default: function () {
                return {
                    iconClass: "icon-single-arrow-up",
                    tooltip: "Close content"
                }
            },
        },
        /**
         * icon to collapse an accordion
         *
         * @requiredForAccessibility: partial
         */
        iconClosed: {
            type: Object,
            default: function () {
                return {
                    iconClass: "icon-single-arrow-down",
                    tooltip: "Show content"
                }
            }
        },
        /**
         * allow box to be stretched as wide as parent-element
         */
        stretchHorizontally: {
            type: Boolean,
            default: true
        },
        /**
        * allow box to be stretched as high as parent-element
        */
        stretchVertically: {
            type: Boolean,
            default: true
        },
        /**
         * properties for CmdHeadline-component
         */
        cmdHeadline: {
            type: Object,
            required: false
        }
    },
    computed: {
        toggleTransition() {
            if (this.useTransition) {
                return "fade"
            }
            return ""
        }
    },
    methods: {
        // for collapsible boxes of boxType === content
        toggleContentVisibility() {
            this.open = !this.open
            this.active = !this.active

            this.$emit('toggle-collapse', this.open)
        },
        // for boxType === product
        clickOnProduct(product) {
            this.$emit('click', product)
        }
    },
    watch: {
        collapsingBoxesOpen() {
            // toggle collapse-status of all boxes if changed in outer component
            if (this.collapsible) {
                this.open = this.collapsingBoxesOpen
            }
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-box ---------------------------------------------------------------------------------------- */
.cmd-box {
    display: inline-flex;
    flex-direction: column;
    padding: 0;

    &.stretch-horizontally {
        display: flex;
    }

    &.stretch-vertically {
        height: 100%;
    }

    > .cmd-headline {
        margin-bottom: 0;
    }

    // collapsible box only
    &.collapsible {
        a.box-header {
            justify-content: space-between;
            background: var(--primary-color);

            &:hover, &:active, &:focus {
                background: var(--pure-white);

                * {
                    color: var(--primary-color);
                }
            }
        }
    }

    .box-body {
        padding: var(--default-padding);
    }

    // boyType === 'content'
    &.content {
        > * {
            > *:last-child {
                margin-bottom: 0;
            }
        }

        > .box-header, > a {
            display: flex;
            align-items: center;
            border-top-left-radius: var(--border-radius);
            border-top-right-radius: var(--border-radius);
            padding: calc(var(--default-padding) / 2) var(--default-padding);
            background: var(--medium-gray);
            color: var(--pure-white);
            text-decoration: none;

            > .cmd-custom-headline {
                margin-bottom: 0;
            }

            * {
                color: var(--pure-white);
                margin-bottom: 0;
            }

            > .toggle-icon, .toggle-icon > [class*="icon"] {
                font-size: 1rem;
            }
        }

        .box-body {
            flex-grow: 1;
            padding: 0;

            .padding {
                padding: var(--default-padding);
                margin: 0;
            }

            img {
                display: block;
            }

            .navigation {
                margin: 0;
                height: 100%;
                background: var(--pure-white);

                li {
                    list-style-type: none;
                    margin: 0;

                    a {
                        display: block;
                        padding: var(--default-padding);
                        text-decoration: none;
                        background: var(--pure-white);
                        border-bottom: var(--default-border);

                        &:hover, &:active, &:focus {
                            background: var(--primary-color);
                            color: var(--pure-white);
                        }
                    }

                    &:last-child {
                        a {
                            border: 0;
                        }
                    }
                }
            }
        }

        .box-footer {
            border-bottom-left-radius: var(--border-radius);
            border-bottom-right-radius: var(--border-radius);
            padding: var(--default-padding);
            border-top: var(--default-border);
        }
    }

    // boyType === 'product' and boxType === 'user'
    &.product, &.user {
        > div {
            > .cmd-custom-headline {
                margin-top: var(--default-margin);
                justify-content: center;
            }
        }
    }

    // boyType === 'product'
    &.product {
        text-decoration: none;
        overflow: hidden;

        [class*="ribbon"] {
            position: absolute;
            z-index: 10;
            overflow: hidden;
            width: 10rem;
            height: 10rem;
            top: 0;
            left: 0;

            span {
                position: absolute;
                display: block;
                transform: rotate(-45deg);
                width: 100%;
                top: 15%;
                left: -25%;
                background: var(--error-color);
                font-weight: bold;
                color: var(--pure-white);
                text-transform: uppercase;
                text-align: center;
            }
        }

        .ribbon-discount {
            left: auto;
            right: 0;

            span {
                transform: rotate(45deg);
                right: -20%;
                left: auto;
                background: green;
            }
        }

        > .box-header {
            > img, > div {
                display: table;
                margin: 0 auto;
            }

            img {
                border: 0;
            }

            figcaption {
                font-size: 2rem;
                font-weight: bold;
                padding-top: var(--default-padding)
            }
        }

        .box-body {
            flex-grow: 1;

            > * {
                text-align: center;
            }

            .price {
                font-size: 1.8rem;
                font-weight: bold;

                span:last-child {
                    margin-left: calc(var(--default-margin) / 2);
                }
            }
        }

        &:hover, &:active, &:focus {
            border-color: var(--hyperlink-color-highlighted);
        }
    }

    // boxType === 'user'
    &.user {
        > .box-header {
            --icon-size: 6rem;

            padding: var(--default-padding);

            .cmd-headline  {
                > * {
                    display: block;
                    text-align: center;
                }
            }

            img, > div:first-child > [class*="icon"] {
                display: table;
                margin: 0 auto var(--default-margin) auto;
                padding: calc(var(--default-padding) * 3);
                border-radius: var(--full-circle);
                background: var(--primary-color);
                color: var(--pure-white);

                & + p, & + figcaption {
                    margin: 0 auto;
                    text-align: center;
                    font-weight: bold;
                    font-size: 2rem;
                }
            }

            img {
                padding: 0;
                width: calc(var(--icon-size) * 2);
                aspect-ratio: 1/1;
            }

            > div:first-child > [class*="icon"] {
                font-size: var(--icon-size);
            }
        }

        .box-body {
            flex-grow: 1;

            p {
                text-align: center;
                font-weight: bold;

                &:last-child {
                    margin-bottom: 0;
                }

                &.description {
                    font-weight: normal;
                }
            }
        }

        .box-footer {
            margin-top: auto;
            border-top: var(--default-border);

            .cmd-list-of-links {
                ul {
                    width: 100%;
                    margin-bottom: 0;

                    li {
                        flex: 1;

                        a {
                            flex: 1;
                            padding: var(--default-padding);
                            text-align: center;
                            background: var(--color-scheme-background-color);
                            border-left: var(--default-border);
                        }

                        &:hover, &:active, &:focus {
                            a {
                                background: var(--primary-color);
                                color: var(--pure-white);

                                span, span[class*="icon"] {
                                    color: var(--pure-white);
                                }
                            }
                        }

                        &:first-child {
                            a {
                                border: 0;
                            }
                        }
                    }
                }
            }
        }
    }
}

/* end cmd-box ------------------------------------------------------------------------------------------ */
</style>