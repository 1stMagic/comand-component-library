<template>
    <teleport to="body">
        <dialog
            ref="dialog"
            :class="['cmd-fancybox', {'show-overlay': showOverlay, 'image' : fancyBoxImageUrl || fancyBoxGallery, 'image-gallery': fancyBoxGallery}]"
            :aria-label="ariaLabelText"
            @cancel="onDialogCancel"
        >
            <header class="flex-container">
                <!-- begin CmdHeadline -->
                <CmdHeadline
                    v-if="cmdHeadline?.show"
                    :headlineText="cmdHeadline?.headlineText"
                    :headlineLevel="cmdHeadline?.headlineLevel"
                    :id="htmlId"
                />
                <!-- end CmdHeadline -->

                <!-- begin button-wrapper -->
                <div
                    v-if="(fancyboxOptions.printButtons?.color || fancyboxOptions.printButtons?.grayscale) || fancyboxOptions.closeIcon"
                    class="button-wrapper no-flex"
                >  <!-- begin print buttons -->
                    <a v-if="showPrintButtons && fancyboxOptions.printButtons?.color"
                       href="#"
                       class="button print-color"
                       :title="fancyboxOptions.printButtons.color?.tooltip"
                       @click.prevent="printInGrayscale = false">
                        <!-- begin CmdIcon -->
                        <CmdIcon
                            :iconClass="fancyboxOptions.printButtons.color?.iconClass"
                            :type="fancyboxOptions.printButtons.color?.iconType"
                        />
                        <!-- end CmdIcon -->
                    </a>
                    <a v-if="showPrintButtons && fancyboxOptions.printButtons?.grayscale"
                       href="#"
                       class="button print-grayscale"
                       :title="fancyboxOptions.printButtons.grayscale?.tooltip"
                       @click.prevent="printInGrayscale = true">
                       <!-- begin CmdIcon -->
                       <CmdIcon
                           :iconClass="fancyboxOptions.printButtons.grayscale?.iconClass"
                           :type="fancyboxOptions.printButtons.grayscale?.iconType"
                       />
                       <!-- end CmdIcon -->
                    </a>
                    <!-- end print buttons -->

                    <!-- begin close-icon -->
                    <a v-if="fancyboxOptions.closeIcon"
                       href="#"
                       class="button primary"
                       id="close-dialog"
                       :title="fancyboxOptions.closeIcon.tooltip"
                       ref="close-dialog"
                       @click.prevent="close">
                       <!-- begin CmdIcon -->
                       <CmdIcon
                           :iconClass="fancyboxOptions.closeIcon.iconClass"
                           :type="fancyboxOptions.closeIcon.iconType"
                       />
                       <!-- end CmdIcon -->
                    </a>
                    <!-- end close-icon -->
                </div>
                <!-- end button-wrapper -->
            </header>
            <div :class="['outer-content-wrapper', {'grayscale' : printInGrayscale}]">
                <div v-if="fancyBoxImageUrl || cmdImage?.image" class="content">
                    <!-- begin CmdImage -->
                    <CmdImage :image="largeSingleImage" :figcaption="cmdImage?.figcaption" />
                    <!-- end CmdImage -->
                </div>
                <div v-else-if="fancyBoxContent" class="content" v-html="fancyBoxContent"></div>
                <div v-else-if="fancyBoxElements" class="content"></div>
                <div v-else-if="fancyBoxGallery" class="content">
                    <!-- begin CmdSlideButton -->
                    <CmdSlideButton @click.prevent="showPrevItem" slideButtonType="prev"/>
                    <!-- end CmdSlideButton -->

                    <!-- begin enlarged image -->
                    <!-- begin CmdImage -->
                    <CmdImage :image="largeGalleryImage" :figcaption="fancyBoxGallery[index].figcaption" />
                    <!-- end CmdImage -->
                    <!-- end enlarged image -->

                    <!-- begin CmdSlideButton -->
                    <CmdSlideButton @click.prevent="showNextItem"/>
                    <!-- end CmdSlideButton -->
                </div>
                <div v-else class="content">
                    <!-- begin slot-content -->
                    <slot></slot>
                    <!-- end slot-content -->
                </div>
            </div>

            <footer v-if="showSubmitButtons && fancyboxOptions.submitButtons" class="flex-container no-flex">
                <!-- begin cancel-button -->
                <button
                    v-if="fancyboxOptions.submitButtons?.cancel"
                    @click="cancel"
                    :title="fancyboxOptions.submitButtons.cancel?.tooltip">
                    <CmdIcon
                        v-if="fancyboxOptions.submitButtons.cancel?.iconClass"
                        :iconClass="fancyboxOptions.submitButtons.cancel?.iconClass"
                        :type="fancyboxOptions.submitButtons.cancel?.iconType"
                    />
                    <span v-if="fancyboxOptions.submitButtons.cancel?.buttonText">{{fancyboxOptions.submitButtons.cancel?.buttonText}}</span>
                </button>
                <!-- end cancel-button -->

                <!-- begin confirm-button -->
                <button
                    v-if="fancyboxOptions.submitButtons?.confirm"
                    @click="confirm"
                    :title="fancyboxOptions.submitButtons.cancel?.tooltip">
                    <CmdIcon
                        v-if="fancyboxOptions.submitButtons.confirm?.iconClass"
                        :iconClass="fancyboxOptions.submitButtons.confirm?.iconClass"
                        :type="fancyboxOptions.submitButtons.confirm?.iconType"
                    />
                    <span v-if="fancyboxOptions.submitButtons.confirm?.buttonText">{{fancyboxOptions.submitButtons.confirm?.buttonText}}</span>
                </button>
                <!-- end confirm-button -->
            </footer>

            <!-- begin CmdThumbnailScroller -->
            <CmdThumbnailScroller
                v-if="fancyBoxGallery"
                :thumbnailScrollerItems="[...fancyBoxGallery]"
                :allowOpenFancyBox="false"
                @click="showItem"
                :activeItemIndex="index"
            />
            <!-- end CmdThumbnailScroller -->
        </dialog>
    </teleport>
</template>

<script>
import {defineComponent, createApp} from "vue"

// import mixins
import Identifier from "../mixins/Identifier"

const openFancyBox = (config) => {
    const node = document.createElement("div");
    document.querySelector("body").appendChild(node);
    const fb = createApp(FancyBox, {
        ...config,
        show: true
    })
    fb.mount(node)
}

const FancyBox = defineComponent({
    name: "CmdFancyBox",
    mixins: [
        Identifier
    ],
    emits: ['cancel', 'confirm'],
    data() {
        return {
            fancyBoxContent: null,
            fancyBoxElements: null,
            fancyBoxImageUrl: null,
            index: this.defaultGalleryIndex,
            printInGrayscale: false,
            showFancyBox: this.show
        }
    },
    props: {
        /**
         * sets default aria-label-text on component
         *
         * @requiredForAccessibility: true
         */
        defaultAriaLabelText: {
            type: String,
            required: false
        },
        /**
         * set if content should be loaded by url
         */
        url: {
            type: String,
            required: false
        },
        /**
         * toggle visibility of print-buttons
         */
        showPrintButtons: {
            type: Boolean,
            default: false
        },
        /**
         * toggle visibility of print-buttons
         */
        showSubmitButtons: {
            type: Boolean,
            default: false
        },
        /**
         * options to show at top (closeIcon, printButtons)
         */
        fancyboxOptions: {
            type: Object,
            default() {
                return {
                    closeIcon: {
                        iconClass: "icon-cancel",
                        iconType: "auto",
                        tooltip: "Close"
                    },
                    printButtons: {
                        color: {
                            iconClass: "icon-print",
                            iconType: "auto",
                            tooltip: "print in color"
                        },
                        grayscale: {
                            iconClass: "icon-print",
                            iconType: "auto",
                            tooltip: "print in grayscale"
                        }
                    },
                    submitButtons: {
                        cancel: {
                            iconClass: "icon-cancel",
                            iconType: "auto",
                            tooltip: "Cancel",
                            buttonText: "Cancel"
                        },
                        confirm: {
                            iconClass: "icon-check",
                            iconType: "auto",
                            buttonText: "Confirm",
                            tooltip: "Confirm",
                            buttonType: "primary"
                        }
                    }
                }
            }
        },
        /**
         * allow closing fancybox by escape-key
         */
        allowEscapeKey: {
            type: Boolean,
            default: true
        },
        /**
         * the content shown in the main area
         */
        content: {
            type: String,
            required: false
        },
        /**
         * list of show elements (not images)
         */
        elements: {
            type: Array,
            required: false
        },
        /**
         * use if a gallery of images should be opened (and navigated) inside fancybox
         */
        fancyBoxGallery: {
            type: Array,
            required: false
        },
        /**
         * if gallery is used, you can set default index
         */
        defaultGalleryIndex: {
            type: Number,
            required: false
        },
        /**
         * show/hide entire fancybox
         */
        show: {
            type: Boolean,
            default: false
        },
        /**
         * show/hide overlay (around fancybox, above website)
         *
         * @affectsStyling: true
         */
        showOverlay: {
            type: Boolean,
            default: true
        },
        /**
         * properties for CmdImage-component
         */
        cmdImage: {
            type: Object,
            required: false
        },
        /**
         * properties for CmdHeadline-component
         *
         * @requiredForAccessibility: true
         */
        cmdHeadline: {
            type: Object,
            required: false
        }
    },
    created() {
        // scroll content to initial position
        this.$_FancyBox_scrollHandler = () => {
            window.scrollTo(0, this.$_FancyBox_verticalScrollPosition)
        }

        this.$watch(
            () => [
                this.url,
                this.content,
                this.elements
            ],
            this.updateContentOnPropertyChange,
            {immediate: true}
        )
    },
    mounted() {
        if (this.showFancyBox) {
            this.showDialog()
        }
    },
    computed: {
      largeGalleryImage() {
          // change src-key for a single item/image in gallery to fit CmdImage-properties
          const fancyBoxItem = {...this.fancyBoxGallery[this.index].image}
          fancyBoxItem.src =  fancyBoxItem.srcImageLarge
          return fancyBoxItem
      },
      largeSingleImage() {
          // change src-key for a single item/image to fit CmdImage-properties
          const fancyBoxItem = {...this.cmdImage?.image || {}}
          if(this.fancyBoxImageUrl) {
              fancyBoxItem.src = this.fancyBoxImageUrl
          }
          return fancyBoxItem
      },
      ariaLabelText() {
          if(this.fancyBoxGallery?.length) {
              return this.fancyBoxGallery[this.index].figcaption.text
          } else {
              return this.defaultAriaLabelText
          }
      }
    },
    methods: {
        onDialogCancel(event) {
            if (!this.allowEscapeKey) {
                event.preventDefault()
                return
            }
            this.close()
        },
        // open dialog/fancybox
        showDialog() {
            // avoid scrolling if fancybox is shown
            document.querySelector("body").classList.add("avoid-scrolling")
            this.$refs.dialog.showModal()

            // overwrite default behavior of dialog-element, which sets focus on first focusable element inside
            this.$refs["close-dialog"].focus()
        },
        updateContentOnPropertyChange() {
            this.fancyBoxImageUrl = this.fancyBoxContent = this.fancyBoxElements = null
            if (this.url) {
                this.loadContent(this.url)
            } else if (this.content) {
                this.fancyBoxContent = this.content
            } else if (this.elements) {
                this.fancyBoxElements = this.elements.map(el => el.cloneNode(true))
                this.$nextTick(() => {
                    this.$el.querySelector(".content").append(...this.fancyBoxElements)
                })
            }
        },
        async loadContent(url) {
            const contentType = await getContentType(url)
            if (contentType.startsWith("image/")) {
                this.fancyBoxImageUrl = url
            } else {
                fetch(url)
                    .then(response => response.text())
                    .then(text => this.fancyBoxContent = text)
                    .catch(error => console.error(`Error loading ${this.url}: ${error}`))
            }
        },
        // switch to previous-item (in fancybox-gallery)
        showPrevItem() {
            if (this.index > 0) {
                this.index--;
            } else {
                this.index = this.fancyBoxGallery.length - 1;
            }
        },
        // show current item (in fancybox-gallery)
        showItem(imgId) {
            for (let i = 0; i < this.fancyBoxGallery.length; i++) {
                if (this.fancyBoxGallery[i].image.id === imgId) {
                    this.index = i
                    break;
                }
            }
        },
        // switch to next-item (in fancybox-gallery)
        showNextItem() {
            if (this.index < this.fancyBoxGallery.length - 1) {
                this.index++;
            } else {
                this.index = 0;
            }
        },
        // close fancybox (by button, escape-key)
        close() {
            this.showFancyBox = false
            this.$emit("update:show", false)

            // remove class to re-enable scrolling
            document.querySelector("body").classList.remove("avoid-scrolling")
        },
        // click on cancel-button
        cancel() {
            this.$emit("cancel", true)
            this.close()
        },
        // click on confirm-button
        confirm() {
            this.$emit("confirm", true)
            this.close()
        }
    },
    watch: {
        show(value) {
            this.showFancyBox = value
        },
        showFancyBox: {
            handler() {
                if (this.showFancyBox) {
                    this.showDialog()
                } else {
                    // remove class to re-enable scrolling
                    document.querySelector("body").classList.remove("avoid-scrolling")
                    this.$refs.dialog.close()
                }
            }
        }
    }
})

async function getContentType(url) {
    const response = await fetch(url, {method: "HEAD"})
    if (response.ok) {
        return (response.headers.get("Content-Type") || "").split(";")[0]
    }
    return "text/html"
}

export {openFancyBox}
export default FancyBox
</script>

<style lang="scss">
/* begin cmd-fancybox ---------------------------------------------------------------------------------------- */
@import "../assets/styles/variables";

.cmd-fancybox {
    z-index: 500;
    flex-direction: column;
    padding: var(--default-padding);
    min-width: 30vw;
    min-height: 30vh;
    background: var(--pure-white);
    border-radius: var(--border-radius);
    overflow: hidden;
    gap: calc(var(--default-gap) / 2);

    &.image-gallery {
        margin-top: calc(var(--default-margin) * 2)
    }

    // detect open-attribute (will be added to dom automatically)
    &[open] {
        display: flex;
    }

    &.show-overlay::backdrop {
        --reduced-opacity: .75; // must be declared again, because ::backdrop does not allow the use of global variables
        background: rgba(0, 0, 0, var(--reduced-opacity));
    }

    > header {
        display: flex;
    }

    .cmd-cookie-disclaimer {
        padding: 0;
    }

    > .grayscale {
        filter: grayscale(1);
    }

    &.image {
        .outer-content-wrapper {
            max-height: none;
        }

        img {
            display: block;
            margin: 0 auto;
        }

        figcaption {
            text-align: center;
        }
    }

    .inner-thumbnail-wrapper li {
        figure {
            opacity: 0.8;
        }

        &.active {
            figure {
                opacity: 1;
            }

            img {
                border-color: var(--hyperlink-color-highlighted);
            }

            a {
                color: var(--hyperlink-color-highlighted);
            }
        }
    }

    > header {
        justify-content: space-between;

        > .cmd-headline {
            max-width: 80%;
            flex-shrink: 1;
            margin-bottom: 0;
        }

        > .button-wrapper {
            flex-shrink: 0;
            flex-direction: row;
            align-items: flex-start;
            gap: calc(var(--default-gap) / 2);
            margin-left: auto;

            > .button {
                display: block;
                border: var(--default-border);
                padding: .2rem;
                min-width: 0;
                min-height: 0;

                &[class*="print"] > [class*="icon-"] {
                    color: var(--text-color);
                }

                &.print-grayscale {
                    background: linear-gradient(135deg, var(--medium-gray) 0%, var(--medium-gray) 50%, var(--pure-white) 50%, var(--pure-white) 100%);
                }

                &.print-color {
                    background: linear-gradient(135deg, #009fe3 0%, #009fe3 25%, #e6007e 25%, #e6007e 50%, #ffed00 50%, #ffed00 50%, #ffed00 75%, var(--medium-gray) 75%, var(--medium-gray) 100%);
                }

                &:hover, &:active, &:focus {
                    border: var(--primary-border);
                    background: var(--pure-white);

                    [class*="icon-"] {
                        color: var(--primary-color);
                    }
                }
            }
        }
    }

    > footer {
        margin-top: auto;
        justify-content: flex-end;
    }

    .outer-content-wrapper {
        max-height: 85vh;
        overflow-x: hidden;
        max-width: var(--max-width);

        .content {
            > img, > video {
                &:only-child {
                    margin: auto;
                    max-height: 80vmin;
                    max-width: 80vmax;
                }
            }

            figcaption {
                font-size: 2rem;
                padding: calc(var(--default-padding) / 2) 0;
            }
        }
    }

    @media only screen and (max-width: $medium-max-width) {
        .outer-content-wrapper {
            .content {
                > img, > video {
                    &:only-child {
                        margin: auto;
                        max-height: 60vmin;
                    }
                }
            }
        }

        > header {
            flex-direction: row;

            .button:not(#close-dialog) {
                display: none;
            }
        }
    }

    @media only screen and (max-width: $small-max-width) {
        .outer-content-wrapper {
            .content {
                > img, > video {
                    &:only-child {
                        max-height: 50vmin;
                    }
                }
            }
        }

        [class*="switch-button-"] {
            width: 3rem;

            &::before {
                margin: 0;
                top: 40%;
            }
        }
    }
}

@media only screen and (max-width: $medium-max-width) {
    dialog {
        margin-top: var(--default-margin);
    }
}
/* end cmd-fancybox ------------------------------------------------------------------------------------------ */
</style>