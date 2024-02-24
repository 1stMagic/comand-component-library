<template>
    <div :class="[
        'cmd-thumbnail-scroller',
        {
            'gallery-scroller' : useGalleryScroller,
            'large-icons': largeIcons,
            vertical: orientation === 'vertical'
        },
        fullWidthClass
        ]"
         ref="thumbnail-scroller">
        <!-- begin cmd-headline -->
        <CmdHeadline
            v-if="cmdHeadline?.headlineText || editModeContext"
            v-bind="cmdHeadline"
        />
        <!-- end cmd-headline -->

        <div class="inner-thumbnail-wrapper">
            <!-- begin CmdSlideButton -->
            <CmdSlideButton
                    v-if="showSlidebuttons"
                    @click.prevent="showPrevItem"
                    slideButtonType="prev"
            />
            <!-- end CmdSlideButton -->

            <!-- begin list of images to slide -->
            <transition-group name="slide" tag="ul">
                <li v-for="(item, index) in items" :key="index"
                    :class="[{'active' : activeItemIndex === index}, item.id ? 'item-' + item.id : '']">
                    <a v-if="!editModeContext" :href="executeOnClick === 'url' ? item.url : '#'"
                       @click="executeLink(index, $event)"
                       :title="tooltip"
                       :target="executeOnClick === 'url' ? '_blank' : null"
                    >
                        <!-- begin CmdImage -->
                        <CmdImage v-if="contentType === 'image'" :image="item.image" :figcaption="item.figcaption"/>
                        <!-- end CmdImage -->

                        <!-- begin contentType === text -->
                        <template v-else>
                            <!-- begin CmdIcon -->
                            <CmdIcon v-if="item.iconClass" :iconClass="item.iconClass" :type="item.iconType"/>
                            <!-- end CmdIcon -->
                            <span v-if="item.text">{{ item.text }}</span>
                        </template>
                        <!-- end contentType === text -->
                    </a>

                    <!-- begin edit-mode -->
                    <!-- begin CmdImage -->
                    <CmdImage
                        v-else-if="contentType === 'image'"
                        :image="item.image"
                        :figcaption="item.figcaption"
                        :componentPath="['props', 'thumbnailScrollerItems', index]"
                        :editModeConfig="imageStructure()"
                    />
                    <!-- end CmdImage -->

                    <!-- begin contentType === text -->
                    <template v-else-if="contentType === 'text'">
                        <!-- begin CmdIcon -->
                        <CmdIcon v-if="item.iconClass" :iconClass="item.iconClass" :type="item.iconType"/>
                        <!-- end CmdIcon -->
                        <span v-if="item.text">{{ item.text }}</span>
                    </template>
                    <!-- end contentType === text -->
                    <!-- end edit-mode -->
                </li>
                <li v-if="!items.length && contentType === 'image'">
                    <!-- begin show placeholder if no image exists (and component is not edited) -->
                    <button type="button" class="button confirm" @click="onAddItem">
                        <span class="icon-plus"></span>
                        <span>Add new thumbnail-scroller-image</span>
                    </button>
                    <!-- end show placeholder if no image exists (and component is not edited) -->
                </li>
            </transition-group>
            <!-- end list of images to slide -->

            <!-- begin CmdSlideButton -->
            <CmdSlideButton
                v-if="showSlidebuttons"
                @click.prevent="showNextItem"
                :slideButtons="cmdSlideButtons.next"
            />
            <!-- end CmdSlideButton -->
        </div>
    </div>
</template>

<script>
// import functions
import {createUuid} from "../utils/common"
import {openFancyBox} from './CmdFancyBox.vue'

// import mixins
import I18n from "../mixins/I18n"
import DefaultMessageProperties from "../mixins/CmdThumbnailScroller/DefaultMessageProperties"
import EditMode from "../mixins/EditMode.vue"
import {buildComponentPath} from "../utils/editmode.js"

export default {
    name: "CmdThumbnailScroller",
    emits: ["click"],
    mixins: [
        I18n,
        DefaultMessageProperties,
        EditMode
    ],
    data() {
        return {
            items: [],
            showSlidebuttons: true
        }
    },
    props: {
        orientation: {
            type: String,
            default: "horizontal"
        },
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
         * activate if large icons should be displayed above link text
         *
         * @affectsStyling: true
         */
        largeIcons: {
            type: Boolean,
            default: false
        },
        /**
         * set content-type
         *
         * @allowedValues: "image", "text"
         */
        contentType: {
            type: String,
            default: "image"
        },
        /**
         * set type to define what will be executed on click on a thumbnail-scroller-item
         *
         * @allowedValues: "fancybox", "url", "emit"
         */
        executeOnClick: {
            type: String,
            default: "fancybox"
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
        activeItemIndex: {
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
         * activate if the thumbnail-scroller should be used as gallery-scroller stuck at the bottom of the page
         */
        useGalleryScroller: {
            type: Boolean,
            default: false
        },
        /**
         * properties for CmdHeadline-component
         */
        cmdHeadline: {
            type: Object,
            required: false
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
    mounted() {
        const thumbnailScrollerWrapper = this.$refs["thumbnail-scroller"]
        const innerListWrapper = thumbnailScrollerWrapper.querySelector("ul")

        // watch container-size / -overflow on resize
        const resizeObserver = new ResizeObserver(() => this.toggleSlideButtons(innerListWrapper))
        resizeObserver.observe(thumbnailScrollerWrapper)
    },
    computed: {
        tooltip() {
            if (this.contentType === "image") {
                return this.getMessage("cmdthumbnailscroller.tooltip.open_large_image")
            }
            if (this.executeOnClick === "url") {
                return this.getMessage("cmdthumbnailscroller.tooltip.open_url")
            }
            return this.getMessage("cmdthumbnailscroller.tooltip.open")
        },
        fullWidthClass() {
            if (this.orientation === "horizontal") {
                return "full-width"
            }
            return null
        }
    },
    methods: {
        itemProvider() {
            return {
                "image": {
                    "id": createUuid(),
                    "src": "/media/images/demo-images/small/landscape-01.jpg",
                    "srcImageLarge": "/media/images/demo-images/large/landscape-01.jpg",
                    "alt": "Alternative Text",
                    "tooltip": "Tooltip 1"
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
                buildComponentPath(this, 'props', 'thumbnailScrollerItems', -1),
                this.itemProvider)
        },
        imageStructure() {
            return {
                itemProviderOverwrite: () => ({
                    "image": {
                        "id": createUuid(),
                        "src": "/media/images/demo-images/small/landscape-01.jpg",
                        "srcImageLarge": "/media/images/demo-images/large/landscape-01.jpg",
                        "tooltip": "Tooltip DE"
                    }
                })
            }
        },
        toggleSlideButtons(innerListWrapper) {
            this.showSlidebuttons = innerListWrapper.scrollWidth > innerListWrapper.clientWidth
        },
        showNextItem() {
            const item = this.items.shift(); // remove first element of array
            if (item) {
                this.items.push(item);
            }
        },
        showPrevItem() {
            const item = this.items.pop(); // remove last element of array
            if (item) {
                this.items.unshift(item);
            }
        },
        showFancyBox(index) {
            if (this.allowOpenFancyBox) {
                openFancyBox({fancyBoxGallery: this.items, defaultGalleryIndex: index})
            }
            this.emitCurrentItemId(index)
        },
        emitCurrentItemId(index) {
            // emit id of current/clicked item
            if (this.contentType === "image") {
                this.$emit("click", this.items[index].image.id)
                return
            }
            this.$emit("click", this.items[index].id)
        },
        executeLink(index, event) {
            if (this.executeOnClick === "emit") {
                event.preventDefault()
                // emit id of current/clicked item
                this.emitCurrentItemId(index)
            } else if (this.executeOnClick === "fancybox") {
                event.preventDefault()
                // show content in fancybox
                this.showFancyBox(index)
            }
        }
    },
    watch: {
        thumbnailScrollerItems: {
            handler() {
                // change keys for images to fit CmdImage-properties
                this.items = this.thumbnailScrollerItems.map((item) => {
                    let newItem
                    if (this.contentType === "image") {
                        newItem = {image: {...item.image}, figcaption: {...item.figcaption}}

                        if (newItem.image.srcImageSmall) {
                            newItem.image.src = newItem.image.srcImageSmall
                        }
                    } else {
                        newItem = {...item}
                    }
                    return newItem
                })
            },
            immediate: true,
            deep: true
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-thumbnail-scroller ------------------------------------------------------------------------------------------ */
@import '../assets/styles/variables';

.cmd-thumbnail-scroller {
  display: inline-flex; /* do not set to table to avoid overflow is not hidden on small devices */
    flex-direction: column;
    gap: var(--default-gap);
  width: 100%;

    &.full-width:not(.vertical) {
    display: flex; /* allows flex-items to stretch equally over full space */

      > div {
          width: 100%;
      }
  }

  > .inner-thumbnail-wrapper {
      border-radius: var(--border-radius);
        padding: calc(var(--default-padding) * 2);
        padding-top: 0;
      margin: 0 auto;
      border: var(--default-border);
      background: var(--color-scheme-background-color);
      overflow: hidden;

      > ul {
          overflow: hidden;
          margin: 0;
          display: flex;
          gap: var(--grid-gap);
          justify-content: space-between;
          width: 100%; /* stretch flex-container */

          > li {
              align-self: center;
              list-style-type: none;
              margin: 0;
                margin-top: 2rem;

              a {
                  text-align: center;
              }

              img {
                  border-radius: var(--border-radius);
                    min-width: 15rem;
                  max-height: 10rem;
              }

              &.active {
                  a {
                      figcaption {
                          opacity: 1;
                      }
                  }
              }

                .image-wrapper {
                    min-width: 11.1rem; // assure to be as wide as action-buttons in edit-mode
                }
          }
      }
  }

  &.vertical {
        width: auto;

        .inner-thumbnail-wrapper {
    display: inline-flex;
    left: 50%;
    height: 75rem; /* remove later !!! */
    transform: translateX(-50%);

    > ul {
      width: auto;
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
    }

  &.gallery-scroller {
    max-width: var(--max-width);
    left: 0;
    right: 0;
    position: fixed;
    bottom: var(--default-margin);
    margin: auto;
    display: table;

    li {
      a {
        color: var(--color-scheme-text-color);
        text-decoration: none;
      }

      &.active {
        img {
          border-color: var(--primary-color);
        }

        figcaption {
          color: var(--primary-color);
        }
      }

      &:not(.active) {
        img {
          border: var(--default-border);
          opacity: var(--reduced-opacity);
        }

        figcaption {
          text-decoration: none;
        }

        a {
          &:hover, &:active, &:focus {
            figcaption {
              color: var(--primary-color);
            }

            img {
              border-color: var(--primary-color);
              opacity: 1;
            }
          }
        }
      }
    }
  }

  &.large-icons {
    li a {
      display: flex;
      flex-direction: column;
      gap: calc(var(--default-gap) / 4);
      text-decoration: none;
      align-items: center;
      justify-content: center;

      span {
        margin: 0;
      }

      [class*="icon-"] {
        font-size: 5rem;
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

    & > ul > li img {
      max-height: 7rem;
    }

    &.gallery-scroller {
      max-width: calc(100% - calc(var(--default-margin) * 3));
      display: flex;
    }
  }
}

@container (width <= #{$small-max-width}) {
  .cmd-thumbnail-scroller {
    display: block;
  }
}

/* end cmd-thumbnail-scroller ------------------------------------------------------------------------------------------ */
</style>
