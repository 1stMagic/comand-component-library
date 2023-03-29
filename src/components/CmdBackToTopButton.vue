<template>
    <!-- begin cmd-back-to-top-button -->
    <transition name="fade">
        <a v-if="show" class="cmd-back-to-top-button" href="#" :title="iconBackToTop.tooltip" @click.prevent="onBackToTop">
            <!-- begin CmdIcon -->
            <CmdIcon :iconClass="iconBackToTop.iconClass" :type="iconBackToTop.iconType" />
            <!-- end CmdIcon -->
        </a>
    </transition>
    <!-- end cmd-back-to-top-button -->
</template>

<script>

export default {
    name: "CmdBackToTopButton",
    data() {
        return {
            windowInnerHeight: window.innerHeight,
            windowScrollY: this.getScrollY(),
            scrollHeight: document.querySelector(this.scrollContainer)?.scrollHeight || 0
        }
    },
    props: {
        /**
         * define which container's scroll-behavior should be observed (can be any selector)
         */
        scrollContainer: {
            type: String,
            default: "body"
        },
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
                    tooltip: "Back to top",
                    iconType: "auto"
                }
            }
        }
    },
    mounted() {
        window.addEventListener('resize', this.onViewportChange)
        if (this.scrollContainer === "body") {
            window.addEventListener('scroll', this.onViewportChange);
        } else {
            document.querySelector(this.scrollContainer)?.addEventListener('scroll', this.onViewportChange);
        }
    },
    unmounted() {
        window.removeEventListener('resize', this.onViewportChange)
        if (this.scrollContainer === "body") {
            window.addEventListener('scroll', this.onViewportChange);
        } else {
            document.querySelector(this.scrollContainer)?.removeEventListener('scroll', this.onViewportChange)
        }
    },
    /* watch for changes */
    computed: {
        show() {
            return this.windowScrollY > 0 && this.windowInnerHeight < this.scrollHeight
        }
    },
    methods: {
        getScrollY() {
            if (this.scrollContainer === "body") {
                return window.scrollY
            }
            return document.querySelector(this.scrollContainer)?.scrollTop || 0
        },
        onViewportChange() {
            this.windowInnerHeight = window.innerHeight;
            this.windowScrollY = this.getScrollY()
            this.scrollHeight = document.querySelector(this.scrollContainer)?.scrollHeight || 0
        },
        onBackToTop() {
            if (this.scrollContainer === "body") {
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
            } else {
                document.querySelector(this.scrollContainer)?.scrollTo({top: 0, left: 0, behavior: 'smooth'})
            }
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
    right: 2rem;
    bottom: 2rem;
    text-decoration: none;
    z-index: 1000;
    border: var(--default-border);
    background: var(--color-scheme-background-color);
    border-radius: var(--full-circle);
    line-height: 100%;

    &:hover, &:active, &:focus {
        border-color: var(--primary-color);
        transition: var(--default-transition);
    }
}

/* cmd-back-to-top-button ------------------------------------------------------------------------------------------ */
</style>