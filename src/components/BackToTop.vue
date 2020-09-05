<template>
    <!-- begin back_to_top_wrapper -->
    <transition name="back_to_top">
        <a id="back_to_top_wrapper" href="#anchor_back_to_top_wrapper" title="Back to top" class="icon-arrow_close" v-on:click.prevent="onBackToTop" v-if="show"></a>
    </transition>
    <!-- end back_to_top_wrapper -->
</template>

<script>
    export default {
        data() {
            return {
                windowInnerHeight: window.innerHeight,
                windowScrollY: window.scrollY,
                bodyScrollHeight: document.body.scrollHeight
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

<style scoped lang="scss">
    /* begin back_to_top --------------------------------------------------------------------------------------------------------------------------------------------------- */
    .back_to_top-enter-active, .back_to_top-leave-active,
    .back_to_top-enter, .back_to_top-leave-to {
        transition: var(--default-transition);
        opacity: 1;
    }

    .back_to_top-enter, .back_to_top-leave-to {
        opacity: 0;
    }

    a[href^="#anchor_back_to_top_wrapper"] {
        border: var(--default-border);
        background: var(--blank-color);
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
    }
    /* end back_to_top --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>
