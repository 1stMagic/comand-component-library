<template>
    <div class="thumbnail-scroller gallery-scroller">
        <a href="#" @click.prevent="previous" class="switch_button_previous icon-single_arrow_left" title="Previous"></a>
        <transition-group name="slide" tag="ul">
            <li v-for="(image, index) in thumbnails" :key="image.imgId" :class="{'active' : imgIndex == index}">
                <a href="#" @click.prevent="showFancyBox(index)">
                    <figure>
                        <img :src="image.srcImageSmall" :alt="image.alt" />
                        <figcaption>{{ image.figcaption }}</figcaption>
                    </figure>
                </a>
            </li>
        </transition-group>
        <a href="#" v-on:click.prevent="next" class="switch_button_next icon-single_arrow_right" title="Next"></a>
    </div>
</template>

<style scoped lang="scss">
.slide-move {
    transition: transform 1s ease-in-out;
}
</style>

<script>
import {openFancyBox} from '@/components/FancyBox.vue'

export default {
    data() {
        return {
            thumbnails: this.thumbnailScrollerItems // assign thumbnailScrollerItems to thumbnails-property (because array must be changable)
        }
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
          type: Number
        }
    },

    methods: {
        next() {
            const thumbnail = this.thumbnails.shift(); // remove first element of array
            if (thumbnail) {
                this.thumbnails.push(thumbnail);
            }
        },

        previous() {
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
   }
}

</script>

<style scoped lang="scss">
/* begin thumbnail-scroller --------------------------------------------------------------------------------------------------------------------------------------------------- */
.thumbnail-scroller {
    overflow: hidden;
    margin-bottom: calc(var(--default-margin) * 2);
    border: var(--default-border);
    background: var(--blank-color);
    border-radius: var(--border-radius);

    > ul {
        overflow: hidden;
        width: 200%;
        margin: 0;
        display: -webkit-flex; /* Safari 6-8 */
        display: flex;
        gap: var(--default-margin);

        > li {
            align-self: center;
            margin: var(--default-margin) 0;

            a {
                text-align: center;
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

        &.hide_figcaption figcaption {
            display: none;
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

            [class*="switch_button_"] {
                width: 100%;
                height: auto;

                &::before {
                    transform: rotate(90deg);
                    display: inline-block;
                    margin: 0 auto;
                }
            }
        }

        .switch_button_next {
            top: auto;
            bottom: 0;
        }
    }
}
/* end thumbnail-scroller --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>
