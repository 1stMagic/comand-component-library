<template>
    <div class="cmd-slideshow" :class="{'full-width': fullWidth}">
        <div class="inner-slideshow-wrapper" @mouseenter="pause = true" @mouseleave="pause = false">
            <!-- begin CmdSlideButton -->
            <CmdSlideButton
                v-if="showSlideButtons"
                @click.prevent="showPrevItem"
                slideButtonType="prev"
                :class="{'disabled': slideshowItemEditing}"
                v-bind="tooltipForSlidebuttons"
            />
            <!-- end CmdSlideButton -->

            <!-- begin area to slide -->
            <transition-group name="fade">
                <template v-if="currentItem">
                    <template v-if="!useSlot">
                        <template v-if="!editModeContext">
                            <a v-if="currentItem?.link?.href" :href="currentItem?.link?.href"
                               :title="currentItem?.link?.tooltip">
                            <!-- begin CmdImage -->
                            <CmdImage :image="currentItem?.image" :figcaption="currentItem?.figcaption"/>
                            <!-- begin CmdImage -->
                        </a>

                       <!-- begin CmdImage -->
                            <CmdImage v-else :image="currentItem?.image" :figcaption="currentItem?.figcaption"/>
                            <!-- begin CmdImage -->
                        </template>

                        <!-- begin edit-mode view -->
                        <!-- begin CmdImage -->
                        <CmdImage
                            v-else-if="slideshowItems.length"
                            :image="currentItem?.image"
                            :figcaption="currentItem?.figcaption"
                            :componentPath="['props', 'slideshowItems', index]"
                            :editModeConfig="imageStructure()"
                        />
                        <!-- end CmdImage -->
                        <!-- end edit-mode view -->
                    </template>
                    <div
                        v-else
                        class="slot-wrapper"
                        :key="index"
                        :style="'background-image: url(' + currentItem.image.srcLarge + ')'"
                    >
                        <!-- begin slot -->
                        <slot :name="'item' + currentSlotItem"></slot>
                        <!-- end slot -->
                    </div>
                </template>
                <button v-else-if="editModeContext" type="button" class="button confirm"  @click="onAddItem">
                    <span class="icon-plus"></span>
                    <span>Add new slideshow-image</span>
                </button>
            </transition-group>
            <!-- end area to slide -->

            <!-- begin CmdSlideButton -->
            <CmdSlideButton
                v-if="showSlideButtons"
                @click.prevent="showNextItem"
                :class="{'disabled': slideshowItemEditing}"
                v-bind="tooltipForSlidebuttons"
            />
            <!-- end CmdSlideButton -->

            <ol v-if="showQuickLinkIcons">
                <li v-for="(item, i) in slideshowItems" :key="i" :class="{active: i === index }">
                    <a href="#"
                       :class="{'disabled': slideshowItemEditing}"
                       @click.prevent="showItem(i)"
                       :aria-label="index"
                       :title="slideshowItemEditing ? 'Not allowed while editing!' : 'Switch to image #' + (i + 1)"
                    >
                    </a>
                </li>
            </ol>
            <span class="item-counter" v-if="showCounter">{{ index + 1 }}/{{ slideshowItems.length }}</span>
        </div>
    </div>
</template>

<script>
// import mixins
import EditMode from "../mixins/EditMode.vue"
import {buildComponentPath, updateHandlerProvider} from "../utils/editmode.js"
import {createUuid} from "../utils/common.js"
export default {
    name: "CmdSlideshow",
    mixins: [EditMode],
    data() {
        return {
            index: 0,
            pause: false,
            hnd: null,
            fullWidth: false,
            currentSlotItem: 0,
            slideshowItemEditing: false
        }
    },
    props: {
        /**
         * use slot for images
         */
        useSlot: {
            type: Boolean,
            default: false
        },
        /**
         * activate if images should switch automatically
         */
        autoplay: {
            type: Boolean,
            default: false
        },
        /**
         * set milliseconds to switch images (if autoplay is activated only)
         */
        autoplayInterval: {
            type: Number,
            default: 5000
        },
        /**
         * shows buttons/icons to let user quick jump to each image
         */
        showQuickLinkIcons: {
            type: Boolean,
            default: true
        },
        /**
         * activate if current number of each image should be displayed
         */
        showCounter: {
            type: Boolean,
            default: false
        },
        /**
         * list of images to display (use slot must be set to false)
         */
        slideshowItems: {
            type: Array,
            required: true
        },
        /**
         * toggle slide-buttons-visibility
         */
        showSlideButtons: {
            type: Boolean,
            default: false
        },
        /**
         * properties for CmdSlideButtons-component
         *
         * showSlideButtons-property must be activated
         *
         * @requiredForAccessibility: partial
         */
        cmdSlideButtons: {
            type: Object,
            default() {
                return {
                    next: {
                        next: {
                            "iconClass": "icon-single-arrow-right",
                            "tooltip": "Next"
                        }
                    },
                    prev: {
                        prev: {
                            "type": "prev",
                            "iconClass": "icon-single-arrow-left",
                            "tooltip": "Previous"
                        }
                    }
                }
            }
        }
    },
    beforeUnmount() {
        if (this.hnd !== null) {
            window.clearInterval(this.hnd);
            this.hnd = null;
        }
    },
    methods: {
        itemProvider() {
            return {
                "image": {
                    "src": {
                        "large": "/media/images/slideshow-images/large/slide1.jpg",
                        "medium": "/media/images/slideshow-images/medium/slide1.jpg",
                        "small": "/media/images/slideshow-images/small/slide1.jpg"
                    },
                    "alt": "Alternative Text",
                    "tooltip": "Tooltip DE"
                },
                "figcaption": {
                    "text": "Figcaption DE",
                    "position": "bottom",
                    "textAlign": "center",
                    "show": true
                }
            }
        },
        onAddItem() {
            this.editModeContext.content.addContent(
                buildComponentPath(this, 'props', 'slideshowItems', -1),
                this.itemProvider)
        },
        imageStructure() {
            return {
                itemProviderOverwrite: () => ({
                    "image": {
                        "src": {
                            "large": "/media/images/slideshow-images/large/slide1.jpg",
                            "medium": "/media/images/slideshow-images/medium/slide1.jpg",
                            "small": "/media/images/slideshow-images/small/slide1.jpg"
                        },
                        "tooltip": "Tooltip DE"
                    }
                })
            }
        },
        showPrevItem() {
            // avoids slide-button to be clicked in edit-mode
            if (this.slideshowItemEditing) {
                return
            }

            if (this.useSlot) {
                if (this.currentSlotItem > 0) {
                    this.currentSlotItem--
                } else {
                    this.currentSlotItem = Object.keys(this.$slots).length - 1
                }
            }
            if (this.index > 0) {
                this.index--
            } else {
                this.index = this.slideshowItems.length - 1
            }
        },
        showItem(i) {
            if (!this.slideshowItemEditing && i >= 0 && i < this.slideshowItems.length) {
                this.index = i;
            }
        },
        showNextItem() {
            // avoids slide-button to be clicked in edit-mode
            if (this.slideshowItemEditing) {
                return
            }

            if (this.useSlot) {
                if (this.currentSlotItem < Object.keys(this.$slots).length - 1) {
                    this.currentSlotItem++
                } else {
                    this.currentSlotItem = 0
                }
            }

            if (this.index < this.slideshowItems.length - 1) {
                this.index++
            } else {
                this.index = 0
            }
        },
        setupSlider() {
            if (this.autoplay && this.hnd === null) {
                this.hnd = window.setInterval(() => this.pause || this.showNextItem(), this.autoplayInterval);
            }
        }
    },

    /* computed property to get current slide */
    computed: {
        tooltipForSlidebuttons() {
            if (this.slideshowItemEditing) {
                return {
                    title: "Not allowed while editing!"
                }
            }
            return {}
        },
        /* computed property to get current slide */
        currentItem() {
            if (this.slideshowItems.length <= this.index) {
                return null
            }
            return this.slideshowItems[this.index]
        }
    },
    watch: {
        slideshowItems: {
            handler() {
                this.index = 0
                this.setupSlider()
            },
            immediate: true,
            deep: true
        },
        currentItem() {
            // wait to nextTick to ensure ref is available
            this.$nextTick(() => {
                this.$refs.slideshowItemComponentWrapper?.addEditStateListener(editing => this.slideshowItemEditing = editing)
            })

        }
    }
}
</script>

<style lang="scss">
/* begin cmd-slideshow ---------------------------------------------------------------------------------------- */
@import '../assets/styles/variables';

.cmd-slideshow {
    figure a, img {
        display: block;
        text-decoration: none;
        margin: 0 auto;
    }

    figcaption {
        width: 100%;
        display: block;
        text-align: center;
        bottom: 0;
        padding: var(--default-padding);
        line-height: 100%;
        font-size: 3rem;
        color: var(--pure-white);
        background: var(--primary-color);
    }

    .inner-slideshow-wrapper {
        display: flex;
        justify-content: center;

        > a:not(.button) {
            text-decoration: none;

            figcaption {
                border: var(--primary-border);

                &:hover, &:active, &:focus {
                    background: var(--pure-white);
                    color: var(--hyperlink-color);
                }
            }
        }

        figure {
            width: 100%; /* important to stretch figure with position: absolute over full width */
            margin: 0;
        }

        .slot-wrapper {
            padding: calc(var(--default-padding) * 5);
            width: 100%;
            min-height: 50rem;
            background-repeat: no-repeat;
            background-position: top center;
            display: flex;
            justify-content: center;
            align-content: center;

            .box {
                align-self: flex-start;
            }
        }

        .image-wrapper {
            width: 100%;
            min-width: 11.1rem; // assure to be as wide as action-buttons in edit-mode
            min-height: 50rem;
        }

        > ol {
            display: -webkit-flex; /* Safari 6-8 */
            display: flex;
            margin: 0 auto;
            position: absolute;
            left: 5.5rem;
            top: .5rem;
            gap: calc(var(--default-gap) / 2);

            li {
                padding: .2rem;
                list-style-type: none;
                margin: 0;
                border: var(--default-border-reduced-opacity);
                border-radius: var(--full-circle);
                background: var(--light-gray);

                a {
                    display: block;
                    width: 1rem;
                    height: 1rem;
                    border-radius: var(--full-circle);
                }

                &:hover, &:active, &:focus, &.active {
                    border-color: var(--pure-white);

                    a {
                        background: var(--pure-white);
                        transition: var(--default-transition);
                    }
                }
            }

            &.bottom {
                position: relative;
                justify-content: center;
                left: unset;
                top: unset;

                li {
                    border-color: var(--primary-color);

                    &:hover, &:active, &:focus, &.active {
                        border-color: var(--primary-color);
                        background: var(--pure-white);

                        a {
                            background: var(--primary-color);
                        }
                    }
                }
            }

            /* vertical slideshow */
            &.vertical {
                flex-direction: column;
            }
        }

        > .item-counter {
            position: absolute;
            top: .5rem;
            right: 5.5rem;
            padding: 0 0.2rem;
            border-radius: var(--border-radius);
            background: var(--pure-white-reduced-opacity);
        }
    }

    @media only screen and (max-width: $medium-max-width) {
        figcaption {
            font-size: 2rem;
        }
    }
}

.edit-mode .cmd-slideshow .image-wrapper.edit-items {
    padding: 0;
    margin-top: 2rem;

    label.edit-mode input {
        font-size: 3rem;
    }
}

/* end cmd-slideshow ------------------------------------------------------------------------------------------ */
</style>
