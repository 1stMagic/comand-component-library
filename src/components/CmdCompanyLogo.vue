<template>
  <div class="cmd-company-logo">
    <router-link v-if="link.type === 'router'" to="./" :title="link.tooltip">
      <img :src="pathCurrentLogo" :alt="altText"/>
    </router-link>
    <a v-else href="./" :title="link.tooltip">
      <img :src="pathCurrentLogo" :alt="altText" />
    </a>
  </div>
</template>

<script>
import {getRoute} from "../utilities.js"

export default {
  name: "CmdLogo",
  data() {
    return {
      prefersColorScheme: ""
    }
  },
  props: {
    link: {
      type: Object,
      required: false
    },
    pathDefaultLogo: {
      type: String,
      required: true
    },
    pathDarkmodeLogo: {
      type: String,
      required: false
    },
    altText: {
      type: String,
      required: true /* w3c requirements */
    }
  },
  computed: {
    pathCurrentLogo() {
      if (this.prefersColorScheme === 'light' || !this.pathDarkmodeLogo) {
        return this.pathDefaultLogo
      }
      return this.pathDarkmodeLogo
    }
  },
  created() {
    if (matchMedia('(prefers-color-scheme: light)').matches) {
      this.prefersColorScheme = "light"
    } else {
      this.prefersColorScheme = "dark"
    }

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
      this.prefersColorScheme = e.matches ? "light" : "dark"
    });
  },
  methods: {
    getRoute(language) {
      return getRoute(language)
    }
  }
}
</script>

<style lang="scss">
/* begin cmd-company-logo ---------------------------------------------------------------------------------------- */
@import '../assets/styles/variables';

.cmd-company-logo {
  > a {
    display: block;

    img {
      border: 0;
      max-height: 15rem;
    }

    @media only screen and (max-width: $medium-max-width) {
      img {
        max-width: 100%;
        max-height: none;
      }
    }
  }
}
/* end cmd-company-logo ------------------------------------------------------------------------------------------ */
</style>