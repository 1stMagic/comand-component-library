<template>
  <div id="site-header" :class="{ sticky: sticky }" role="banner">
    <header>
      <div class="flex-container no-flex">
        <!--MySpCompanyLogo :link="linkLogo" :logo="logo" v-if="logo" /-->
        <CmdTopHeaderNavBar
          :navigationEntries="navigationEntries"
          :languages="languages"
          v-if="showHeaderNavBar"
        />
      </div>
      <CmdMainNavigation :navigationEntries="mainNavigationEntries" />
    </header>
  </div>
</template>

<script>
import CmdMainNavigation from "./CmdMainNavigation"
import CmdTopHeaderNavBar from "./CmdTopHeaderNavBar"

export default {
  name: "CmdSiteHeader",
  components: {
    CmdMainNavigation,
    CmdTopHeaderNavBar
  },
  props: {
    showHeaderNavBar: {
      type: Boolean,
      default: true
    },
    navigationEntries: {
      type: Array,
      required: true
    },
    mainNavigationEntries: {
      type: Array,
      required: true
    },
    languages: {
      type: Array,
      required: true
    },
    linkLogo: {
      type: Object,
      required: false
    },
    logo: {
      type: Object,
      required: false
    },
    sticky: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';

#site-header {
  &.sticky {
    position: sticky;
    z-index: 300;
  }

  header {
    > div {
      margin: 0 auto;

      &:first-child {
        max-width: var(--max-width);
        padding: var(--default-padding);
      }

      nav {
        max-width: var(--max-width);
        margin: 0 auto;
      }
    }

    .company-logo {
      img {
        height: 6rem;
      }
    }
  }

  #header-navbar {
    margin-left: auto;
  }

  @media only screen and (max-width: $small-max-width) {
    .company-logo,
    #header-navbar {
      margin: 0 auto;
    }
  }
}
</style>
