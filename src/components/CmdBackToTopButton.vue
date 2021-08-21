<template>
  <!-- begin cmd-back-to-top-button -->
  <transition name="fade">
    <a :class="iconBackToTop.iconClass" class="cmd-back-to-top-button" href="#" :title="iconBackToTop.tooltip" @click.prevent="onBackToTop"
       v-if="show"></a>
  </transition>
  <!-- end cmd-back-to-top-button -->
</template>

<script>
export default {
  name: "CmdBackToTopButton",
  data() {
    return {
      windowInnerHeight: window.innerHeight,
      windowScrollY: window.scrollY,
      bodyScrollHeight: document.body.scrollHeight
    }
  },
  props: {
    iconBackToTop: {
      type: Object,
      default: function() {
          return {
              iconClass: "icon-single-arrow-up",
              tooltip: "Back to top"
          }
      }
    }
  },
  created() {
    window.addEventListener('resize', this.onViewportChange);
    window.addEventListener('scroll', this.onViewportChange);
  },
  unmounted() {
    window.removeEventListener('resize', this.onViewportChange);
    window.removeEventListener('scroll', this.onViewportChange);
  },
  /* watch for changes */
  computed: {
    show() {
      return this.windowScrollY > 0 && this.windowInnerHeight < this.bodyScrollHeight;
    }
  },
  methods: {
    onViewportChange() {
      this.windowInnerHeight = window.innerHeight;
      this.windowScrollY = window.scrollY;
      this.bodyScrollHeight = document.body.scrollHeight;
    },
    onBackToTop() {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
  }
}
</script>

<style lang="scss">
/* begin cmd-back-to-top-button ---------------------------------------------------------------------------------------- */
.cmd-back-to-top-button {
  padding: var(--default-padding);
  display: inline-block;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  text-decoration: none;
  z-index: 1000;
  border: var(--default-border);
  background: var(--pure-white);
  border-radius: var(--full-circle);

  &:hover, &:active, &:focus {
    border-color: var(--primary-color);
    transition: var(--default-transition);
  }
}
/* cmd-back-to-top-button ------------------------------------------------------------------------------------------ */
</style>