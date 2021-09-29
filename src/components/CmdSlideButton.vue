<template>
    <a href="#"
       @click.prevent
       :class="['cmd-slide-button', 'button', slideButtons.next ? 'next' : 'previous']"
       :title="slideButtons.next ? slideButtons.next.tooltip : slideButtons.prev.tooltip">
        <span
            :class="slideButtons.next ? slideButtons.next.iconClass : slideButtons.prev.iconClass"></span>
    </a>
</template>

<script>
export default {
    name: "CmdSlideButton",
    props: {
        /**
         * set slide-button to "next" (= right), else it will be displayed as previous (=left) button
         */
        slideButtons: {
            type: Object,
            default: function() {
                return {
                    prev: {
                        iconClass: "icon-single-arrow-left",
                        tooltip: "Previous"
                    },
                    next: {
                        iconClass: "icon-single-arrow-right",
                        tooltip: "Next"
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-slide-button ---------------------------------------------------------------------------------------- */
.cmd-slide-button {
    &.button {
        font-size: 2rem;
        z-index: 10;
        width: 5rem;
        height: 100%;
        position: absolute;
        display: -webkit-flex; /* Safari 6-8 */
        display: flex;
        justify-content: center;
        text-decoration: none;
        background: var(--default-background-color-reduced-opacity);
        border: 0;

        span {
            align-self: center;
            color: var(--primary-color-reduced-opacity);
        }

        &:hover, &:active, &:focus {
            background: var(--pure-white);
            transition: var(--default-transition);

            span {
                color: var(--primary-color);
            }
        }

        &.previous {
            left: 0;
            top: 0;
        }

        &.next {
            right: 0;
            top: 0;
        }
    }
}

/* end cmd-slide-button ------------------------------------------------------------------------------------------ */
</style>