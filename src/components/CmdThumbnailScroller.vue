<template>
    <div :class="['cmd-widget', 'cmd-thumbnail-scroller', {'cmd-gallery-scroller' : !allowOpenFancyBox}]">
        <SlideButton @click.prevent="showPrevItem" :slideButtonType="slideButtons.previous" />
        <transition-group name="slide" tag="ul">
            <li v-for="(image, index) in thumbnails" :key="image.imgId" :class="{'active' : imgIndex === index}">
                <a href="#" @click.prevent="showFancyBox(index)">
                    <figure>
                        <img :src="image.srcImageSmall" :alt="image.alt" />
                        <figcaption v-if="showFigcaption">{{ image.figcaption }}</figcaption>
                    </figure>
                </a>
            </li>
        </transition-group>
        <SlideButton @click.prevent="showNextItem" :slideButtonType="slideButtons.next" />
    </div>
</template>

<script>
import {openFancyBox} from '@/components/CmdFancyBox.vue'
import SlideButton from "@/components/CmdSlideButton.vue"

export default {
    name: "CmdThumbnailScroller",
    data() {
        return {
            thumbnails: []
        }
    },

    components: {
        SlideButton
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
        showFancyBox (index) {
            if(this.allowOpenFancyBox) {
                openFancyBox({fancyBoxGallery: this.thumbnails, defaultGalleryIndex: index})
            }
            this.$emit('click', this.thumbnails[index].imgId)
        }
    },

    watch: {
        thumbnailScrollerItems: {
            handler() {
                this.thumbnails = [... this.thumbnailScrollerItems]
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';
/* begin cmd-thumbnail-scroller --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-thumbnail-scroller {
    overflow: hidden;
    margin-bottom: calc(var(--default-margin) * 2);
    border: var(--default-border);
    background: var(--pure-white);
    border-radius: var(--border-radius);

    > ul {
        overflow: hidden;
        margin: 0;
        display: -webkit-flex; /* Safari 6-8 */
        display: flex;
        gap: var(--default-margin);

        > li {
            align-self: center;
            margin: var(--default-margin) 0;

            a {
                text-align: center;

                figcaption {
                    opacity: .7;
                }
            }

            &.active {
                a {
                    figcaption {
                        opacity: 1;
                    }
                }
            }
        }

        li {
            list-style-type: none;
            max-width: 20rem;
        }

        figure {
            padding: calc(var(--default-padding) / 2);
        }

        img {
            border-radius: var(--border-radius);
            max-height: 15rem;
        }
    }

    &.cmd-gallery-scroller {
        > ul {
            > li {
                a {
                    color: var(--pure-white);
                    text-decoration: none;
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

    .slide-move {
        transition: transform 1s ease-in-out;
    }

    @media only screen and (max-width: $medium-max-width)  {
        & > ul > li {
            flex: none;
            margin: var(--default-margin);
        }

        & img {
            height: 10rem;
            width: auto;
        }
    }
}
/* end cmd-thumbnail-scroller --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>
