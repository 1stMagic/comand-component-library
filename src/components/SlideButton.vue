<template>
    <a href="#"
       @click.prevent="onClick"
       :class="slideButtonType.buttonType === 'next' ? 'slide-button-next' : 'slide-button-previous'"
       :title="slideButtonType.buttonType === 'next' ? slideButtonType.tooltip : slideButtonType.tooltip">
        <span :class="slideButtonType.buttonType === 'next' ? slideButtonType.iconClass : slideButtonType.iconClass"></span>
    </a>
</template>

<script>
export default {
    name: "SlideButton",
    props: {
        slideButtonType: {
            type: Object,
            required: true
        }
    },
    methods: {
        onClick(event) {
            this.$emit("click", event)
        }
    }
}
</script>

<style lang="scss">
/* begin slide-button --------------------------------------------------------------------------------------------------------------------------------------------------- */
[class*="slide-button-"] {
    font-size: 2rem;
    z-index: 10;
    width: 5rem;
    height: 100%;
    position: absolute;
    display: -webkit-flex; /* Safari 6-8 */
    display: flex;
    justify-content: center;
    text-decoration: none;

    span {
        align-self: center;

    }

    &:hover, &:active, &:focus {
        background: var(--default-background-color-reduced-opacity);
        transition: var(--default-transition);
    }
}

.slide-button-previous {
    left: 0;
    top: 0;
}

.slide-button-next {
    right: 0;
    top: 0;
}
/* end slide-button --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>