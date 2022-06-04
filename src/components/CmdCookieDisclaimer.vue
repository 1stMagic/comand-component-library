<template>
    <transition name="fade">
        <div class="cmd-cookie-disclaimer flex-container vertical">
            <!-- begin CmdCustomHeadline -->
            <CmdCustomHeadline
                v-if="cmdCustomHeadlineCookieDisclaimer?.show && cmdCustomHeadlineCookieDisclaimer?.headlineText && cmdCustomHeadlineCookieDisclaimer?.headlineLevel"
                v-bind="cmdCustomHeadlineCookieDisclaimer"
                :headlineText="cmdCustomHeadlineCookieDisclaimer.headlineText"
                :headlineLevel="cmdCustomHeadlineCookieDisclaimer.headlineLevel"
            />
            <!-- end CmdCustomHeadline -->

            <!-- begin slot for cookie-options -->
            <slot name="cookie-options">
                <div v-if="cookieOptions.required" class="flex-container vertical">
                    <CmdCustomHeadline v-if="cmdBoxRequiredCookies?.showHeadline" :headline-text="cmdBoxRequiredCookies?.headlineText" :headline-level="cmdBoxRequiredCookies?.headlineLevel "/>
                    <!-- begin CmdBox -->
                    <CmdBox v-for="(cookie, index) in cookieOptions.required.cookies"
                            :useSlots="['header', 'body']"
                            v-bind="cmdBoxRequiredCookies"
                            :key="index"
                    >
                        <template v-slot:header>
                            <!-- begin CmdSwitchButton -->
                            <CmdSwitchButton
                                type="checkbox"
                                :id="cookie.id"
                                :labelText="cookie.labelText"
                                v-model="cookie.checked"
                                :status="cookie.status"
                                disabled="disabled"
                            />
                            <!-- end CmdSwitchButton -->
                        </template>
                        <template v-slot:body>
                            <p v-if="cookie.description">{{ cookie.description }}</p>
                            <p v-if="cookie.linkDataPrivacy">
                                {{ cookie.linkDataPrivacy.label }}
                                <a @click="openDataPrivacy"
                                   :href="cookie.linkDataPrivacy.link"
                                   :target="cookie.linkDataPrivacy.target">
                                    {{ cookie.linkDataPrivacy.linkText }}
                                </a>
                            </p>
                            <div v-if="dataPrivacyContent" v-html="dataPrivacyContent"></div>
                        </template>
                    </CmdBox>
                    <!-- end CmdBox -->
                </div>
                <hr/>
                <div v-if="cookieOptions.optional" class="flex-container vertical">
                    <CmdCustomHeadline v-if="cmdBoxOptionalCookies?.showHeadline" :headline-text="cmdBoxOptionalCookies?.headlineText" :headline-level="cmdBoxOptionalCookies?.headlineLevel "/>
                    <!-- begin CmdBox -->
                    <CmdBox v-for="(cookie, index) in cookieOptions.optional.cookies"
                            :useSlots="['header', 'body']"
                            v-bind="cmdBoxOptionalCookies"
                            :key="index"
                    >
                        <template v-slot:header>
                            <!-- begin CmdSwitchButton -->
                            <CmdSwitchButton
                                type="checkbox"
                                :id="cookie.id"
                                :labelText="cookie.labelText"
                                v-model="cookie.checked"
                                :status="cookie.status"
                            />
                            <!-- end CmdSwitchButton -->
                        </template>
                        <template v-slot:body>
                            <p v-if="cookie.description">{{ cookie.description }}</p>
                            <p v-if="cookie.linkDataPrivacy">
                                {{ cookie.linkDataPrivacy.label }}
                                <a @click="openDataPrivacy"
                                   :href="cookie.linkDataPrivacy.link"
                                   :target="cookie.linkDataPrivacy.target">
                                    {{ cookie.linkDataPrivacy.linkText }}
                                </a>
                            </p>
                            <div v-if="dataPrivacyContent" v-html="dataPrivacyContent"></div>
                        </template>
                    </CmdBox>
                    <!-- end CmdBox -->
                </div>
            </slot>
            <!-- end slot for cookie-options -->

            <!-- begin slot for privacy-text -->
            <slot name="privacy-text"></slot>
            <!-- end slot for privacy-text -->

            <!-- begin button-wrapper for 'accept'-buttons -->
            <div class="button-wrapper align-center">
                <button v-if="buttonLabelAcceptCurrentSettings" type="button" @click="acceptCookies('currentSettings')">
                    <span>{{ buttonLabelAcceptCurrentSettings }}</span>
                </button>
                <button v-if="buttonLabelAcceptAllCookies" type="button" class="primary" @click="acceptCookies('allCookies')">
                    <span>{{ buttonLabelAcceptAllCookies }}</span>
                </button>
            </div>
            <!-- end button-wrapper for 'accept'-buttons -->
        </div>
    </transition>
</template>

<script>
// import components
import CmdBox from "./CmdBox"
import CmdCustomHeadline from "./CmdCustomHeadline"
import CmdSwitchButton from "./CmdSwitchButton"

export default {
    name: "CmdCookieDisclaimer",
    components: {
        CmdBox,
        CmdCustomHeadline,
        CmdSwitchButton
    },
    data() {
        return {
            showCookieDisclaimer: true,
            dataPrivacyContent: ""
        }
    },
    props: {
        /**
         * properties for CmdCustomHeadline-component at top of cookie disclaimer
         */
        cmdCustomHeadlineCookieDisclaimer: {
            type: Object,
            default() {
                return {
                    show: true,
                    headlineText: "Cookie disclaimer",
                    headlineLevel: 2
                }
            }
        },
        /**
         * property for CmdBox-component surrounding the required cookies
         */
        cmdBoxRequiredCookies: {
            type: Object,
            default() {
                return {
                    collapsible: true,
                    showHeadline: true,
                    headlineText: "Required cookies",
                    headlineLevel: 3
                }
            }
        },
        /**
         * property for CmdBox-component surrounding the optional cookies
         */
        cmdBoxOptionalCookies: {
            type: Object,
            default() {
                return {
                    collapsible: true,
                    showHeadline: true,
                    headlineText: "Optional cookies",
                    headlineLevel: 3
                }
            }
        },
        /**
         * list of cookie-options
         */
        cookieOptions: {
            type: Object,
            required: false
        },
        /**
         * label for button to accepting all cookies
         */
        buttonLabelAcceptAllCookies: {
            type: String,
            default: "Accept all cookies!"
        },
        /**
         * label for button for accepting current settings
         */
        buttonLabelAcceptCurrentSettings: {
            type: String,
            default: "Proceed with current settings!"
        }
    },
    methods: {
        acceptCookies(cookies) {
            this.$emit("close-cookie-disclaimer", cookies)
        },
        openDataPrivacy(event) {
            /* first 'target' = clicked-element, second 'target' = target-attribute */
            if (!event.target.target) {
                event.preventDefault()
                fetch(event.target.href).then((response) =>
                    response.text()
                ).then((content) => { /* use arrow function to get access to dataPrivacy by 'this' = vue-instance (otherwise 'this' wouldn't be vue-instance in this fethc-method */
                    this.dataPrivacyContent = content
                })
            }
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-cookie-disclaimer ---------------------------------------------------------------------------------------- */
.cmd-cookie-disclaimer {
    width: 100%;
    padding: var(--default-padding);
    padding-right: calc(var(--default-padding) * 2);
    z-index: 100; /* bring layer above logo */
    bottom: 0;
    top: auto;

    .cmd-box {
        .box-body {
            padding: var(--default-padding);
        }
    }

    h1 {
        text-align: center;
    }

    .button {
        margin: 0 auto;
    }

    > p {
        text-align: center;
    }

    #form-cookies {
        margin-bottom: var(--default-margin);
    }

    p {
        a {
            text-decoration: underline;

            &:hover, &:active, &:focus {
                text-decoration: none;
            }
        }
    }
}

/* end cmd-cookie-disclaimer ------------------------------------------------------------------------------------------ */
</style>