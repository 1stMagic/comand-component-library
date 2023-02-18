<template>
    <div class="cmd-imagezoom grid-container-create-columns">
        <div class="grid-small-item">
            <!-- begin small image -->
            <a href="#" class="thumbnails-imagezoom">
                <!-- begin CmdImage -->
                <CmdImage
                    :image="imageSmall.image"
                    :figcaption="imageSmall.figcaption"
                    @mouseover="onMouseOver"
                    @mousemove="onMouseMove"
                    @mouseout="onMouseOut"
                />
                <!-- end CmdImage -->
            </a>
            <!-- end small image -->
        </div>

        <!-- begin large image -->
        <div v-if="showLargeImage" class="zoom-container grid-large-item">
            <!-- begin CmdImage -->
            <CmdImage
                :image="imageLarge.image"
                :figcaption="imageLarge.figcaption"
                @mouseover="onMouseOver"
                @mousemove="onMouseMove"
                @mouseout="onMouseOut"
            />
            <!-- end CmdImage -->
        </div>
        <div v-if="showLargeImage" class="zoom-overlay"></div>
        <!-- end large image -->
    </div>
</template>

<script>
// import components
import CmdImage from "./CmdImage"

export default {
    name: "CmdImageZoom",
    components: {
        CmdImage
    },
    props: {
        /**
         * object for small image
         */
        imageSmall: {
            type: Object,
            required: true
        },
        /**
         * object for large image
         */
        imageLarge: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showLargeImage: false
        }
    },
    methods: {
        onMouseOver(e) {
            this.showLargeImage = true
            this.$nextTick(() => {
                const zoomContainerHeight = window.innerHeight - this.$el.getBoundingClientRect().y - 10
                const zoomContainer = this.$el.querySelector('.zoom-container')
                zoomContainer.style.height = `${zoomContainerHeight}px`
                positionOverlay(this, e)
            })
        },
        onMouseMove(e) {
            positionOverlay(this, e)
        },
        onMouseOut() {
            this.showLargeImage = false
        }
    }
}

function positionOverlay(vm, e) {
    const largeImageContainer = vm.$el.querySelector('.zoom-container')
    const largeImage = largeImageContainer.querySelector('img')
    const zoomOverlay = vm.$el.querySelector('.zoom-overlay')

    const smallImageWidth = e.target.getBoundingClientRect().width
    const smallImageHeight = e.target.getBoundingClientRect().height

    const largeImageWidth = largeImage.getBoundingClientRect().width
    const largeImageHeight = largeImage.getBoundingClientRect().height

    const mouseX = e.pageX - e.target.getBoundingClientRect().x - window.pageXOffset
    const mouseY = e.pageY - e.target.getBoundingClientRect().y - window.pageYOffset

    const overlayWidth = Math.min(smallImageWidth, largeImageContainer.getBoundingClientRect().width / largeImageWidth * smallImageWidth)
    const overlayHeight = Math.min(smallImageHeight, largeImageContainer.getBoundingClientRect().height / largeImageHeight * smallImageHeight)

    const overlayX = clamp(mouseX - overlayWidth / 2, 0, smallImageWidth - overlayWidth)
    const overlayY = clamp(mouseY - overlayHeight / 2, 0, smallImageHeight - overlayHeight)

    const largeImageMarginLeft = -(overlayX * (largeImageWidth / smallImageWidth))
    const largeImageMarginTop = -(overlayY * (largeImageHeight / smallImageHeight))

    zoomOverlay.style.left = `${overlayX}px`
    zoomOverlay.style.top = `${overlayY}px`
    zoomOverlay.style.width = `${overlayWidth}px`
    zoomOverlay.style.height = `${overlayHeight}px`
    zoomOverlay.style.display = 'block'

    largeImage.style.marginLeft = `${largeImageMarginLeft}px`
    largeImage.style.marginTop = `${largeImageMarginTop}px`
}

function clamp(value, min, max) {
    if (value < min) {
        return min
    }
    if (value > max) {
        return max
    }
    return value
}
</script>

<style lang="scss">
/* begin cmd-imagezoom ---------------------------------------------------------------------------------------- */
.cmd-imagezoom {
    overflow: hidden;

    .zoom-container {
        display: block !important;
        overflow: hidden;
        max-width: 100rem;
        max-height: 50rem !important;

        > img {
            max-width: none;
        }
    }

    .zoom-overlay {
        position: absolute;
        display: none;
        pointer-events: none;
        background: var(--primary-color);
        opacity: var(--reduced-opacity);
    }
}

/* end cmd-imagezoom ------------------------------------------------------------------------------------------ */
</style>