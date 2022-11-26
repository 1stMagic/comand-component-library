<template>
    <!-- begin cmd-back-to-top-button -->
    <transition name="fade">
        <a v-if="show" class="cmd-back-to-top-button" href="#" :title="iconBackToTop.tooltip" @click.prevent="onBackToTop">
            <!-- begin CmdIcon -->
            <CmdIcon :iconClass="iconBackToTop.iconClass" />
            <!-- end CmdIcon -->
        </a>
    </transition>
    <!-- end cmd-back-to-top-button -->
</template>

<script>
// import components
import CmdIcon from "./CmdIcon"

export default {
    name: "CmdBackToTopButton",
    components: {
        CmdIcon
    },
    data() {
        return {
            windowInnerHeight: window.innerHeight,
            windowScrollY: window.scrollY,
            bodyScrollHeight: document.body.scrollHeight
        }
    },
    props: {
        /**
         * icon-class (and shown tooltip on hover) for back to top button
         *
         * @requiredForAccessibility: partial
         */
        iconBackToTop: {
            type: Object,
            default: function () {
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
    background: var(--color-scheme-background-color);
    border-radius: var(--full-circle);

    &:hover, &:active, &:focus {
        border-color: var(--primary-color);
        transition: var(--default-transition);
    }
}

/* cmd-back-to-top-button ------------------------------------------------------------------------------------------ */
</style>