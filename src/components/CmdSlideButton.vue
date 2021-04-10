<template>
    <a href="#"
       @click.prevent
       :class="slideButtonType.buttonType === 'next' ? 'slide-button-next' : 'slide-button-previous'"
       :title="slideButtonType.buttonType === 'next' ? slideButtonType.tooltip : slideButtonType.tooltip">
        <span :class="slideButtonType.buttonType === 'next' ? slideButtonType.iconClass : slideButtonType.iconClass"></span>
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
/* begin cmd-slide-button --------------------------------------------------------------------------------------------------------------------------------------------------- */
[class*="slide-button-"] {
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
}

.slide-button-previous {
    left: 0;
    top: 0;
}

.slide-button-next {
    right: 0;
    top: 0;
}
/* end cmd-slide-button --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>