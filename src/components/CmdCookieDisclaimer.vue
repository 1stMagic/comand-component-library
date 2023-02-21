<template>
    <transition name="fade">
        <div class="cmd-cookie-disclaimer flex-container vertical">
            <!-- begin CmdHeadline -->
            <CmdHeadline
                v-if="cmdHeadlineCookieDisclaimer?.show && cmdHeadlineCookieDisclaimer?.headlineText && cmdHeadlineCookieDisclaimer?.headlineLevel"
                :headlineText="cmdHeadlineCookieDisclaimer.headlineText"
                :headlineLevel="cmdHeadlineCookieDisclaimer.headlineLevel"
            />
            <!-- end CmdHeadline -->

            <!-- begin slot for cookie-options -->
            <slot name="cookie-options">
                <!-- begin required cookies -->
                <div v-if="cookieOptions?.required" class="flex-container vertical">
                    <!-- begin CmdHeadline -->
                    <CmdHeadline
                        v-if="cmdBoxRequiredCookies?.showHeadline"
                        :headline-text="cmdBoxRequiredCookies?.headlineText"
                        :headline-level="cmdBoxRequiredCookies?.headlineLevel "
                    />
                    <!-- end CmdHeadline -->

                    <!-- begin CmdBox -->
                    <CmdBox v-for="(cookie, index) in cookieOptions.required.cookies || []"
                            :useSlots="['header', 'body']"
                            :collapsible="cmdBoxRequiredCookies?.collapsible"
                            :key="index"
                    >
                        <template v-slot:header>
                            <!-- begin CmdFormElement -->
                            <CmdFormElement
                                element="input"
                                type="checkbox"
                                v-model="acceptedCookies"
                                :inputValue="cookie.value"
                                :labelText="cookie.labelText"
                                :disabled="cookie.disabled"
                                :id="cookie.id"
                                :toggleSwitch="true"
                                :title="getMessage('cmdcookiedisclaimer.title.cookie_cannot_be_disabled')"
                            />
                            <!-- end CmdFormElement -->
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
                <!-- end required cookies -->

                <hr/>

                <!-- begin optional cookies -->
                <div v-if="cookieOptions?.optional" class="flex-container vertical">
                    <!-- begin CmdHeadline -->
                    <CmdHeadline
                        v-if="cmdBoxOptionalCookies?.showHeadline"
                        :headline-text="cmdBoxOptionalCookies?.headlineText"
                        :headline-level="cmdBoxOptionalCookies?.headlineLevel
                    "/>
                    <!-- end CmdHeadline -->

                    <!-- begin CmdBox -->
                    <CmdBox v-for="(cookie, index) in cookieOptions.optional.cookies || []"
                            :useSlots="['header', 'body']"
                            :collapsible="cmdBoxOptionalCookies?.collapsible"
                            :key="index"
                    >
                        <template v-slot:header>
                            <!-- begin CmdFormElement -->
                            <CmdFormElement
                                element="input"
                                type="checkbox"
                                v-model="acceptedCookies"
                                :inputValue="cookie.value"
                                :labelText="cookie.labelText"
                                :disabled="cookie.disabled"
                                :id="cookie.id"
                                :toggleSwitch="true"
                                :title="getMessage('cmdcookiedisclaimer.title.toggle_to_accept_cookie')"
                            />
                            <!-- end CmdFormElement -->
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
                <!-- end optional cookies -->
            </slot>
            <!-- end slot for cookie-options -->

            <!-- begin slot for privacy-text -->
            <slot name="privacy-text"></slot>
            <!-- end slot for privacy-text -->

            <!-- begin button-wrapper for 'accept'-buttons -->
            <div class="button-wrapper align-center">
                <button v-if="buttonLabelAcceptCurrentSettings" type="button" @click="acceptCurrentCookies">
                    <span>{{ buttonLabelAcceptCurrentSettings }}</span>
                </button>
                <button v-if="buttonLabelAcceptAllCookies" type="button" class="primary" @click="acceptAllCookies">
                    <span>{{ buttonLabelAcceptAllCookies }}</span>
                </button>
            </div>
            <!-- end button-wrapper for 'accept'-buttons -->
        </div>
    </transition>
</template>

<script>
// import mixins
import I18n from "../mixins/I18n"
import DefaultMessageProperties from "../mixins/CmdCookieDisclaimer/DefaultMessageProperties"

export default {
    name: "CmdCookieDisclaimer",
    mixins: [I18n, DefaultMessageProperties],
    data() {
        return {
            showCookieDisclaimer: true,
            dataPrivacyContent: ""
        }
    },
    props: {
        /**
         * set default v-model (must be named modelValue in Vue3)
         */
        modelValue: {
            type: Array,
            required: false
        },
        /**
         * properties for CmdHeadline-component at top of cookie disclaimer
         */
        cmdHeadlineCookieDisclaimer: {
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
    computed: {
        acceptedCookies: {
            get() {
                const cookies = this.modelValue ? [...this.modelValue] : []
                const requiredCookies = this.cookieOptions?.required?.cookies || []
                for (let i = 0; i < requiredCookies.length; i++) {
                    if(!cookies.includes(requiredCookies[i].value)) {
                       cookies.push(requiredCookies[i].value)
                    }
                }
                return cookies
            },
            set(value) {
                this.$emit("update:modelValue", value)
            }
        }
    },
    methods: {
        acceptCurrentCookies() {
            this.$emit("close-cookie-disclaimer", this.acceptedCookies)
        },
        acceptAllCookies() {
            const allCookies = []

            // push all required cookies to array
            const requiredCookies = this.cookieOptions?.required?.cookies

            if (requiredCookies) {
                for (let i = 0; i < requiredCookies.length; i++) {
                    allCookies.push(requiredCookies[i].value)
                }
            }

            // push all optional cookies to array
            const optionalCookies = this.cookieOptions?.optional?.cookies

            if (optionalCookies) {
                for (let i = 0; i < optionalCookies.length; i++) {
                    allCookies.push(optionalCookies[i].value)
                }
            }

            this.$emit("close-cookie-disclaimer", allCookies)
        },
        openDataPrivacy(event) {
            /* first 'target' = clicked-element, second 'target' = target-attribute */
            if (!event.target.target) {
                event.preventDefault()
                fetch(event.target.href).then((response) =>
                    response.text()
                ).then((content) => { /* use arrow function to get access to dataPrivacy by 'this' = vue-instance (otherwise 'this' wouldn't be vue-instance in this fetch-method) */
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
        .box-header {
            padding: 0;
            justify-content: unset; /* overwrite setting for collapsible boxes */

            label {
                padding: calc(var(--default-padding) / 2) var(--default-padding);

                &.disabled {
                    .label-text span {
                        color: var(--pure-white) !important; /* required to set label-text in header to white */
                    }
                }

                & + .toggle-icon {
                    padding: calc(var(--default-padding) / 2) var(--default-padding);
                    width: 100%;
                    justify-content: flex-end;
                    text-align: right;
                }
            }

            &:hover, &:active, &:focus {
                background: var(--hyperlink-color);

                label.disabled .label-text span {
                    color: var(--pure-white) !important; /* required to set label-text on hover back to disabled-color */
                }
            }
        }

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