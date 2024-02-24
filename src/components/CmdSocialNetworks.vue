<template>
    <div :class="['cmd-social-networks', {'stretch': stretchButtons}, alignment]">
        <!-- begin CmdHeadline -->
        <CmdHeadline
            v-if="cmdHeadline?.headlineText || editModeContext?.editing"
            v-bind="cmdHeadline || {}"
        />
        <!-- end CmdHeadline -->

        <!-- begin CmdFormElement -->
        <CmdFormElement
            v-if="userMustAcceptDataPrivacy"
            element="input"
            type="checkbox"
            :toggle-switch="cmdFormElement.toggleSwitch"
            :labelText="cmdFormElement.labelText"
            :required="cmdFormElement.required"
            v-model="dataPrivacyAccepted"
        />
        <!-- end CmdFormElement -->

        <!-- begin list of networks -->
        <ul v-if="validNetworks.length > 0" :class="['button-wrapper', {'no-gap': !useGap}]">
            <CmdSocialNetworksItem
                v-if="!editModeContext"
                v-for="(entry, index) in validNetworks"
                :key="index"
                :network="entry"
                    />

            <!-- begin edit-mode -->
            <EditComponentWrapper
                v-else
                v-for="(entry, index) in validNetworks"
                :key="'x' + index"
                class="edit-items"
                componentName="CmdSocialNetworksItem"
                :componentProps="entry"
                :componentPath="['props', 'networks', index]"
                :showComponentName="false"
            >
                <CmdSocialNetworksItem
                    :network="entry"
                    :userMustAcceptDataPrivacy="userMustAcceptDataPrivacy"
                    :buttonTextAlign="buttonTextAlign"
                    :dataPrivacyAccepted="dataPrivacyAccepted"
                />
            </EditComponentWrapper>
            <!-- end edit-mode -->
        </ul>

        <button v-else class="button small" title="Add new item" @click="onAddItem">
            <span class="icon-plus"></span>
        </button>
        <!-- end list of networks -->
    </div>
</template>

<script>
import {buildComponentPath} from "../utils/editmode.js"
import EditMode from "../mixins/EditMode.vue"

export default {
    name: "CmdSocialNetworks",
    mixins: [EditMode],
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
         * @allowedValues: left, center, right
         */
        align: {
            type: String,
            default: "left"
        },
        /**
         * activate if gap between buttons should appear
         */
        useGap: {
            type: Boolean,
            default: true
        },
        /**
         * stretch-buttons to share horizontal space vertically
         */
        stretchButtons: {
            type: Boolean,
            default: false
        },
        /**
         * list of networks (i.e. facebook, twitter etc.)
         */
        networks: {
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
         * alignment for buttons
         *
         * @allowedValues: "left", "right"
         */
        buttonTextAlign: {
            type: String,
            default: "left"
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
        },
        /**
         * properties for CmdHeadline-component
         */
        cmdHeadline: {
            type: Object,
            required: false
        }
    },
    computed: {
        validNetworks() {
            return this.networks.filter(item => item.path)
        },
        alignment() {
            return "align-" + this.align
        }
    },
    methods: {
        getUrl(network) {
            if (this.userMustAcceptDataPrivacy && this.dataPrivacyAccepted) {
                // if path is not given completely by json-data
                if (this.appendPage) {
                    // if page to share is given by property
                    if (this.page) {
                        return network.path + encodeURIComponent(this.page)
                    }

                    // if current page should be append to url
                    return network.path + encodeURIComponent(location.href)
                }

                // if path is given completely by json-data
                return network.path
            }
            return "#"
        },
        onAddItem() {
            this.editModeContext.content.addContent(
                buildComponentPath(this, 'props', 'networks', -1),
                this.itemProvider)
        },
        itemProvider() {
            return                 {
                "id": "social-network-facebook",
                "path": "https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fdevelopment.comand-cms.com%2Fmodule%2Fteam.html",
                "tooltip": "Share this page on facebook",
                "iconClass": "icon-facebook",
                "linkText": "Share"
            }
        },
        preventOnDisabled(event) {
            let clickedElement = event.target

            if (clickedElement.tagName !== "A") {
                // get surrounding <a> if inner <span> is clicked
                clickedElement = clickedElement.closest("a")
            }

            // href must be set due to html-validity, so click must be prevented if href contains "#" only (equals button is styled as disabled)
            if (clickedElement.getAttribute("href") === "#") {
                event.preventDefault()
            }
        },
        tooltip(tooltip) {
            if (this.userMustAcceptDataPrivacy) {
                if (this.dataPrivacyAccepted) {
                    return tooltip
                }
                return this.tooltipAcceptDataPrivacy
            }
            return tooltip
        },
        onPersist(data) {
            return {
                editModeContextData: {
                    ...(this.editModeContextData || {})
                },
                update(props) {
                    props.cmdHeadline = {
                        ...(props.cmdHeadline || {}),
                    }
                    if (Array.isArray(data) && data.length > 0) {
                        props.cmdHeadline.headlineText = data[0].headlineText
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-social-networks -------------------------------------------------------------------------------------------- */
@import "../assets/styles/variables";

.cmd-social-networks {
    display: flex;
    flex-direction: column;
    gap: var(--default-gap);
    container-type: inline-size;

    .cmd-headline {
        margin: 0;
    }

    .button-wrapper {
        flex-direction: row;
        flex: none;
        margin: 0;
        gap: calc(var(--default-gap) / 2);

        .button {
            padding: calc(var(--default-padding) / 2) var(--default-padding);
            gap: calc(var(--default-gap) / 2);
            outline: 0;

            span {
                margin: 0;
            }

            &:first-of-type {
                margin: 0;
            }

          &.text-align-right {
                flex-direction: row-reverse;
            }
        }

        &.no-gap {
            li {
                .button {
                    border-radius: 0;
                }

                &:first-of-type {
                    .button {
                        border-top-left-radius: var(--border-radius);
                        border-bottom-left-radius: var(--border-radius);
                    }
                }

                &:last-of-type {
                    .button {
                        border-top-right-radius: var(--border-radius);
                        border-bottom-right-radius: var(--border-radius);
                    }
                }
            }
        }
    }

    li {
        list-style-type: none;
        margin: 0;
    }

    &.align-right {
        .share-button-wrapper {
            justify-content: flex-end;
        }
    }

    &.align-center {
        .cmd-headline > * {
            text-align: center;
        }

        .toggle-switch {
            margin: auto;
        }

        .share-button-wrapper {
            justify-content: center;
        }
    }

    &.align-right {
        .cmd-headline > * {
            text-align: right;
        }

        .toggle-switch {
            margin-left: auto;
        }

        .button-wrapper {
            justify-content: flex-end;
        }
    }

    &.stretch {
        .button-wrapper {
            li {
                flex: 1;

        .button {
                display: flex;
            }
            }
        }
    }

    a:last-of-type {
        margin-right: 0;
    }

    [id^="social-network"] {
        background: var(--social-network-color);
        border-color: var(--social-network-color);

        > span {
            color: var(--pure-white);
        }

        &:hover, &:active, &:focus {
            color: var(--pure-white);

            > span {
                color: var(--social-network-color);
            }
        }
    }

    #social-network-facebook {
        --social-network-color: #3c5a99;
    }

    #social-network-twitter {
        --social-network-color: #6bacde;
    }

    #social-network-xing {
        --social-network-color: #007575;
    }

    #social-network-linkedin {
        --social-network-color: #0077b5;
    }
}

@container (max-width: #{$small-max-width}) {
    .button-wrapper {
        .button {
            flex: none;
            width: auto !important;

            [class*="icon-"] {
                & + span {
                    display: none;
                }
            }
        }
    }
}

/* end cmd-social-networks ------------------------------------------------------------------------------------------ */
</style>