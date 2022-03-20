<template>
    <transition name="fade">
        <div class="cmd-cookie-disclaimer flex-container vertical">
            <!-- begin CmdCustomHeadline -->
            <CmdCustomHeadline
                v-if="cmdCustomHeadline"
                v-bind="cmdCustomHeadline"
            />
            <!-- end CmdCustomHeadline -->

            <!-- begin slot for cookie-options -->
            <slot name="cookie-options">
                <div v-if="cookieOptions.required">
                    <h3>{{ cookieOptions.required.headline }}</h3>

                    <!-- begin CmdAccordion -->
                    <CmdAccordion :accordion-data="cookieOptions.required.cookies.length" :accordionData="2">
                        <template v-for="(cookie, index) in cookieOptions.required.cookies"
                                  v-slot:[`accordionHeadline${index}`]
                                  :key="index">
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
                        <template v-for="(cookie, index) in cookieOptions.required.cookies"
                                  v-slot:[`accordionContent${index}`]
                                  :key="index">
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
                    </CmdAccordion>
                    <!-- end CmdAccordion -->
                </div>
                <hr />
                <div v-if="cookieOptions.optional">
                    <h3>{{ cookieOptions.optional.headline }}</h3>
                    <!-- begin CmdAccordion -->
                    <CmdAccordion :accordion-data="cookieOptions.optional.cookies.length" :accordionData="2">
                        <template v-for="(cookie, index) in cookieOptions.optional.cookies"
                                  v-slot:[`accordionHeadline${index}`]
                                  :key="index">
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
                        <template v-for="(cookie, index) in cookieOptions.optional.cookies"
                                  v-slot:[`accordionContent${index}`]
                                  :key="index">
                            <p>{{ cookie.description }}</p>
                            <p v-if="cookie.linkDataPrivacy">
                                {{ cookie.linkDataPrivacy.label }}
                                <a @click="openDataPrivacy" :href="cookie.linkDataPrivacy.link"
                                   :target="cookie.linkDataPrivacy.target">{{ cookie.linkDataPrivacy.linkText }}</a>
                            </p>
                            <div v-if="dataPrivacyContent" v-html="dataPrivacyContent"></div>
                        </template>
                    </CmdAccordion>
                    <!-- end CmdAccordion -->
                </div>
            </slot>
            <!-- end slot for cookie-options -->

            <!-- begin slot for privacy-text -->
            <slot name="privacy-text"></slot>
            <!-- end slot for privacy-text -->

            <!-- begin button-wrapper for 'accept'-buttons -->
            <div class="button-wrapper align-center">
                <button  v-if="buttonLabelAcceptCurrentSettings" type="button" @click="acceptCookies('currentSettings')">
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
import CmdAccordion from "./CmdAccordion"
import CmdCustomHeadline from "./CmdCustomHeadline"
import CmdSwitchButton from "./CmdSwitchButton"

export default {
    name: "CmdCookieDisclaimer",
    components: {
        CmdAccordion,
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
         * properties for CmdCustomHeadline-component
         */
        cmdCustomHeadline: {
            type: Object,
            required: false
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

    .cmd-accordion {
        .accordion-headline {
            &:hover, &:active, &:focus {
                label, .label {
                    span {
                        color: var(--pure-white) !important;
                    }
                }
            }
        }

        .toggle-switch {
            display: flex;
        }
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