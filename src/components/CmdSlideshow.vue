<template>
    <div class="cmd-slideshow" :class="{'full-width': fullWidth}">
        <div class="inner-slideshow-wrapper" @mouseenter="pause = true" @mouseleave="pause = false">
            <CmdSlideButton @click.prevent="showPrevItem" :slideButtonType="slideButtons.previous"/>
            <transition name="fade">
                <a v-if="currentItem.href" :href="currentItem.href" :key="index" :title="currentItem.title">
                    <figure v-if="currentItem && !useSlot" class="slideshow-item">
                        <img :src="currentItem.imgPath" :alt="currentItem.alt"/>
                        <figcaption>{{ currentItem.figcaption }}</figcaption>
                    </figure>
                </a>
                <figure v-else-if="!currentItem.href && currentItem && !useSlot" :key="index" class="slideshow-item">
                        <img :src="currentItem.imgPath" :alt="currentItem.alt"/>
                        <figcaption>{{ currentItem.figcaption }}</figcaption>
                </figure>
                <div
                    class="image-wrapper"
                    v-else-if="currentItem && useSlot"
                    :key="index"
                    :style="'background-image: url(' + currentItem.imgPath + ')'"
                >
                    <slot :name="'item' + currentSlotItem"></slot>
                </div>
            </transition>
            <CmdSlideButton @click.prevent="showNextItem" :slideButtonType="slideButtons.next"/>
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
import CmdSlideButton from "./CmdSlideButton.vue"

const NOT_YET_PRELOADED_IMAGE = image => !image.loaded
const NOT_YET_PRELOADED_IMAGES = item => item.images && item.images.find(NOT_YET_PRELOADED_IMAGE)

export default {
    name: "CmdSlideshow",
    data() {
        return {
            index: 0,
            pause: false,
            hnd: null,
            preloadComplete: false,
            fullWidth: false,
            currentSlotItem: 0
        }
    },
    components: {
        CmdSlideButton
    },
    props: {
        useSlot: {
            type: Boolean,
            default: false
        },
        autoplay: {
            type: Boolean,
            default: false
        },
        showQuickLinkIcons: {
            type: Boolean,
            default: true
        },
        showCounter: {
            type: Boolean,
            default: false
        },
        autoplayInterval: {
            type: Number,
            default: 5000
        },
        slideshowItems: {
            type: Array,
            required: true
        },
        slideButtons: {
            type: Object,
            default() {
                return {
                    "next": {
                        "buttonType": "next",
                        "iconClass": "icon-single-arrow-right",
                        "tooltip": "Next"
                    },
                    "previous": {
                        "buttonType": "previous",
                        "iconClass": "icon-single-arrow-left",
                        "tooltip": "Previous"
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
            this.preload(this.index)
        },

        showItem(i) {
            if (i >= 0 && i < this.slideshowItems.length) {
                this.index = i;
                this.preload(this.index);
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
            this.preload(this.index)
        },

        setupSlider() {
            this.preload();
            if (this.autoplay && this.hnd === null) {
                this.hnd = window.setInterval(() => this.pause || this.showNextItem(), this.autoplayInterval);
            }
        },

        preload(index = 0, num = 2) {
            if (!this.preloadComplete) {
                for (let i = index, n = index + num, c = this.slideshowItems.length; i < n && i < c; i++) {
                    const image = this.getDeviceImage(this.slideshowItems[i]);
                    if (image && !image.loaded) {
                        image.loaded = true;
                        new Image().src = image.imgPath;
                    }
                }
                this.preloadComplete = !this.slideshowItems.find(NOT_YET_PRELOADED_IMAGES);
            }
        },

        getDeviceImage(item) {
            if (item === undefined || item.images === undefined) {
                return null;
            }
            const deviceWidth = window.innerWidth;
            const image = {};

            for (let i = 0, c = item.images.length; i < c; i++) {
                const deviceImage = item.images[i];

                if (!deviceImage.maxWidth || deviceWidth <= deviceImage.maxWidth) {
                    image.imgPath = deviceImage.imgPath
                    image.alt = item.alt
                    image.figcaption = item.figcaption
                    image.target = item.target
                    image.title = item.title
                    return image;
                }
            }

            if (item.images.length) {
                image.imgPath = item.images[0].imgPath
                image.alt = item.alt
                image.figcaption = item.figcaption
                image.target = item.target
                image.title = item.title
                return image;
            }
            return null;
        }
    },

    /* computed property to get current slide */
    computed: {
        currentItem() {
            return this.getDeviceImage(this.slideshowItems[this.index]);
        }
    },

    watch: {
        slideshowItems: {
            handler() {
                this.index = 0
                this.preloadComplete = false
                this.setupSlider()
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';
/* begin cmd-slideshow ---------------------------------------------------------------------------------------- */
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

        .slideshow-item {
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
