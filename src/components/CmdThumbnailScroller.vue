<template>
    <div :class="['cmd-thumbnail-scroller', {'gallery-scroller' : !allowOpenFancyBox, 'full-width' : fullWidth, 'large-icons': largeIcons}]">
        <!-- begin CmdSlideButton -->
        <CmdSlideButton
            @click.prevent="showPrevItem"
            slideButtonType="prev"
        />
        <!-- end CmdSlideButton -->

        <!-- begin list of images to slide -->
        <transition-group name="slide" tag="ul">
            <li v-for="(item, index) in items" :key="index" :class="{'active' : activeItemIndex === index}">
                <a :href="executeOnClick === 'url' ? item.url : '#'"
                   @click="executeLink(index, $event)"
                   :title="getTooltip"
                   :target="executeOnClick === 'url' ? '_blank' : null"
                >
                    <!-- begin CmdImage -->
                    <CmdImage v-if="contentType === 'image'" :image="item.image" :figcaption="item.figcaption" />
                    <!-- end CmdImage -->

                    <!-- begin contentType === text -->
                    <template v-else>
                        <!-- begin CmdIcon -->
                        <CmdIcon v-if="item.iconClass" :iconClass="item.iconClass" :type="item.iconType" />
                        <!-- end CmdIcon -->
                        <template v-if="item.text">{{item.text}}</template>
                    </template>
                    <!-- end contentType === text -->
                </a>
            </li>
        </transition-group>
        <!-- end list of images to slide -->

        <!-- begin CmdSlideButton -->
        <CmdSlideButton
            @click.prevent="showNextItem"
            :slideButtons="cmdSlideButtons.next"
        />
        <!-- end CmdSlideButton -->
    </div>
</template>

<script>
// import functions
import {openFancyBox} from './CmdFancyBox.vue'

// import mixins
import I18n from "../mixins/I18n"
import DefaultMessageProperties from "../mixins/CmdThumbnailScroller/DefaultMessageProperties"

export default {
    name: "CmdThumbnailScroller",
    emits: ["click"],
    mixins: [
        I18n,
        DefaultMessageProperties
    ],
    data() {
        return {
            items: []
        }
    },
    props: {
        /**
         * activate to stretch component to full width (of parent element)
         *
         * @affectsStyling: true
         */
        fullWidth: {
            type: Boolean,
            default: false
        },
        /**
         * activate if large icons should be displayed above link text
         *
         * @affectsStyling: true
         */
        largeIcons: {
            type: Boolean,
            default: false
        },
        /**
         * set content-type
         *
         * @allowedValues: "image", "text"
         */
        contentType: {
          type: String,
          default: "image"
        },
        /**
         * set type to define what will be executed on click on a thumbnail-scroller-item
         *
         * @allowedValues: "fancybox", "url", "emit"
         */
        executeOnClick: {
            type: String,
            default: "fancybox"
        },
        /**
         * list of thumbnail-scroller-items
         */
        thumbnailScrollerItems: {
            type: Array,
            required: true
        },
        /**
         * allow large version of images to be opened in CmdFancyBox-component
         */
        allowOpenFancyBox: {
            type: Boolean,
            default: true
        },
        /**
         * set a default index to activate/highlight a specific image/item
         */
        activeItemIndex: {
            type: Number,
            required: false
        },
        /**
         * set figcaption
         */
        figcaption: {
            type: Object,
            default() {
                return {
                    show: true,
                    position: "below-image"
                }
            }
        },
        /**
         * properties for CmdSlideButtons-component
         *
         * @requiredForAccessibility: partial
         */
        cmdSlideButtons: {
            type: Object,
            default() {
                return {
                    next: {
                        next: {
                            type: "next",
                            iconClass: "icon-single-arrow-right",
                            tooltip: "Next"
                        }
                    },
                    prev: {
                        prev: {
                            type: "prev",
                            iconClass: "icon-single-arrow-left",
                            tooltip: "Previous"
                        }
                    }
                }
            }
        }
    },
    computed: {
        getTooltip() {
            if (this.contentType === "image") {
                return this.getMessage("cmdthumbnailscroller.tooltip.open_large_image")
            }
            if (this.executeOnClick === "url") {
                return this.getMessage("cmdthumbnailscroller.tooltip.open_url")
            }
            return this.getMessage("cmdthumbnailscroller.tooltip.open")
        }
    },
    methods: {
        showNextItem() {
            const item = this.items.shift(); // remove first element of array
            if (item) {
                this.items.push(item);
            }
        },
        showPrevItem() {
            const item = this.items.pop(); // remove last element of array
            if (item) {
                this.items.unshift(item);
            }
        },
        showFancyBox(index) {
            if (this.allowOpenFancyBox) {
                openFancyBox({fancyBoxGallery: this.items, defaultGalleryIndex: index})
            }
            this.emitCurrentItemId(index)
        },
        emitCurrentItemId(index) {
            // emit id of current/clicked item
            this.$emit("click", this.items[index].id)
        },
        executeLink(index, event) {
            if(this.executeOnClick === "emit") {
                event.preventDefault()
                // emit id of current/clicked item
                this.emitCurrentItemId(index)
            } else if(this.executeOnClick === "fancybox") {
                event.preventDefault()
                // show content in fancybox
                this.showFancyBox(index)
            }
        }
    },
    watch: {
        thumbnailScrollerItems: {
            handler() {
                // change keys for images to fit CmdImage-properties
                this.items = this.thumbnailScrollerItems.map((item) => {
                    let newItem
                    if(this.contentType === "image") {
                        newItem = {image: {...item.image}, figcaption: {...item.figcaption}}
                        newItem.image.src = newItem.image.srcImageSmall
                    } else {
                        newItem = {...item}
                    }
                    return newItem
                })
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-thumbnail-scroller ------------------------------------------------------------------------------------------ */
@import '../assets/styles/variables';

.cmd-thumbnail-scroller {
    overflow: hidden;
    border-radius: var(--border-radius);
    padding: var(--default-padding);
    display: table;
    margin: 0 auto calc(var(--default-margin) * 2) auto;
    border: var(--default-border);
    background: var(--color-scheme-background-color);

    > ul {
        overflow: hidden;
        margin: 0;
        display: flex;
        gap: var(--grid-gap);
        justify-content: space-between;

        > li {
            align-self: center;
            list-style-type: none;
            margin: 0;

            a {
                text-align: center;
            }

            img {
                border-radius: var(--border-radius);
                max-height: 10rem;
            }

            &.active {
                a {
                    figcaption {
                        opacity: 1;
                    }
                }
            }
        }
    }

    .vertical {
        display: inline-flex;
        left: 50%;
        height: 75rem; /* remove later !!! */
        transform: translateX(-50%);

        > ul {
            width: auto;
            display: -webkit-flex; /* Safari 6-8 */
            display: flex;
            flex-direction: column;

            [class*="switch-button-"] {
                width: 100%;
                height: auto;

                &::before {
                    transform: rotate(90deg);
                    display: inline-block;
                    margin: 0 auto;
                }
            }
        }

        .slide-button-next {
            top: auto;
            bottom: 0;
        }
    }

    &.gallery-scroller {
        max-width: 80%;
        left: 0;
        right: 0;
        position: fixed;
        bottom: var(--default-margin);
        margin: auto;

        li {
            a {
                color: var(--color-scheme-text-color);
                text-decoration: none;
            }

            &.active {
                img {
                    border-color: var(--primary-color);
                }

                figcaption {
                    color: var(--primary-color);
                }
            }

            &:not(.active) {
                img {
                    border: var(--default-border);
                    opacity: var(--reduced-opacity);
                }

                figcaption {
                    text-decoration: none;
                }

                a {
                    &:hover, &:active, &:focus {
                        figcaption {
                            color: var(--primary-color);
                        }

                        img {
                            border-color: var(--primary-color);
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }

    &.large-icons {
        li a {
            display: flex;
            flex-direction: column;
            gap: calc(var(--default-gap) / 4);
            text-decoration: none;
            align-items: center;
            justify-content: center;

            span {
                margin: 0;
            }

            [class*="icon-"] {
                font-size: 5rem;
            }
        }
    }

    @media only screen and (max-width: $medium-max-width) {
        & > ul > li {
            flex: none;
        }

        & img {
            width: auto;
        }

        & > ul > li img {
            max-height: 7rem;
        }

        &.gallery-scroller {
            max-width: calc(100% - calc(var(--default-margin) * 3));
        }
    }
}

@media only screen and (width <= #{$small-max-width}) {
    .cmd-thumbnail-scroller {
        display: block;
    }
}

@container (width <= #{$small-max-width}) {
    .cmd-thumbnail-scroller {
        display: block;
    }
}
/* end cmd-thumbnail-scroller ------------------------------------------------------------------------------------------ */
</style>
