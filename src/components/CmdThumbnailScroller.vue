<template>
    <div :class="['cmd-thumbnail-scroller', {'gallery-scroller' : !allowOpenFancyBox}]">
        <CmdSlideButton @click.prevent="showPrevItem" :slideButtonType="slideButtons.previous"/>
        <transition-group name="slide" tag="ul">
            <li v-for="(image, index) in thumbnails" :key="image.imgId" :class="{'active' : imgIndex === index}">
                <a href="#" @click.prevent="showFancyBox(index)">
                    <figure>
                        <img :src="image.srcImageSmall" :alt="image.alt"/>
                        <figcaption v-if="showFigcaption">{{ image.figcaption }}</figcaption>
                    </figure>
                </a>
            </li>
        </transition-group>
        <CmdSlideButton @click.prevent="showNextItem" :slideButtonType="slideButtons.next"/>
    </div>
</template>

<script>
import {openFancyBox} from './CmdFancyBox.vue'
import CmdSlideButton from "./CmdSlideButton.vue"

export default {
    name: "CmdThumbnailScroller",
    data() {
        return {
            thumbnails: []
        }
    },

    components: {
        CmdSlideButton
    },

    props: {
        thumbnailScrollerItems: {
            type: Array,
            required: true
        },
        allowOpenFancyBox: {
            type: Boolean,
            default: true
        },
        imgIndex: {
            type: Number,
            required: false
        },
        showFigcaption: {
            type: Boolean,
            default: true
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
            this.$emit('click', this.thumbnails[index].imgId)
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
    background: var(--pure-white);

    > ul {
        overflow: hidden;
        margin: 0;
        display: -webkit-flex; /* Safari 6-8 */
        display: flex;
        gap: var(--grid-gap);

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
