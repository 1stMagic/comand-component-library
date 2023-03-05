<template>
    <figure :class="['cmd-image', getTextAlign]">
        <figcaption v-if="figcaption?.show && figcaption?.position === 'top'">{{figcaption?.text}}</figcaption>
        <img :src="imageSource" :alt="image.alt" :title="image.tooltip" />
        <figcaption v-if="figcaption?.show && figcaption?.position !== 'top'">{{figcaption?.text}}</figcaption>
    </figure>
</template>

<script>
export default {
    data() {
        return {
            mediumMaxWidth: 1023,
            smallMaxWidth: 600,
            currentWindowWidth: window.innerWidth
        }
    },
    name: "CmdImage",
    props: {
        /**
         * image-object including source(s), alternative text, tooltip (not required)
         */
        image: {
            type: Object,
            required: true
        },
        /**
         * figcaption-object including visibility, position (top/bottom), text
         */
        figcaption: {
            type: Object,
            required: false
        }
    },
    created() {
        // get current window width on window-resize
        window.addEventListener("resize", this.updateWindowWidth)

        // assign css-breakpoints (as integer to eliminate px-unit) to data-properties to have access to them in vue
        const computedStyle = getComputedStyle(document.documentElement);
        this.mediumMaxWidth = parseInt(computedStyle.getPropertyValue("--medium-max-width"))
        this.smallMaxWidth = parseInt(computedStyle.getPropertyValue("--small-max-width"))
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.updateWindowWidth)
    },
    computed: {
        getTextAlign() {
            if(this.figcaption?.textAlign) {
                return "text-" + this.figcaption.textAlign
            }
            return ''
        },
        imageSource() {
            // if only one src exists
            const imgSrc = this.image.src

            if(typeof imgSrc === "string") {
                return imgSrc
            }

            const deviceWidth = this.currentWindowWidth;
            // return image for small-devices (if exists)
            if(imgSrc.small && deviceWidth <= this.smallMaxWidth) {
                return imgSrc.small
            }
            // return image for medium-devices (if exists)
            if (imgSrc.medium && deviceWidth <= this.mediumMaxWidth) {
                return imgSrc.medium
            }
            // else return large (will be used if images for small-and -medium-devices do not exist or if screen resolution is larger than mediumMaxWidth)
            return imgSrc.large
        }
    },
    methods: {
        updateWindowWidth() {
            this.currentWindowWidth = window.innerWidth
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-image ------------------------------------------------------------------------------------------ */
.cmd-image {
    &.text-center {
        figcaption {
            text-align: center;
        }
    }

    &.text-right {
        figcaption {
            text-align: right;
        }
    }
}
/* end cmd-image ------------------------------------------------------------------------------------------ */
</style>