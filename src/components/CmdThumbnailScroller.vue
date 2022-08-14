<template>
    <div :class="['cmd-thumbnail-scroller', {'gallery-scroller' : !allowOpenFancyBox, 'full-width' : fullWidth}]">
        <!-- begin CmdSlideButton -->
        <CmdSlideButton
            @click.prevent="showPrevItem"
            slideButtonType="prev"
        />
        <!-- end CmdSlideButton -->

        <!-- begin list of images to slide -->
        <transition-group name="slide" tag="ul">
            <li v-for="(image, index) in thumbnails" :key="image.imgId" :class="{'active' : imgIndex === index}">
                <a href="#" @click.prevent="showFancyBox(index)">
                    <figure>
                        <figcaption v-if="figcaption.show && figcaption.position === 'above-image' && image.figcaption.length">{{ image.figcaption }}</figcaption>
                        <img :src="image.srcImageSmall" :alt="image.alt"/>
                        <figcaption v-if="figcaption.show && figcaption.position === 'below-image' && image.figcaption.length">{{ image.figcaption }}</figcaption>
                    </figure>
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
// import components
import CmdSlideButton from "./CmdSlideButton.vue"

// import functions
import {openFancyBox} from './CmdFancyBox.vue'

export default {
    name: "CmdThumbnailScroller",
    components: {
        CmdSlideButton
    },
    data() {
        return {
            thumbnails: []
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
        imgIndex: {
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
    methods: {
        showNextItem() {
            const thumbnail = this.thumbnails.shift(); // remove first element of array
            if (thumbnail) {
                this.thumbnails.push(thumbnail);
            }
        },
        showPrevItem() {
            const thumbnail = this.thumbnails.pop(); // remove last element of array
            if (thumbnail) {
                this.thumbnails.unshift(thumbnail);
            }
        },
        showFancyBox(index) {
            if (this.allowOpenFancyBox) {
                openFancyBox({fancyBoxGallery: this.thumbnails, defaultGalleryIndex: index})
            }
            this.$emit("click", this.thumbnails[index].imgId)
        }
    },
    watch: {
        thumbnailScrollerItems: {
            handler() {
                this.thumbnails = [...this.thumbnailScrollerItems]
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';
/* begin cmd-thumbnail-scroller ------------------------------------------------------------------------------------------ */
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

                figcaption {
                    opacity: var(--reduced-opacity);
                }
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
        > ul {
            > li {
                a {
                    color: var(--pure-white);
                    text-decoration: none;
                }
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
    }
}

@media only screen and (max-width: $medium-max-width) {
    .cmd-thumbnail-scroller {
        display: block;
    }
}

/* end cmd-thumbnail-scroller ------------------------------------------------------------------------------------------ */
</style>
