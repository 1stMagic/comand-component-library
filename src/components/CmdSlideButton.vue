<template>
    <a href="#"
       @click.prevent
       :class="['cmd-slide-button', 'button', slideButtonType]"
       :title="getDirection.tooltip">
        <span :class="getDirection.iconClass || 'next'"></span>
    </a>
</template>

<script>
export default {
    name: "CmdSlideButton",
    props: {
        /**
         * set slide-button-type
         *
         * possible default-values: next, previous, up, down
         */
        slideButtonType: {
          type: String,
          default: "next"
        },
        /**
         * default slide-buttons
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
                    },
                    up: {
                        iconClass: "icon-single-arrow-up",
                        tooltip: "Previous"
                    },
                    down: {
                        iconClass: "icon-single-arrow-down",
                        tooltip: "Next"
                    }
                }
            }
        }
    },
    computed: {
        getDirection() {
            if(this.slideButtons[this.slideButtonType]) {
                return this.slideButtons[this.slideButtonType]
            }
            console.log("Property 'slideButtonType' does not match slideButtons-key")
            return {}
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

        &.up, &.down {
            width: 100%;
            height: auto;
            left: 0;
            top: 0;
        }

        &.down {
            bottom: 0;
            top: auto;
        }
    }
}

/* end cmd-slide-button ------------------------------------------------------------------------------------------ */
</style>