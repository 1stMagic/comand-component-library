<template>
    <div class="grid-container-create-columns cmd-image-gallery">
        <a v-for="(image, index) in images"
           :key="index"
           @click.prevent="showFancyBox(index)"
           href="#"
           :title="getMessage('cmdimagegallery.tooltip.open_large_image')">
           <CmdImage :image="image.image" :figcaption="image.figcaption" />
        </a>
    </div>
</template>

<script>
// import functions
import {openFancyBox} from "./CmdFancyBox.vue"

// import mixins
import I18n from "../mixins/I18n"
import DefaultMessageProperties from "../mixins/CmdImageGallery/DefaultMessageProperties"

export default {
    name: "CmdImageGallery",
    mixins: [I18n, DefaultMessageProperties],
    props: {
        /**
         * list of images (incl. captions)
         *
         * @requiredForAccessibility: partial
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
        }

        figcaption {
            padding: calc(var(--default-padding) / 2);
        }

        &:hover, &:active, &:focus {
            text-decoration: none;

            img {
                border: var(--primary-border);
            }
        }

        & + .pager {
            margin-top: calc(var(--default-margin) * 2);
        }
    }
}

/* end cmd-image-gallery ------------------------------------------------------------------------------------------ */
</style>