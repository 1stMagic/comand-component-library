<template>
    <figure :class="['cmd-image', getTextAlign]">
        <figcaption v-if="figcaption?.show && figcaption?.position === 'top'">{{figcaption?.text}}</figcaption>
        <img :src="image.src" :alt="image.alt" :title="image.tooltip" />
        <figcaption v-if="figcaption?.show && figcaption?.position !== 'top'">{{figcaption?.text}}</figcaption>
    </figure>
</template>

<script>
export default {
    name: "CmdImage",
    props: {
        /**
         * image-object including source, alternative text, tooltip (not required)
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
    computed: {
        getTextAlign() {
            if(this.figcaption?.textAlign) {
                return "text-" + this.figcaption.textAlign
            }
            return ''
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