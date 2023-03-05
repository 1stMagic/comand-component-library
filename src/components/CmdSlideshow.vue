<template>
    <div class="cmd-slideshow" :class="{'full-width': fullWidth}">
        <div class="inner-slideshow-wrapper" @mouseenter="pause = true" @mouseleave="pause = false">
            <!-- begin CmdSlideButton -->
            <CmdSlideButton
                @click.prevent="showPrevItem"
                slideButtonType="prev"
            />
            <!-- end CmdSlideButton -->

            <!-- begin area to slide -->
            <transition-group name="fade">
                <template v-if="currentItem">
                    <template v-if="!useSlot">
                        <a v-if="currentItem?.link?.href" :href="currentItem?.link?.href" :title="currentItem?.link?.tooltip" :key="index">
                            <!-- begin CmdImage -->
                            <CmdImage :image="currentItem?.image" :figcaption="currentItem?.figcaption"/>
                            <!-- begin CmdImage -->
                        </a>

                       <!-- begin CmdImage -->
                        <CmdImage v-else :image="currentItem?.image" :figcaption="currentItem?.figcaption" :key="index"/>
                        <!-- begin CmdImage -->
                    </template>
                    <div
                        v-else
                        class="image-wrapper"
                        :key="index"
                        :style="'background-image: url(' + currentItem.image.srcLarge + ')'"
                    >
                        <!-- begin slot -->
                        <slot :name="'item' + currentSlotItem"></slot>
                        <!-- end slot -->
                    </div>
                </template>
            </transition-group>
            <!-- end area to slide -->

            <!-- begin CmdSlideButton -->
            <CmdSlideButton
                @click.prevent="showNextItem"
            />
            <!-- end CmdSlideButton -->

            <ol v-if="showQuickLinkIcons">
                <li v-for="(item, i) in slideshowItems" :key="i" :class="{active: i === index }">
                    <a href="#" @click.prevent="index = i" :aria-label="index"></a>
                </li>
            </ol>
            <span v-if="showCounter">{{ index + 1 }}/{{ slideshowItems.length }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "CmdSlideshow",
    data() {
        return {
            index: 0,
            pause: false,
            hnd: null,
            fullWidth: false,
            currentSlotItem: 0
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
        showPrevItem() {
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
            if (i >= 0 && i < this.slideshowItems.length) {
                this.index = i;
            }
        },
        showNextItem() {
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
            immediate: true
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

        .image-wrapper {
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

        > span {
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

/* end cmd-slideshow ------------------------------------------------------------------------------------------ */
</style>
