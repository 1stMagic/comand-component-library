<template>
  <div id="site-header" :class="{ sticky: sticky }" role="banner">
    <slot name="top-header"></slot>
    <header :class="useGrid ? 'grid-container-create-columns': 'flex-container'">
      <slot name="logo"></slot>
      <slot name="header"></slot>
    </header>
    <CmdMainNavigation :navigationEntries="mainNavigationEntries" v-if="mainNavigationEntries" :closeOffcanvas="closeOffcanvas" />
  </div>
</template>

<script>
import CmdMainNavigation from "./CmdMainNavigation"

export default {
  name: "CmdSiteHeader",
  components: {
    CmdMainNavigation
  },
  props: {
    showHeaderNavBar: {
      type: Boolean,
      default: true
    },
    mainNavigationEntries: {
      type: Array,
      required: true
    },
    headerWidthLimitation: {
      type: Boolean,
      default: false
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
    },
    useGrid: {
      type: Boolean,
      default: true
    },
    closeOffcanvas: {
        type: Object,
        default () {
            return {
               iconClass: "icon-cancel"
            }
        }
    }
  }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';

#site-header {
  display: flex;
  flex-direction: column;
  gap: var(--default-gap);

  &.sticky {
    position: sticky;
    z-index: 300;
  }

  header {
    &.flex-container {
      width: 100%;

      .cmd-logo {
        flex: none;
      }
    }

    nav {
      padding: 0;
    }

    #main-navigation,
    nav ul li,
    #navigation-wrapper {
      background: none;
    }

    #navigation-wrapper {
      align-self: center;
    }

    .cmd-logo {
      grid-column: span var(--grid-small-span);
    }
  }

  #header-navbar {
    margin-left: auto;
  }

  &.top-header-navigation {
    header {
      padding-top: 0;
    }
  }
}
</style>
