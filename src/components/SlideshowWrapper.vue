<template>
    <div id="slideshow_wrapper" v-bind:class="{full_width: fullWidth}">
        <div class="slideshow" @mouseenter="pause = true" @mouseleave="pause = false">
            <div class="slideshow_wrapper">
                <a href="#" v-on:click.prevent="showPrevItem" class="switch_button_previous icon-single_arrow_left" title="previous"></a>
                    <figure v-if="currentItem" v-bind:key="index" class="slideshow_item">
                        <a v-if="currentItem.href" v-bind:href="currentItem.href" v-bind:title="currentItem.title">
                            <img v-bind:src="currentItem.imgPath" v-bind:alt="currentItem.alt" />
                            <figcaption>{{ currentItem.figcaption }}</figcaption>
                        </a>
                        <template v-else>
                            <img v-bind:src="currentItem.imgPath" v-bind:alt="currentItem.alt" />
                            <figcaption>{{ currentItem.figcaption }}</figcaption>
                        </template>
                    </figure>
                <a href="#" v-on:click.prevent="showNextItem" class="switch_button_next icon-single_arrow_right" title="next"></a>
                <ol>
                    <li v-for="(item, i) in slideshowItems" v-bind:key="i" v-bind:class="{active: i == index }"><a href="#" v-on:click.prevent="index = i"></a></li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script>
    const NOT_YET_PRELOADED_IMAGE = (image) => !image.loaded;
    const NOT_YET_PRELOADED_IMAGES = (item) => item.images && item.images.find(NOT_YET_PRELOADED_IMAGE);

    export default {
        props: {
            slideshowItems: Array
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



/*
        @Watch('$store.state.currentLanguage')
        private languageChanged(newLanguage: string) {
            imageSliderClient.getItems(newLanguage)
                .then(this.setupSlider)
                .catch(e => console.error('Error loading slideshow images', e));
        }*/
    }

</script>

<style scoped lang="scss">
/* begin slideshow --------------------------------------------------------------------------------------------------------------------------------------------------- */
.slideshow  {
    figure a, img {
        display: block;
        text-decoration: none;
    }

    figcaption {
        font-size: 3rem;
        width: 100%;
        display: block;
        color: var(--blank-color);
        background: var(--primary-color);
        text-align: center;
        bottom: 0;
        padding: var(--default-padding);
        line-height: 100%;
    }

    .slideshow_wrapper {
        .slideshow_item {
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
                    border-color: var(--blank-color);

                    a {
                        background: var(--blank-color);
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
}
/* end slideshow --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>
