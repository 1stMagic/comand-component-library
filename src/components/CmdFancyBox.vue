<template>
    <div id="fancybox" class="popup-wrapper">
        <transition name="fade">
            <div class="popup" :class="{'image' : fancyBoxImageUrl || fancyBoxGallery }" v-if="showFancyBox">
                <div class="button-wrapper">
                    <a href="#" class="button icon-print" id="print-color" title="print in color" @click.prevent="printInGrayscale = false"></a>
                    <a href="#" class="button icon-print" id="print-grayscale" title="print in grayscale" @click.prevent="printInGrayscale = true"></a>
                    <a href="#" class="icon-cancel" title="Close" @click.prevent="close"></a>
                </div>
                <div :class="{'grayscale' : printInGrayscale}">
                    <div v-if="fancyBoxImageUrl" class="content">
                         <img :src="fancyBoxImageUrl" alt="" />
                    </div>
                    <div v-else-if="fancyBoxContent" class="content" v-html="fancyBoxContent"></div>
                    <div v-else-if="fancyBoxElements" class="content"></div>
                    <div v-else-if="fancyBoxGallery" class="content">
                        <SlideButton @click.prevent="showPrevItem" :slideButtonType="slideButtons.previous" />
                        <figure>
                            <img :src="fancyBoxGallery[index].srcImageLarge" :alt="fancyBoxGallery[index].alt" />
                            <figcaption>{{ fancyBoxGallery[index].figcaption }}</figcaption>
                        </figure>
                        <SlideButton @click.prevent="showNextItem" :slideButtonType="slideButtons.next" />
                    </div>
                    <div v-else class="content"><slot></slot></div>
                </div>
            </div>
        </transition>
        <ThumbnailScroller v-if="fancyBoxGallery" :thumbnailScrollerItems="[...fancyBoxGallery]" :allowOpenFancyBox="false" @click="showItem" :imgIndex="index" />
    </div>
</template>

<script>
import Vue from 'vue'
import ThumbnailScroller  from '@/components/CmdThumbnailScroller.vue'
import SlideButton from "@/components/CmdSlideButton.vue"

const openFancyBox = (config) => {
    const node = document.createElement('div');
    document.querySelector('body').appendChild(node);
    new FancyBox({
        el: node,
        propsData: {
            ...config,
            show: true
        }
    })
}

const FancyBox = Vue.extend({
    name: "CmdFancyBox",
    props: {
        url: {
            type: String,
            required: false
        },
        content: {
            type: String,
            required: false
        },
        elements: {
            type: Array,
            required: false
        },
        fancyBoxGallery: {
            type: Array,
            required: false
        },
        defaultGalleryIndex: {
            type: Number,
            required: false
        },
        show: {
            type: Boolean,
            default: false
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
    components: {
      SlideButton,
      ThumbnailScroller
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
        this.$_FancyBox_escapeKeyHandler = e => (e.key === 'Escape' || e.key === 'Esc') && this.close()
        document.querySelector('body').addEventListener('keyup', this.$_FancyBox_escapeKeyHandler)
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
    beforeDestroy() {
        document.querySelector('body').removeEventListener('keyup', this.$_FancyBox_escapeKeyHandler)
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
        }
    },
    watch: {
        show(value) {
            this.showFancyBox = value
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

export { openFancyBox }
export default FancyBox
</script>

<style lang="scss">
@import '../assets/styles/variables';
/* begin popup-wrapper --------------------------------------------------------------------------------------------------------------------------------------------------- */
.popup-wrapper {
    background: rgba(0, 0, 0, .8);
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 100;
    display: grid;

    .popup {
        display: -webkit-flex; /* Safari 6-8 */
        display: flex;
        flex-direction: column;
        padding: var(--default-padding);
        z-index: 200;
        width: 80%;
        max-width: 126rem;
        max-height: 80%;
        min-height: 30%;
        overflow: hidden;
        align-self: center; /* center vertically */
        justify-self: center; /* center horizontally */
        border-radius: var(--border-radius);
        overflow-y: auto;
        background: var(--pure-white);

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

            .button {
                margin-right: var(--default-margin);
            }

            a:not(.button) {
                margin-left: auto;
            }
        }

        a.icon-print {
            background: linear-gradient(135deg, #009fe3 0%,#009fe3 25%,#e6007e 25%,#e6007e 50%,#ffed00 50%,#ffed00 50%,#ffed00 75%,#000000 75%,#000000 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            border: var(--default-border);
            margin-right: var(--default-margin);
            margin-left: 0;
            text-shadow: var(--text-shadow);

            &:hover, &:active, &:focus {
                border: var(--primary-border);
                color: var(--pure-white);
            }

            &#print-grayscale {
                background: linear-gradient(135deg, #000000 0%,#000000 50%,#ffffff 50%,#ffffff 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            }
        }
    }

    .cmd-gallery-scroller {
        max-width: 128rem;
        left: 0;
        right: 0;
        position: fixed;
        bottom: 1rem;
        margin: auto;
        padding: var(--default-padding);
        background: #000;
        min-height: 12rem;
        display: table;

        li:not(.active)  {
            margin: 0;

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
            width: 90%;
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
/* end popup-wrapper --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>