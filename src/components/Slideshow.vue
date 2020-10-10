<template>
    <div class="slideshow-wrapper" :class="{'full-width': fullWidth}">
        <div class="slideshow" @mouseenter="pause = true" @mouseleave="pause = false">
            <SlideButton @click.prevent="showPrevItem" :slideButtonType="slideButtons.previous" />
                <figure v-if="currentItem" :key="index" class="slideshow-item">
                    <a v-if="currentItem.href" :href="currentItem.href" :title="currentItem.title">
                        <img :src="currentItem.imgPath" :alt="currentItem.alt" />
                        <figcaption>{{ currentItem.figcaption }}</figcaption>
                    </a>
                    <template v-else>
                        <img v-bind:src="currentItem.imgPath" v-bind:alt="currentItem.alt" />
                        <figcaption>{{ currentItem.figcaption }}</figcaption>
                    </template>
                </figure>
            <SlideButton @click.prevent="showNextItem" :slideButtonType="slideButtons.next" />
            <ol>
                <li v-for="(item, i) in slideshowItems" :key="i" :class="{active: i === index }">
                    <a href="#" @click.prevent="index = i"></a>
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
import SlideButton from "@/components/SlideButton.vue";

const NOT_YET_PRELOADED_IMAGE = (image) => !image.loaded;
const NOT_YET_PRELOADED_IMAGES = (item) => item.images && item.images.find(NOT_YET_PRELOADED_IMAGE);

export default {
    name: "Slideshow",
    props: {
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
                        "iconClass": "icon-single_arrow_right",
                        "tooltip": "Next"
                    },
                    "previous": {
                        "buttonType": "previous",
                        "iconClass": "icon-single_arrow_left",
                        "tooltip": "Previous"
                    }
                }
            }
        }
    },
    components: {
        SlideButton
    },
    data() {
        return {
            index: 0,
            pause: false,
            hnd: null,
            preloadComplete: false,
            fullWidth: false
        }
    },

    created() {
        this.setupSlider();
    },

    beforeDestroy() {
        if (this.hnd !== null) {
            window.clearInterval(this.hnd);
            this.hnd = null;
        }
    },

    methods: {
        showPrevItem() {
            if (this.index > 0) {
                this.index--;
            } else {
                this.index = this.slideshowItems.length - 1;
            }
            this.preload(this.index);
        },

        showItem(i) {
            if (i >= 0 && i < this.slideshowItems.length) {
                this.index = i;
                this.preload(this.index);
            }
        },

        showNextItem() {
            if (this.index < this.slideshowItems.length - 1) {
                this.index++;
            } else {
                this.index = 0;
            }
            this.preload(this.index);
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
    }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';
/* begin slideshow --------------------------------------------------------------------------------------------------------------------------------------------------- */
.slideshow-wrapper {
    figure a, img {
        display: block;
        text-decoration: none;
    }

    figcaption {
        font-size: 3rem;
        width: 100%;
        display: block;
        color: var(--pure-white);
        background: var(--primary-color);
        text-align: center;
        bottom: 0;
        padding: var(--default-padding);
        line-height: 100%;
    }

    .slideshow {
        .slideshow-item {
            width: 100%; /* important to stretch figure with position: absolute over full width */
            margin: 0;

            > div {
                display: -webkit-flex; /* Safari 6-8 */
                display: flex;
                align-items: stretch;

                > a {
                    writing-mode: vertical-lr;
                    padding: 1rem;
                    background: red;
                    border: 1px solid black;
                }
            }
        }

        > ol {
            display: -webkit-flex; /* Safari 6-8 */
            display: flex;
            margin: 0 auto;
            position: absolute;
            left: 5.5rem;
            top: .5rem;

            li {
                border: var(--default-border-reduced-opacity);
                margin: calc(var(--default-margin) / 2) 0;
                padding: .3rem;
                list-style-type: none;
                border-radius: var(--full-circle);
                margin-right: calc(var(--default-margin) * .5);

                &:hover , &:active, &:focus {
                    border-color: var(--pure-white);

                    a {
                        background: var(--pure-white);
                        transition: var(--default-transition);
                    }
                }

                a {
                    display: block;
                    width: 1rem;
                    height: 1rem;
                    border-radius: var(--full-circle);
                }
            }

            &.bottom {
                position: relative;
                justify-content: center;
                left: unset;
                top: unset;

                li {
                    border-color: var(--primary-color);

                    &:hover , &:active, &:focus {
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
    }

    @media only screen and (max-width: $medium-max-width) {
        figcaption {
            font-size: 2rem;
        }
    }
}
/* end slideshow --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>
