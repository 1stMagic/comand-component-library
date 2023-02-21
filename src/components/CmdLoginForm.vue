<template>
    <!-- begin login-form -->
    <fieldset v-show="!sendLogin" class="cmd-login-form flex-container">
        <legend :class="{hidden : !showLegend}">{{ textLegendLoginForm }}</legend>
        <!-- begin CmdHeadline -->
        <CmdHeadline
            v-if="cmdHeadlineLoginForm"
            v-bind="cmdHeadlineLoginForm"
        />
        <!-- end CmdHeadline -->

        <!-- being form elements -->
        <div class="flex-container">
            <!-- begin CmdFormElement -->
            <CmdFormElement
                element="input"
                type="text"
                :name="cmdFormElementUsername.name"
                :id="cmdFormElementUsername.id"
                v-model="username"
                :fieldIconClass="cmdFormElementUsername.innerIconClass"
                :labelText="cmdFormElementUsername.labelText"
                :placeholder="cmdFormElementUsername.placeholder"
                :required="cmdFormElementUsername.required"
                @validationStatusChange="checkValidationStatus($event, 'username')"
            />
            <!-- end CmdFormElement -->

            <!-- begin CmdFormElement -->
            <CmdFormElement
                element="input"
                type="password"
                :name="cmdFormElementPassword.name"
                :id="cmdFormElementPassword.id"
                :fieldIconClass="cmdFormElementPassword.innerIconClass"
                v-model="password"
                :labelText="cmdFormElementPassword.labelText"
                :placeholder="cmdFormElementPassword.placeholder"
                :required="cmdFormElementPassword.required"
                @validationStatusChange="checkValidationStatus($event, 'password')"
            />
            <!-- end CmdFormElement -->
        </div>
        <!-- end form elements -->

        <div class="option-wrapper flex-container">
            <template v-if="options.forgotPassword || options.createAccount">
                <!-- begin link for 'forgot password' -->
                <a v-if="options.forgotPassword" href="#" @click.prevent="sendLogin = true">
                    <!-- begin CmdIcon -->
                    <CmdIcon v-if="options.forgotPassword.icon?.show && options.forgotPassword.icon?.iconClass"
                          :iconClass="options.forgotPassword.icon.iconClass"
                          :type="options.forgotPassword.icon.iconType"
                          :title="options.forgotPassword.icon.tooltip"
                    />
                    <!-- end CmdIcon -->
                    <span v-if="options.forgotPassword.text">{{ options.forgotPassword.text }}</span>
                </a>
                <!-- end link for 'forgot password' -->

                <!-- begin link-type 'href' for 'create account' -->
                <a v-if="options.createAccount && options.createAccount.linkType === 'href'" :href="options.createAccount.path">
                    <!-- begin CmdIcon -->
                    <CmdIcon v-if="options.createAccount.icon?.show && options.createAccount.icon?.iconClass"
                          :iconClass="options.createAccount.icon.iconClass"
                          :type="options.createAccount.icon.iconType"
                          :title="options.createAccount.icon.tooltip" />
                    <!-- end CmdIcon -->
                    <span v-if="options.createAccount.text">{{ options.createAccount.text }}</span>
                </a>
                <!-- end link-type 'href' for 'create account' -->

                <!-- begin link-type 'router' for 'create account' -->
                <router-link v-else-if="options.createAccount && options.createAccount.linkType === 'router'" :to="options.createAccount.path">
                    <!-- begin CmdIcon -->
                    <CmdIcon v-if="options.createAccount.icon && options.createAccount.icon.show && options.createAccount.icon.iconClass"
                          :class="options.createAccount.icon.iconClass"
                          :type="options.createAccount.icon.iconType"
                          :title="options.createAccount.icon.tooltip" />
                    />
                    <!-- end CmdIcon -->
                    <span v-if="options.createAccount.text">{{ options.createAccount.text }}</span>
                </router-link>
                <!-- end link-type 'router' for 'create account' -->
            </template>

            <!-- begin link-type 'button' -->
            <button
                v-if="buttons.login.linkType === 'button'"
                :type="buttons.login.type === 'submit' ? 'submit' : 'button'"
                :class="['button', { primary: buttons.login.primary }]"
                @click="onClick"
                :disabled="buttonLoginDisabled"
            >
                <!-- begin CmdIcon -->
                <CmdIcon
                    v-if="buttons.login.icon.iconClass"
                    :iconClass="buttons.login.icon.iconClass"
                    :type="buttons.login.icon.iconType"
                    :title="buttons.login.icon.tooltip"
                />
                <!-- end CmdIcon -->
                <span v-if="buttons.login.text">{{ buttons.login.text }}</span>
            </button>
            <!-- begin link-type 'button' -->
        </div>
    </fieldset>
    <!-- end login-form -->

    <!-- begin send-login-form -->
    <fieldset v-show="sendLogin" class="cmd-login-form flex-container">
        <legend :class="{'hidden' : !showLegend}">{{ textLegendForgotLoginForm }}</legend>
        <!-- begin CmdHeadline -->
        <CmdHeadline
            v-if="cmdHeadlineSendLoginForm"
            v-bind="cmdHeadlineSendLoginForm"
        />
        <!-- end CmdHeadline -->

        <!-- begin CmdFormElement -->
        <CmdFormElement
            element="input"
            type="email"
            :fieldIconClass="cmdFormElementSendLogin.innerIconClass"
            :labelText="cmdFormElementSendLogin.labelText"
            :placeholder="cmdFormElementSendLogin.placeholder"
            :name="cmdFormElementSendLogin.name"
            :required="cmdFormElementSendLogin.required"
            :id="cmdFormElementSendLogin.id"
            @validationStatusChange="checkValidationStatus($event, 'email')"
            v-model="sendLoginMail"
        />
        <!-- end CmdFormElement -->

        <div class="option-wrapper flex-container">
            <a href="#" @click.prevent="sendLogin = false">
                <!-- begin CmdIcon -->
                <CmdIcon
                    v-if="options.backToLoginForm && options.backToLoginForm.icon && options.backToLoginForm.icon.show && options.backToLoginForm.icon.iconClass"
                    :iconClass="options.backToLoginForm.icon.iconClass"
                    :type="options.backToLoginForm.icon.iconType"
                    :title="options.backToLoginForm.icon.tooltip"
                />
                <!-- end CmdIcon -->
                <span v-if="options.backToLoginForm.text">
                  {{ options.backToLoginForm.text }}
                </span>
            </a>

            <!-- begin link-type 'button' -->
            <button
                v-if="buttons.sendLogin.linkType === 'button'"
                :type="buttons.sendLogin.type === 'submit' ? 'submit' : 'button'"
                :class="['button', { primary: buttons.sendLogin.primary }]"
                :disabled="buttonSendLoginDisabled"
            >
                <!-- begin CmdIcon -->
                <CmdIcon
                    v-if="buttons.sendLogin.icon?.iconClass"
                    :iconClass="buttons.sendLogin.icon?.iconClass"
                    :title="buttons.sendLogin.icon?.tooltip"
                />
                <!-- end CmdIcon -->
                <span v-if="buttons.sendLogin.text">{{ buttons.sendLogin.text }}</span>
            </button>
            <!-- end link-type 'button' -->
        </div>
    </fieldset>
    <!-- end send-login-form -->
</template>

<script>
// import utilities
import {getRoute} from "../utilities.js"

export default {
    name: "CmdLoginForm",
    data() {
        return {
            usernameValidationStatus: false,
            passwordValidationStatus: false,
            emailValidationStatus: false,
            sendLoginMail: "",
            sendLogin: false
        }
    },
    props: {
        /**
         * value for v-model (modelValue is default name in vue 3)
         */
        modelValue: {
            type: Object,
            default() {
                return {
                    username: "",
                    password: ""
                }
            }
        },
        /**
         * text used as legend for login-fieldset
         *
         * @requiredForAccessibility: true
         */
        textLegendLoginForm: {
            type: String,
            default: "Login form"
        },
        /**
         * toggle legend visibility
         */
        showLegend: {
            type: Boolean,
            default: true
        },
        /**
         * legend for forgot-login-fieldset
         *
         * @requiredForAccessibility: true
        */
        textLegendForgotLoginForm: {
            type: String,
            default: "Forgot login form"
        },
        /**
         * properties for CmdHeadline-component for login-form
         */
        cmdHeadlineLoginForm: {
            type: Object,
            required: false
        },
        /**
         * properties for CmdHeadline-component for send-login-form
         */
        cmdHeadlineSendLoginForm: {
            type: Object,
            required: false
        },
        /**
         * properties for CmdFormElement-component for username-field
         *
         * @requiredForAccessibility: partial
         */
        cmdFormElementUsername: {
            type: Object,
            default() {
                return {
                    labelText: "Username:",
                    placeholder: "Type in username",
                    innerIconClass: "icon-user-profile",
                    name: "login-username",
                    id: "login-username",
                    required: true
                }
            }
        },
        /**
         * properties for CmdFormElement-component for password-field
         *
         * @requiredForAccessibility: partial
         */
        cmdFormElementPassword: {
            type: Object,
            default() {
                return {
                    labelText: "Password:",
                    placeholder: "Type in password",
                    innerIconClass: "icon-security-settings",
                    name: "login-password",
                    id: "login-password",
                    required: true
                }
            }
        },
        /**
         * properties for CmdFormElement-component for email-address-field (to send login-data)
         *
         * @requiredForAccessibility: partial
         */
        cmdFormElementSendLogin: {
            type: Object,
            default() {
                return {
                    labelText: "Email-address:",
                    placeholder: "Type in email-address you are registered with",
                    innerIconClass: "icon-mail",
                    name: "login-send-login",
                    id: "login-send-login",
                    required: true
                }
            }
        },
        /**
         * options to display
         * 
         * forgotPassword: toggles form to send password by email
         * createAccount: creates a link (href/router) which could lead to a register-form
         */
        options: {
            type: Object,
            default() {
                return {
                    forgotPassword: {
                        icon: {
                            show: true,
                            iconClass: "icon-questionmark-circle",
                            tooltip: ""
                        },
                        text: "Forgot password"
                    },
                    createAccount: {
                        linkType: "href",
                        path: "#",
                        icon: {
                            show: true,
                            iconClass: "icon-register",
                            tooltip: ""
                        },
                        text: "Create new account"
                    },
                    backToLoginForm: {
                        icon: {
                            show: true,
                            iconClass: "icon-single-arrow-left",
                            tooltip: ""
                        },
                        text: "Back to login form"
                    }
                }
            }
        },
        /**
         * button to login
         *
         * @requiredForAccessibility: partial
         */
        buttons: {
            type: Object,
            default() {
                return {
                    login: {
                        linkType: "button", /* href, router, button */
                        type: "submit", /* submit, button */
                        path: "",
                        text: "Login",
                        primary: true,
                        icon: {
                            show: true,
                            iconClass: "icon-logon",
                            tooltip: ""
                        }
                    },
                    sendLogin: {
                        linkType: "button", /* href, router, button */
                        type: "submit", /* submit, button */
                        path: "",
                        text: "Send login",
                        primary: true,
                        icon: {
                            show: true,
                            iconClass: "icon-mail",
                            tooltip: ""
                        }
                    }
                }
            }
        }
    },
    computed: {
        buttonLoginDisabled() {
            return !(this.usernameValidationStatus && this.passwordValidationStatus)
        },
        buttonSendLoginDisabled() {
            return !this.emailValidationStatus
        },
        username: {
            get() {
                return this.modelValue.username
            },
            set(value) {
                this.$emit("update:modelValue", {username: value, password: this.password})
            }
        },
        password: {
            get() {
                return this.modelValue.password
            },
            set(value) {
                this.$emit("update:modelValue", {username: this.username, password: value})
            }
        }
    },
    methods: {
        modelChange() {
            this.$emit("update:modelValue", { "username": this.username, "password": this.password })
        },
        onClick(event) {
            this.$emit("click", event)
        },
        getRoute(language) {
            return getRoute(language)
        },
        checkValidationStatus(event, fieldType) {
            if (event == null) {
                return
            }
            if(fieldType === "username") {
                this.usernameValidationStatus = event === "success";
            } else if(fieldType === "password") {
                this.passwordValidationStatus = event === "success";
            } else {
                this.emailValidationStatus = event === "success";
            }
        }
    },
    watch: {
        username() {
          this.modelChange()
        },
        password() {
          this.modelChange()
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-login-form ---------------------------------------------------------------------------------------- */
.cmd-login-form {
    .option-wrapper {
        align-items: center;

        > a:not(.button) {
            display: flex;
            align-items: center;
            text-decoration: none;
            flex: none;

            [class*="icon-"] {
                text-decoration: none;
            }
        }

        > .button {
            margin-left: auto;
        }
    }
}
/* end cmd-login-form ---------------------------------------------------------------------------------------- */
</style>
