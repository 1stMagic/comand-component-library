<template>
    <!-- begin back-to-top-wrapper -->
    <transition name="back-to-top">
        <a :class="iconClass" id="back-to-top-button" :href="href" :title="tooltip" @click.prevent="onBackToTop" v-if="show"></a>
    </transition>
    <!-- end back-to-top-wrapper -->
</template>

<script>
export default {
    name: "BackToTopButton",
    data() {
        return {
            windowInnerHeight: window.innerHeight,
            windowScrollY: window.scrollY,
            bodyScrollHeight: document.body.scrollHeight
        }
    },

    props: {
        href: {
            type: String,
            required: true
        },
        iconClass: {
            type: String,
            required: true
        },
        tooltip: {
            type: String,
            required: false
        }
    },

    created() {
        window.addEventListener('resize', this.onViewportChange);
        window.addEventListener('scroll', this.onViewportChange);
    },

    destroyed() {
        window.removeEventListener('resize', this.onViewportChange);
        window.removeEventListener('scroll', this.onViewportChange);
    },

    /* watch for changes */
    computed:  {
        show() {
            return this.windowScrollY > 0 && this.windowInnerHeight < this.bodyScrollHeight;
        }
    },

    methods: {
        onViewportChange(){
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
/* begin back-to-top-button --------------------------------------------------------------------------------------------------------------------------------------------------- */
#back-to-top-button {
    border: var(--default-border);
    background: var(--pure-white);
    padding: var(--default-padding);
    display: inline-block;
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    text-decoration: none;
    border-radius: var(--full-circle);
    z-index: 300;

    &:hover, &:active, &:focus {
        border-color: var(--primary-color);
        transition: var(--default-transition);
    }

    .back-to-top-enter-active, .back-to-top-leave-active,
    .back-to-top-enter, .back-to-top-leave-to {
        transition: var(--default-transition);
        opacity: 1;
    }

    .back-to-top-enter, .back-to-top-leave-to {
        opacity: 0;
    }
}
/* end back-to-top-button --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>