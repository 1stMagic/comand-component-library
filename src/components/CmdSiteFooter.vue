<template>
  <div id="site-footer">
    <footer class="flex-container no-flex">
      <slot>
        <p v-if="copyrightText">{{ copyrightText }}</p>
        <div v-if="versionText || logo" class="flex-container version-and-logo-wrapper">
          <p v-if="versionText">{{ versionText }}</p>
          <img v-if="logo" :src="logo.src" :alt="logo.alternativeText" />
        </div>
      </slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "CmdSiteFooter",
  components: {},
  props: {
    copyrightText: {
      type: String,
      required: false
    },
    versionText: {
      type: String,
      required: false
    },
    logo: {
      type: Object,
      required: false
    }
  }
}
</script>

<style lang="scss">
@import "../assets/css/global/variables";

#site-footer {
  footer {
    max-width: var(--max-width);
    padding: var(--default-padding);
    margin: 0 auto;
    align-items: center;

    img {
      height: 6rem;
    }

    p {
      margin: 0;
    }

    .version-and-logo-wrapper {
      margin-left: auto;
      align-items: center;
    }

    @media only screen and (max-width: $small-max-width) {
      & > * {
        margin: 0 auto;
      }
    }
  }
}
</style>
