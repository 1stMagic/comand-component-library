<template>
    <div class="grid-container-create-columns gallery_wrapper">
        <a href="#" v-for="(image, index) in images" :key="index" @click.prevent="showFancyBox(index)">
            <figure>
                <img :src="image.srcImageSmall" :alt="image.alt">
                <figcaption>{{ image.figcaption }}</figcaption>
            </figure>
        </a>
    </div>
</template>

<script>
import {openFancyBox} from '@/components/FancyBox.vue'

export default {
    props: {
        images: Array
    },

    methods: {
        showFancyBox (index) {
            openFancyBox({fancyBoxGallery: this.images, defaultGalleryIndex: index})
        }
    }
}
</script>