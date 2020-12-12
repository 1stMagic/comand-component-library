<template>
    <div class="cmd-content-footer-buttons">
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
            shareButtons: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="scss">
    /* begin cmd-content-footer --------------------------------------------------------------------------------------------------------------------------------------------------- */
    .cmd-content-footer-buttons {
        display: flex;
        padding: calc(var(--default-padding) * 2) 0 0 0;

        .button {
            padding: calc(var(--default-padding) / 2) var(--default-padding);
            margin-left: var(--default-margin);
            flex: 1;

            &:first-of-type {
                margin: 0;
            }
        }

        [id^="share-link"] {
            > span {
                color: var(--pure-white);
            }
        }

        a:last-of-type {
            margin-right: 0;
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
    /* end cmd-content-footer --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>