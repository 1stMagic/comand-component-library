<template>
    <div class="grid-container-create-columns cmd-image-gallery">
        <!-- begin cmd-headline -->
        <CmdHeadline
            v-if="cmdHeadline?.headlineText || editModeContext"
            v-bind="cmdHeadline"
        />
        <!-- end cmd-headline -->

        <!-- begin default view -->
        <template v-if="!editModeContext">
            <!-- begin images linked to fancybox -->
            <a v-if="useFancyboxForLargeImages" class="image-wrapper" v-for="(image, index) in images"
               :key="index"
               href="#"
               @click.prevent="showFancyBox(index)"
               :title="getMessage('cmdimagegallery.tooltip.open_large_image')">
                <CmdImage :image="image.image" :figcaption="image.figcaption"/>
            </a>
            <!-- end images linked to fancybox -->

            <!-- begin images not linked to fancybox -->
            <div v-else v-for="(image, index) in images" :key="`i${index}`" class="image-wrapper">
                <CmdImage :image="image.image" :figcaption="image.figcaption"/>
            </div>
            <!-- end images not linked to fancybox -->
        </template>
        <!-- end default view -->

        <!-- begin edit-mode view -->
        <CmdImage
            v-else-if="images.length"
            v-for="(image, index) in images"
            :key="index"
            class="image-wrapper"
            :image="image.image"
            :figcaption="image.figcaption"
            :componentPath="['props', 'images', index]"
            :editModeConfig="imageStructure()"
        />
        <!-- end edit-mode view -->

        <!-- begin show placeholder if no image exists (and component is not edited) -->
        <button v-else type="button" class="button confirm" @click="onAddItem">
            <span class="icon-plus"></span>
            <span>Add new gallery-image</span>
        </button>
        <!-- end show placeholder if no image exists (and component is not edited) -->
    </div>
</template>

<script>
// import functions
import {openFancyBox} from "./CmdFancyBox.vue"
import EditMode from "../mixins/EditMode.vue"
import {buildComponentPath, updateHandlerProvider} from "../utils/editmode.js"

export default {
    name: "CmdImageGallery",
    mixins: [EditMode],
    props: {
        /**
         * properties for CmdHeadline-component
         */
        cmdHeadline: {
            type: Object,
            required: false
        },
        /**
         * set if large version of images can be opened in a fancybox
         */
        useFancyboxForLargeImages: {
            type: Boolean,
            default: true
        },
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
        itemProvider() {
            return {
                "image": {
                    "src": "/media/images/demo-images/medium/landscape-01.jpg",
                    "alt": "Alternative Text",
                },
                "figcaption": {
                    "text": "Figcaption DE",
                    "position": "bottom",
                    "textAlign": "center",
                    "show": true
                }
            }
        },
        onAddItem() {
            this.editModeContext.content.addContent(
                buildComponentPath(this, 'props', 'images', -1),
                this.itemProvider)
        },
        showFancyBox(index) {
            openFancyBox({fancyBoxGallery: this.images, defaultGalleryIndex: index})
        },
        getMessage() {
            return ""
        },
        imageStructure() {
            return {
                itemProviderOverwrite: () => ({
                    "image": {
                        "srcImageLarge": "/media/images/demo-images/large/landscape-01.jpg",
                        "tooltip": "Tooltip DE"
                    }
                })
            }
        },
        updateHandlerProvider() {
            const htmlContent = this.editableHtmlContent
            return updateHandlerProvider(this, {
                update(props, childUpdateHandlers) {
                    props.htmlContent = htmlContent
                    const cmdHeadlineUpdateHandler = childUpdateHandlers?.find(handler => handler.name === "CmdHeadline")
                    if (cmdHeadlineUpdateHandler) {
                        props.cmdHeadline = props.cmdHeadline || {}
                        cmdHeadlineUpdateHandler.update(props.cmdHeadline)
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-image-gallery ---------------------------------------------------------------------------------------- */
.cmd-image-gallery {
    > .cmd-headline, > input.edit-mode, > .edit-component-wrapper {
        grid-column: span var(--grid-columns);
        margin-bottom: 0;
    }

    .image-wrapper {
        align-self: center;
        justify-self: center;
        grid-column: span var(--grid-small-span);
        width: 100%;
        min-width: 11.1rem; // assure to be as wide as action-buttons in edit-mode

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