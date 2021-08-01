<template>
  <div class="grid-container-create-columns cmd-image-gallery">
    <a href="#" v-for="(image, index) in images" :key="index" @click.prevent="showFancyBox(index)">
      <figure>
        <img :src="image.srcImageSmall" :alt="image.alt">
        <figcaption>{{ image.figcaption }}</figcaption>
      </figure>
    </a>
  </div>
</template>

<script>
import {openFancyBox} from "../components/CmdFancyBox.vue"

export default {
  name: "CmdImageGallery",

  props: {
    images: Array
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

      &:hover, &:active, &:focus {
        img {
          border: var(--primary-border);
        }

        figcaption {
          text-decoration: none;
        }
      }
    }

    figcaption {
      padding: calc(var(--default-padding) / 2);
    }

    & + .pager {
      margin-top: calc(var(--default-margin) * 2);
    }
  }
}
/* end cmd-image-gallery ------------------------------------------------------------------------------------------ */
</style>