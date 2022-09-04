<template>
    <div :class="['cmd-share-buttons', {'stretch': stretchButtons, 'align-right': align === 'right'}]">
        <CmdFormElement
            v-if="userMustAcceptDataPrivacy"
            element="input"
            type="checkbox"
            :toggle-switch="cmdFormElement.toggleSwitch"
            :labelText="cmdFormElement.labelText"
            :required="cmdFormElement.required"
            v-model="dataPrivacyAccepted"
        />
        <div class="share-button-wrapper">
            <a v-for="shareButton in validShareButtons"
               :key="shareButton.path" :class="['button', {disabled: userMustAcceptDataPrivacy && !dataPrivacyAccepted}]"
               :id="shareButton.id"
               :href="getUrl(shareButton)"
               target="_blank"
               :title="tooltip(shareButton.tooltip)">
                <span v-if="shareButton.iconClass && shareButton.iconPosition !== 'right'" :class="shareButton.iconClass"></span>
                <span v-if="shareButton.linkText">{{ shareButton.linkText }}</span>
                <span v-if="shareButton.iconClass && shareButton.iconPosition === 'right'" :class="shareButton.iconClass"></span>
            </a>
        </div>
    </div>
</template>

<script>
// import components
import CmdFormElement from "./CmdFormElement"

export default {
    name: "CmdShareButtons",
    components: {
        CmdFormElement
    },
    data() {
        return {
            dataPrivacyAccepted: false
        }
    },
    props: {
        /**
         * set default v-model (must be named modelValue in Vue3)
         */
        modelValue: {
            type: [String, Number, Array],
            default: ""
        },
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
        },
        /**
         * page to share (appended to social-bookmark-url)
         *
         * appendPage-property must be activated
         */
        page: {
            type: String,
            required: false
        },
        /**
         * activate if page to share is not given by json-data
         */
        appendPage: {
            type: Boolean,
            default: true
        },
        /**
         * toggle if user has to accept that anonymous data will be send while sharing
         */
        userMustAcceptDataPrivacy: {
            type: Boolean,
            default: true
        },
        /**
         * tooltip shown on hovering disabled buttons
         *
         * userMustAcceptDataPrivacy-property must be activated
         */
        tooltipAcceptDataPrivacy: {
            type: String,
            default: "You must accept data privacy conditions!"
        },
        /**
         * properties for cmdFormElement
         *
         * userMustAcceptDataPrivacy-property must be activated
         */
        cmdFormElement: {
            type: Object,
            default() {
                return {
                    toggleSwitch: true,
                    labelText: "I accept that anonymous data will be send to the platform I share this page on!",
                    required: true
                }
            }
        }
    },
    computed: {
        validShareButtons() {
            return this.shareButtons.filter(item => item.path)
        }
    },
    methods: {
        getUrl(shareButton) {
            if(this.userMustAcceptDataPrivacy && this.dataPrivacyAccepted) {
                // if path is not given completely by json-data
                if (this.appendPage) {
                    // if page to share is given by property
                    if (this.page) {
                        return shareButton.path + encodeURIComponent(this.page)
                    }

                    // if current page should be append to url
                    return shareButton.path + encodeURIComponent(location.href)
                }

                // if path is given completely by json-data
                return shareButton.path
            }
            return null
        },
        tooltip(tooltip) {
            if(this.userMustAcceptDataPrivacy && this.dataPrivacyAccepted) {
                return tooltip
            }
            return this.tooltipAcceptDataPrivacy
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-share-buttons -------------------------------------------------------------------------------------------- */
@import '../assets/styles/variables';

.cmd-share-buttons {
    display: flex;
    flex-direction: column;
    gap: var(--default-gap);

    &.align-right {
        .share-button-wrapper {
            justify-content: flex-end;
        }
    }

    &.stretch {
        .button {
            flex: 1;
        }
    }

    .button {
        padding: calc(var(--default-padding) / 2) var(--default-padding);

        &:first-of-type {
            margin: 0;
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