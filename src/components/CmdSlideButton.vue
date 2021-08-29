<template>
    <a href="#"
       @click.prevent
       :class="['cmd-slide-button', 'button', slideButtonType.buttonType]"
       :title="slideButtonType.buttonType === 'next' ? slideButtonType.tooltip : slideButtonType.tooltip">
        <span
            :class="slideButtonType.buttonType === 'next' ? slideButtonType.iconClass : slideButtonType.iconClass"></span>
    </a>
</template>

<script>
export default {
    name: "CmdSlideButton",
    props: {
        slideButtonType: {
            type: Object,
            required: true
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