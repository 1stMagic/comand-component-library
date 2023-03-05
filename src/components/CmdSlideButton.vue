<template>
    <a href="#"
       @click.prevent
       :class="['cmd-slide-button', 'button', 'keep-behavior-on-small-devices', slideButtonType]"
       :title="getDirection.tooltip">
        <!-- being CmdIcon -->
        <CmdIcon :iconClass="getDirection.iconClass || 'next'" />
        <!-- end CmdIcon -->
    </a>
</template>

<script>
export default {
    name: "CmdSlideButton",
    props: {
        /**
         * set slide-button-type
         *
         * @allowedValues: next, prev, up, down
         * @affectsStyling: true
         */
        slideButtonType: {
          type: String,
          default: "next"
        },
        /**
         * default slide-buttons
         *
         * @requiredForAccessibility: partial
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
            console.warn("Property 'slideButtonType' does not match slideButtons-key")
            return {}
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-slide-button ---------------------------------------------------------------------------------------- */
@import '../assets/styles/variables';

.cmd-slide-button {
    &.button {
        font-size: 2rem;
        z-index: 10;
        height: 100%;
        position: absolute;
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
                color: var(--hyperlink-color-highlighted);
            }
        }

        &.prev {
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

    @media only screen and (max-width: $small-max-width) {
        &.button {
            width: auto; /* overwrite button-behavior for small-devices from frontend-framework */
        }
    }
}

/* end cmd-slide-button ------------------------------------------------------------------------------------------ */
</style>