<template>
    <div :class="['cmd-share-buttons',{'stretch': stretchButtons}]">
        <a class="button" v-for="(shareButton, index) in shareButtons" :key="index" :id="shareButton.id" :href="shareButton.path" :title="shareButton.tooltip">
            <span v-if="shareButton.iconClass" :class="shareButton.iconClass"></span>
            <span v-if="shareButton.linkName">{{ shareButton.linkName }}</span>
        </a>
    </div>
</template>

<script>
    export default {
        name: "CmdContentFooter",
        props: {
            stretchButtons: {
                type: Boolean,
                default: true
            },
            shareButtons: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="scss">
@import '../assets/styles/variables';
/* begin cmd-share-buttons --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-share-buttons {
    display: flex;
    margin: calc(var(--default-margin) * 2) 0 0 0;

    .button {
        padding: calc(var(--default-padding) / 2) var(--default-padding);
        margin-left: var(--default-margin);

        &:first-of-type {
            margin: 0;
        }
    }

    &.stretch {
        .button {
            flex: 1;
        }
    }

    a:last-of-type {
        margin-right: 0;
    }
}

@media only screen and (max-width: $small-max-width)  {
    .cmd-share-buttons {
        justify-content: center;

        .button {
            flex: none;
            width: auto !important;

            span[class*="icon"] {
                & + span {
                    display: none;
                }
            }
        }
    }
}
/* end cmd-share-buttons --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>