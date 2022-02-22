<template>
    <div class="grid-container-create-columns cmd-image-gallery">
        <a v-for="(image, index) in images"
           :key="index"
           @click.prevent="showFancyBox(index)"
           href="#"
           :title="getMessage('cmdsitesearch.labeltext.open_large_image')">
            <figure>
                <figcaption v-if="image.figcaption && figcaptionPosition === 'top'">{{ image.figcaption }}</figcaption>
                <img :src="image.srcImageSmall" :alt="image.alt" />
                <figcaption v-if="image.figcaption && figcaptionPosition === 'bottom'">{{ image.figcaption }}</figcaption>
            </figure>
        </a>
    </div>
</template>

<script>
import {openFancyBox} from "./CmdFancyBox"

// import files for translations
import I18n from "../mixins/I18n"
import DefaultMessageProperties from "../mixins/CmdSiteSearch/DefaultMessageProperties"

export default {
    name: "CmdImageGallery",
    mixins: [I18n, DefaultMessageProperties],
    props: {
        /**
         * list of images (incl. captions)
         */
        images: {
            type: Array,
            required: true
        },
        /**
         * position of figcaption
         *
         * @allowedValues: top, bottom
         */
        figcaptionPosition: {
            type: String,
            default: "bottom"
        }
    },
    methods: {
        showFancyBox(index) {
            openFancyBox({fancyBoxGallery: this.images, defaultGalleryIndex: index})
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-image-gallery ---------------------------------------------------------------------------------------- */
.cmd-image-gallery {
    > a {
        align-self: center;
        justify-self: center;
        grid-column: span var(--grid-small-span);

        img {
            border: var(--default-border);
            border-radius: var(--border-radius);
            max-height: 30rem;

            &:hover, &:active, &:focus {
                img {
                    border: var(--primary-border);
                }

                figcaption {
                    text-decoration: none;
                }
            }
        }

        figcaption {
            padding: calc(var(--default-padding) / 2);
        }

        & + .pager {
            margin-top: calc(var(--default-margin) * 2);
        }
    }
}

/* end cmd-image-gallery ------------------------------------------------------------------------------------------ */
</style>