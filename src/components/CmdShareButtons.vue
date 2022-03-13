<template>
    <div :class="['cmd-share-buttons',{'stretch': stretchButtons, 'align-right': align === 'right'}]">
        <a class="button" v-for="(shareButton, index) in shareButtons" :key="index" :id="shareButton.id"
           :href="shareButton.path" :title="shareButton.tooltip">
            <span v-if="shareButton.iconClass" :class="shareButton.iconClass"></span>
            <span v-if="shareButton.linkText">{{ shareButton.linkText }}</span>
        </a>
    </div>
</template>

<script>
export default {
    name: "CmdContentFooter",
    props: {
        /**
         * set horizontal alignment
         *
         * @allowedValues: left, right
         */
        align: {
            type: String,
            required: false
        },
        /**
         * stretch-buttons to share horizontal space vertically
         */
        stretchButtons: {
            type: Boolean,
            default: false
        },
        /**
         * list of share-buttons (i.e. facebook, twitter etc.)
         */
        shareButtons: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="scss">
@import '../assets/styles/variables';
/* begin cmd-share-buttons -------------------------------------------------------------------------------------------- */
.cmd-share-buttons {
    display: flex;
    gap: var(--default-gap);

    &.align-right {
        justify-content: flex-end;
    }

    .button {
        padding: calc(var(--default-padding) / 2) var(--default-padding);

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

    [id^="share-link"] {
        > span {
            color: var(--pure-white);
        }
    }

    #share-link-facebook {
        background: #3c5a99;
        border-color: #3c5a99;

        &:hover, &:active, &:focus {
            background: #fff;

            > span {
                color: #3c5a99;
            }
        }
    }

    #share-link-twitter {
        background: #6bacde;
        border-color: #6bacde;

        &:hover, &:active, &:focus {
            background: #fff;

            > span {
                color: #6bacde;
            }
        }
    }

    #share-link-xing {
        background: #007575;
        border-color: #007575;

        &:hover, &:active, &:focus {
            background: #fff;

            > span {
                color: #007575;
            }
        }
    }

    #share-link-linkedin {
        background: #0077b5;
        border-color: #0077b5;

        &:hover, &:active, &:focus {
            background: #fff;

            > span {
                color: #0077b5;
            }
        }
    }
}

@media only screen and (max-width: $small-max-width) {
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

/* end cmd-share-buttons ------------------------------------------------------------------------------------------ */
</style>