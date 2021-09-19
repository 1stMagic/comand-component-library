<template>
  <transition name="fade">
    <div :class="['cmd-fancybox', {'show-overlay': showOverlay}]" v-if="showFancyBox" role="dialog"
         aria-labelledby="fancybox">
      <div class="popup" :class="{'image' : fancyBoxImageUrl || fancyBoxGallery }">
        <div class="button-wrapper no-flex"
             v-if="(fancyboxOptions.printButtons && (fancyboxOptions.printButtons.color || fancyboxOptions.printButtons.grayscale)) || fancyboxOptions.closeIcon">
          <a href="#"
             v-if="fancyboxOptions.printButtons && fancyboxOptions.printButtons.color"
             :class="['button', fancyboxOptions.printButtons.color.iconClass]"
             :title="fancyboxOptions.printButtons.color.tooltip"
             id="print-color"
             @click.prevent="printInGrayscale = false">
          </a>
          <a href="#"
             v-if="fancyboxOptions.printButtons && fancyboxOptions.printButtons.grayscale"
             :class="['button', fancyboxOptions.printButtons.grayscale.iconClass]"
             :title="fancyboxOptions.printButtons.grayscale.tooltip"
             id="print-grayscale"
             @click.prevent="printInGrayscale = true">
          </a>
          <a href="#"
             v-if="fancyboxOptions.closeIcon"
             :class="fancyboxOptions.closeIcon.iconClass"
             :title="fancyboxOptions.closeIcon.tooltip"
             @click.prevent="close">
          </a>
        </div>
        <div :class="{'grayscale' : printInGrayscale}">
          <div v-if="fancyBoxImageUrl" class="content">
            <img :src="fancyBoxImageUrl" alt=""/>
          </div>
          <div v-else-if="fancyBoxContent" class="content" v-html="fancyBoxContent"></div>
          <div v-else-if="fancyBoxElements" class="content"></div>
          <div v-else-if="fancyBoxGallery" class="content">
            <CmdSlideButton @click.prevent="showPrevItem" :slideButtonType="slideButtons.previous"/>
            <figure>
              <img :src="fancyBoxGallery[index].srcImageLarge" :alt="fancyBoxGallery[index].alt"/>
              <figcaption>{{ fancyBoxGallery[index].figcaption }}</figcaption>
            </figure>
            <CmdSlideButton @click.prevent="showNextItem" :slideButtonType="slideButtons.next"/>
          </div>
          <div v-else class="content">
            <slot></slot>
          </div>
        </div>
      </div>
      <CmdThumbnailScroller v-if="fancyBoxGallery" :thumbnailScrollerItems="[...fancyBoxGallery]"
                            :allowOpenFancyBox="false" @click="showItem" :imgIndex="index"/>
    </div>
  </transition>
</template>

<script>
    import {defineComponent, createApp} from "vue"
    import CmdSlideButton from "./CmdSlideButton.vue"
    import CmdThumbnailScroller from './CmdThumbnailScroller.vue'

    const openFancyBox = (config) => {
        const node = document.createElement('div');
        document.querySelector('body').appendChild(node);
        const fb = createApp(FancyBox, {
            ...config,
            show: true
        })
        fb.mount(node)
    }

    const FancyBox = defineComponent({
        name: "CmdFancyBox",
        props: {
            /**
             * set if content should be loaded by url
             */
            url: {
                type: String,
                required: false
            },
            /**
             * options to show at top (closeIcon, printButtons)
             */
            fancyboxOptions: {
                type: Object,
                default() {
                    return {
                        closeIcon: {
                            "iconClass": "icon-cancel",
                            "tooltip": "Close"
                        },
                        printButtons: {
                            "color": {
                                "iconClass": "icon-print",
                                "tooltip": "print in color"
                            },
                            "grayscale": {
                                "iconClass": "icon-print",
                                "tooltip": "print in grayscale"
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
             *
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
             */
            showOverlay: {
                type: Boolean,
                default: true
            },
            /**
             * show slide-buttons (left/previous and right/next)
             */
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
        components: {
            CmdSlideButton,
            CmdThumbnailScroller
        },
        data() {
            return {
                fancyBoxImageUrl: null,
                fancyBoxContent: null,
                fancyBoxElements: null,
                showFancyBox: this.show,
                printInGrayscale: false,
                index: this.defaultGalleryIndex
            }
        },
        created() {
            if (this.allowEscapeKey) {
                this.$_FancyBox_escapeKeyHandler = e => (e.key === 'Escape' || e.key === 'Esc') && this.close()
                document.querySelector('body').addEventListener('keyup', this.$_FancyBox_escapeKeyHandler)
            }

            /* -- begin avoid scrolling if fancybox is shown */
            /* register new properties for vue-instance */
            /* get current vertical scroll position */
            this.$_FancyBox_verticalScrollPosition = window.scrollY

            if (this.$options.el && this.showFancyBox) {
              document.querySelector('body').classList.add("avoid-scrolling")
            }

            this.$_FancyBox_scrollHandler = () => {
                window.scrollTo(0, this.$_FancyBox_verticalScrollPosition)
            }

            /* -- end avoid scrolling if fancybox is shown */

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
        beforeUnmount() {
            if (this.allowEscapeKey) {
                document.querySelector('body').removeEventListener('keyup', this.$_FancyBox_escapeKeyHandler)
            }
        },
        methods: {
            updateContentOnPropertyChange() {
                this.fancyBoxImageUrl = this.fancyBoxContent = this.fancyBoxElements = null
                if (this.url) {
                    this.loadContent(this.url)
                } else if (this.content) {
                    this.fancyBoxContent = this.content
                } else if (this.elements) {
                    this.fancyBoxElements = this.elements.map(el => el.cloneNode(true))
                    this.$nextTick(() => {
                        this.$el.querySelector('.content').append(...this.fancyBoxElements)
                    })
                }
            },
            async loadContent(url) {
                const contentType = await getContentType(url)
                if (contentType.startsWith('image/')) {
                    this.fancyBoxImageUrl = url
                } else {
                    fetch(url)
                        .then(response => response.text())
                        .then(text => this.fancyBoxContent = text)
                        .catch(error => console.error(`Error loading ${this.url}: ${error}`))
                }
            },
            showPrevItem() {
                if (this.index > 0) {
                    this.index--;
                } else {
                    this.index = this.fancyBoxGallery.length - 1;
                }
            },

            showItem(imgId) {
                for (let i = 0; i < this.fancyBoxGallery.length; i++) {
                    if (this.fancyBoxGallery[i].imgId === imgId) {
                        this.index = i
                        break;
                    }
                }
            },

            showNextItem() {
                console.log(this.index);
                if (this.index < this.fancyBoxGallery.length - 1) {
                    this.index++;
                } else {
                    this.index = 0;
                }
            },

            close() {
                if (this.$options.el) {
                    this.$destroy()
                    this.$el.remove()
                } else {
                    this.showFancyBox = false
                    this.$emit('update:show', false)
                }

                document.querySelector('body').classList.remove("avoid-scrolling")
            }
        },
        watch: {
            show(value) {
                this.showFancyBox = value
            },
            showFancyBox() {
                if (this.showFancyBox) {
                  // add listener to disable scroll
                    this.$_FancyBox_verticalScrollPosition = window.scrollY
                    document.querySelector('body').classList.add("avoid-scrolling")
                    window.addEventListener('scroll', this.$_FancyBox_scrollHandler);
                } else {
                    // Remove listener to re-enable scroll
                    document.querySelector('body').classList.remove("avoid-scrolling")
                    window.removeEventListener('scroll', this.$_FancyBox_scrollHandler);
                }
            }
        }
    })

    async function getContentType(url) {
        const response = await fetch(url, {method: 'HEAD'})
        if (response.ok) {
            return (response.headers.get('Content-Type') || '').split(';')[0]
        }
        return 'text/html'
    }

    export {openFancyBox}
    export default FancyBox
</script>

<style lang="scss">
/* begin cmd-fancybox ---------------------------------------------------------------------------------------- */
@import '../assets/styles/variables';

.cmd-fancybox {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 500;
  display: grid;

  &.show-overlay {
    background: rgba(0, 0, 0, var(--reduced-opacity));
  }

  .popup {
    display: flex;
    flex-direction: column;
    padding: var(--default-padding);
    z-index: 200;
    min-width: 30%;
    max-width: var(--max-width);
    min-height: 30%;
    max-height: 80%;
    background: var(--pure-white);
    overflow: hidden;
    align-self: center;
    justify-self: center;
    border-radius: var(--border-radius);
    overflow-y: auto;

    > .grayscale {
      filter: grayscale(1);
    }

    &.image {
      width: auto;
      overflow-y: hidden;

      img {
        display: block;
      }

      figcaption {
        text-align: center;
      }
    }

    > .button-wrapper {
      margin-bottom: var(--default-margin);
      flex-direction: row;

      a:not(.button) {
        margin-left: auto;
      }
    }

    a.icon-print {
      background: linear-gradient(135deg, #009fe3 0%, #009fe3 25%, #e6007e 25%, #e6007e 50%, #ffed00 50%, #ffed00 50%, #ffed00 75%, #000000 75%, #000000 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      border: var(--default-border);
      margin-left: 0;
      text-shadow: var(--text-shadow);

      &:hover, &:active, &:focus {
        border: var(--primary-border);
        color: var(--pure-white);
      }

      &#print-grayscale {
        background: linear-gradient(135deg, #000000 0%, #000000 50%, #ffffff 50%, #ffffff 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      }
    }

    .content > :only-child {
      margin-bottom: 0;
    }
  }

  .gallery-scroller {
    background: var(--pure-black);
    max-width: 80%;
    left: 0;
    right: 0;
    position: fixed;
    bottom: 1rem;
    margin: auto;
    background: var(--pure-black);

    li:not(.active) {
      img {
        opacity: var(--reduced-opacity);
      }

      a {
        &:hover, &:active, &:focus {
          img {
            opacity: 1;
          }
        }
      }

      figcaption {
        color: var(--pure-white);
        text-decoration: none;
      }
    }
  }

  @media only screen and (max-width: $medium-max-width) {
    .gallery-scroller {
      display: block;
    }

    .popup {
      max-width: 80%;
    }
  }

  @media only screen and (max-width: $small-max-width) {
    [class*="switch-button-"] {
      width: 3rem;

      &::before {
        margin: 0;
        top: 40%;
      }
    }
  }
}

/* end cmd-fancybox ------------------------------------------------------------------------------------------ */
</style>