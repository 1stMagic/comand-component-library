<template>
    <div :class="['cmd-social-networks', {'stretch': stretchButtons, 'align-right': align === 'right'}]">
        <!-- begin CmdHeadline -->
        <CmdHeadline v-if="cmdHeadline" v-bind="cmdHeadline" />
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
        <ul :class="['button-wrapper no-flex', {'no-gap': !useGap}]">
            <li v-for="network in validNetworks">
                <a
                   :key="network.path"
                   :class="['button', {disabled: userMustAcceptDataPrivacy && !dataPrivacyAccepted}, {'text-align-left': textAlign === 'left'}]"
                   :id="network.id"
                   :href="getUrl(network)"
                   @click="preventOnDisabled"
                   target="_blank"
                   :title="tooltip(network.tooltip)">
                        <!-- begin CmdIcon -->
                        <CmdIcon
                            v-if="network.iconClass"
                             :iconClass="network.iconClass"
                             :type="network.iconType"
                        />
                        <!-- end CmdIcon -->
                        <span v-if="network.linkText">{{ network.linkText }}</span>
                </a>
            </li>
        </ul>
        <!-- end list of networks -->
    </div>
</template>

<script>
export default {
    name: "CmdSocialNetworks",
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
         * text-alignment for buttons
         */
        textAlign: {
            type: String,
            default: "right"
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
        }
    },
    methods: {
        getUrl(network) {
            if(this.userMustAcceptDataPrivacy && this.dataPrivacyAccepted) {
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
        preventOnDisabled(event) {
            let clickedElement = event.target

            if(clickedElement.tagName !== "A") {
                // get surrounding <a> if inner <span> is clicked
                clickedElement = clickedElement.closest("a")
            }

            // href must be set due to html-validity, so click must be prevented if href contains "#" only (equals button is styled as disabled)
            if(clickedElement.getAttribute("href") === "#") {
                event.preventDefault()
            }
        },
        tooltip(tooltip) {
            if(this.userMustAcceptDataPrivacy) {
                if(this.dataPrivacyAccepted) {
                    return tooltip
                }
                return this.tooltipAcceptDataPrivacy
            }
            return tooltip
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-social-networks -------------------------------------------------------------------------------------------- */
@import '../assets/styles/variables';

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

          &.text-align-left {
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

    &.stretch {
        .button {
            flex: 1;
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