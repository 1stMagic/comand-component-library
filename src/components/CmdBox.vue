<template>
    <!-- begin boxType 'content' -->
    <div v-if="boxType === 'content'" :class="['cmd-box box content', {open : open, collapsible: collapsible}]">
        <header v-if="useSlots.includes('header')">
            <!-- begin slot 'header' -->
            <slot name="header"></slot>
            <!-- end slot 'header' -->
        </header>
        <template v-else>
            <!-- begin header for collapsible -->
            <a v-if="collapsible" href="#" :title="open ? iconOpen.tooltip : iconClosed.tooltip" @click.prevent="toggleContentVisibility">
                <!-- begin CmdCustomHeadline -->
                <CmdCustomHeadline v-if="cmdCustomHeadline?.headlineText"
                                   v-bind="cmdCustomHeadline"/>
                <!-- end CmdCustomHeadline -->
                <span class="toggle-icon" :class="[open ? iconOpen.iconClass : iconClosed.iconClass]"></span>
            </a>
            <!-- end header for collapsible -->

            <!-- begin CmdCustomHeadline -->
            <CmdCustomHeadline v-else-if="!collapsible && cmdCustomHeadline?.headlineText"
                               v-bind="cmdCustomHeadline"/>
            <!-- end CmdCustomHeadline -->
        </template>

        <!-- begin box-body -->
        <div v-if="useSlots.includes('body') && open" class="box-body" aria-expanded="true">
            <!-- begin slot 'body' -->
            <slot name="body">
                <transition :name="toggleTransition">
                    <div class="box-body" aria-expanded="true">
                        <p class="padding">{{ textBody }}</p>
                    </div>
                </transition>
            </slot>
            <!-- end slot 'body' -->
        </div>
        <!-- end box-body -->

        <footer v-if="useSlots.includes('footer')">
            <!-- begin slot 'footer' -->
            <slot name="footer"></slot>
            <!-- end slot 'footer' -->
        </footer>
    </div>
    <!-- end boxType 'content' -->

    <!-- begin boxType 'product' -->
    <a v-else-if="boxType === 'product' && product" class="cmd-box box product" href="#" @click.prevent="clickOnProduct(product)">
        <div>
            <img v-if="product.image" :src="product.image.src" :alt="product.image.alt"/>
            <div class="ribbon-new" v-if="product.new">
                <span>{{ getMessage("cmdbox.productbox.new") }}</span>
            </div>
            <div v-if="product.discount" class="ribbon-discount">
                <span>{{ product.discount }}</span>
            </div>
            <!-- begin CmdCustomHeadline -->
            <CmdCustomHeadline v-if="cmdCustomHeadline?.headlineText || product.name"
                               v-bind="cmdCustomHeadline || {}"
                               :headlineText="cmdCustomHeadline?.headlineText ? cmdCustomHeadline?.headlineText : product.name"/>
            <!-- end CmdCustomHeadline -->
        </div>
        <div class="box-body">
            <p v-if="product.articleNumber">{{ getMessage("cmdbox.productbox.article_no") }} {{ product.articleNumber }}</p>
            <p v-if="product.price" class="price">{{ product.price }}</p>
            <p v-if="product.description">{{ product.description }}</p>
        </div>
    </a>
    <!-- end boxType 'product' -->

    <!-- begin boxType 'user' -->
    <div v-else-if="boxType === 'user' && user" class="cmd-box box user">
        <div>
            <img v-if="user.image" :src="user.image.src" :alt="user.image.alt"/>
            <div v-else :class="defaultProfileIconClass" :title="user.name"></div>
            <!-- begin CmdCustomHeadline -->
            <CmdCustomHeadline v-if="cmdCustomHeadline?.headlineText || user.name"
                               v-bind="cmdCustomHeadline || {}"
                               :headlineText="cmdCustomHeadline?.headlineText ? cmdCustomHeadline?.headlineText : user.name"/>
            <!-- end CmdCustomHeadline -->
        </div>
        <div class="box-body">
            <p v-if="user.profession">{{ user.profession }}</p>
            <p v-if="user.position">{{ user.position }}</p>
            <p v-if="user.description" class="description">{{ user.description }}</p>
        </div>
        <footer v-if="user.links">
            <CmdListOfLinks :links="user.links" orientation="horizontal" :useGap="false"/>
        </footer>
    </div>
    <!-- end boxType 'user' -->
</template>

<script>
// import mixins
import I18n from "../mixins/I18n"
import DefaultMessageProperties from "../mixins/CmdBox/DefaultMessageProperties"

// import components
import CmdCustomHeadline from "./CmdCustomHeadline"
import CmdListOfLinks from "./CmdListOfLinks"

export default {
    name: "CmdBox",
    components: {
        CmdCustomHeadline,
        CmdListOfLinks,
    },
    mixins: [
        I18n, DefaultMessageProperties
    ],
    data() {
        return {
            open: this.collapsible ? this.collapsingBoxesOpen : true,
            active: true
        }
    },
    emits: ['click'],
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
         * properties for CmdCustomHeadline-component
         */
        cmdCustomHeadline: {
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
    display: flex;
    flex-direction: column;
    padding: 0;

    > .cmd-custom-headline {
        margin-bottom: 0;
    }

    .box-body {
        padding: var(--default-padding);
    }

    &.content {
        > * {
            > *:last-child {
                margin-bottom: 0;
            }

            &:last-child {
                margin-top: auto;
            }
        }

        > header, > a {
            display: flex;
            align-items: center;
            border-top-left-radius: var(--border-radius);
            border-top-right-radius: var(--border-radius);
            padding: calc(var(--default-padding) / 2) var(--default-padding);
            background: var(--primary-color);
            color: var(--pure-white);
            text-decoration: none;

            > .cmd-custom-headline {
                margin-bottom: 0;
            }

            * {
                color: var(--pure-white);
            }

            > [class*="icon"]:last-child {
                font-size: 1rem;
                margin-left: auto;
            }
        }

        .box-body {
            height: 100%;
            padding: 0;

            .padding {
                padding: var(--default-padding);
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

        footer {
            border-bottom-left-radius: var(--border-radius);
            border-bottom-right-radius: var(--border-radius);
            padding: var(--default-padding);
            border-top: var(--default-border);
        }
    }

    &.product, &.user {
        > div {
            > .cmd-custom-headline {
                margin-top: var(--default-margin);
                justify-content: center;
            }
        }
    }

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
                box-shadow: var(--box-shadow);
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

        > div:first-child {
            > img, > div {
                display: table;
                margin: 0 auto;
            }
        }

        .box-body {
            > * {
                text-align: center;
            }

            .price {
                font-size: 2rem;
                font-weight: bold;
            }
        }

        &:hover, &:active, &:focus {
            border-color: var(--hyperlink-color-highlighted);
        }
    }

    &.user {
        > div:first-child {
            padding: var(--default-padding);
            background: var(--pure-white);

            > img, > div {
                display: table;
                margin: 0 auto;
                padding: calc(var(--default-padding) * 3);
                border-radius: var(--full-circle);
                background: var(--primary-color);
                font-size: 6rem;
                color: var(--pure-white);
            }
        }

        .box-body {
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

        footer {
            margin-top: auto;
            border-top: var(--default-border);


            .cmd-list-of-links {
                ul {
                    margin-bottom: 0;

                    li {
                        flex: 1;

                        a {
                            flex: 1;
                            padding: var(--default-padding);
                            text-align: center;
                            background: var(--pure-white);
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