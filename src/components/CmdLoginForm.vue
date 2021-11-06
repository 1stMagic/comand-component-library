<template>
    <fieldset v-if="!sendLogin" class="flex-container">
        <legend :class="{'hidden' : !legendLoginForm.show}">{{ legendLoginForm.text }}</legend>
        <h2 v-if="headlineLoginForm">{{ headlineLoginForm }}</h2>
        <div class="flex-container">
            <CmdFormElement
                element="input"
                type="text"
                :name="cmdFormElementUsername.name"
                :id="cmdFormElementUsername.id"
                v-model:value="username"
                :inner-icon-class="cmdFormElementUsername.innerIconClass"
                :labelText="cmdFormElementUsername.labelText"
                :placeholder="cmdFormElementUsername.placeholder"
            />
            <CmdFormElement
                element="input"
                type="password"
                :name="cmdFormElementPassword.name"
                :id="cmdFormElementPassword.id"
                :inner-icon-class="cmdFormElementPassword.innerIconClass"
                v-model:value="password"
                :labelText="cmdFormElementPassword.labelText"
                :placeholder="cmdFormElementPassword.placeholder"
            />
        </div>
        <div class="option-wrapper flex-container">
            <template v-if="options.forgotPassword || options.createAccount">
                <a v-if="options.forgotPassword" href="#" @click.prevent="sendLogin = true">
                    <span v-if="options.forgotPassword.icon && options.forgotPassword.icon.show && options.forgotPassword.icon.iconClass"
                          :class="options.forgotPassword.icon.iconClass"
                          :title="options.forgotPassword.icon.tooltip">
                    </span>
                    <span v-if="options.forgotPassword.text">{{ options.forgotPassword.text }}</span>
                </a>
                <a v-if="options.createAccount && options.createAccount.linkType === 'href'" :href="options.createAccount.path">
                    <span v-if="options.createAccount.icon && options.createAccount.icon.show && options.createAccount.icon.iconClass"
                          :class="options.createAccount.icon.iconClass"
                          :title="options.forgotPassword.icon.tooltip">
                    </span>
                    <span v-if="options.createAccount.text">{{ options.createAccount.text }}</span>
                </a>
                <router-link v-else-if="options.createAccount && options.createAccount.linkType === 'router'" :to="options.createAccount.path">
                    <span v-if="options.createAccount.icon && options.createAccount.icon.show && options.createAccount.icon.iconClass"
                          :class="options.createAccount.icon.iconClass"
                          :title="options.forgotPassword.icon.tooltip">
                    </span>
                    <span v-if="options.createAccount.text">{{ options.createAccount.text }}</span>
                </router-link>
            </template>
            <a
                v-if="buttons.login.linkType === 'href'"
                :class="['button', { primary: buttons.login.primary }]"
                :href="buttons.login.path"
                @click.prevent="onClick"
            >
                  <span
                      v-if="buttons.login.icon.iconClass"
                      :class="buttons.login.icon.iconClass"
                      :title="buttons.login.icon.tooltip"
                  ></span>
                <span v-if="buttons.login.text">{{ buttons.login.text }}</span>
            </a>
            <router-link
                v-if="buttons.login.linkType === 'router'"
                :class="['button', { primary: buttons.login.primary }]"
                :to="buttons.login.path"
                @click.prevent="onClick"
            >
                  <span
                      v-if="buttons.login.icon.iconClass"
                      :class="buttons.login.icon.iconClass"
                      :title="buttons.login.icon.tooltip"
                  ></span>
                <span v-if="buttons.login.text">{{ buttons.login.text }}</span>
            </router-link>
            <button
                v-if="buttons.login.linkType === 'button'"
                :type="buttons.login.type === 'submit' ? 'submit' : 'button'"
                :class="['button', { primary: buttons.login.primary }]"
                @click="onClick"
            >
                  <span
                      v-if="buttons.login.icon.iconClass"
                      :class="buttons.login.icon.iconClass"
                      :title="buttons.login.icon.tooltip"
                  ></span>
                <span v-if="buttons.login.text">{{ buttons.login.text }}</span>
            </button>
        </div>
    </fieldset>
    <fieldset v-else class="flex-container">
        <legend :class="{'hidden' : !legendSendLoginForm.show}">{{ legendSendLoginForm.text }}</legend>
        <h2 v-if="headlineSendLoginForm">{{ headlineSendLoginForm }}</h2>
        <CmdFormElement element="input"
                        type="email"
                        :inner-icon-class="cmdFormElementSendLogin.innerIconClass"
                        :labelText="cmdFormElementSendLogin.labelText"
                        :placeholder="cmdFormElementSendLogin.placeholder"
                        :name="cmdFormElementSendLogin.name"
                        :id="cmdFormElementSendLogin.id"
                        v-model:value="sendLoginMail" />
        <div class="option-wrapper flex-container">
            <a href="#" @click.prevent="sendLogin = false">
                <span v-if="options.backToLoginForm && options.backToLoginForm.icon && options.backToLoginForm.icon.show && options.backToLoginForm.icon.iconClass"
                :class="options.backToLoginForm.icon.iconClass"
                :title="options.backToLoginForm.tooltip">
                </span>
                <span v-if="options.backToLoginForm.text">
                  {{ options.backToLoginForm.text }}
                </span>
            </a>
            <a
                v-if="buttons.sendLogin.linkType === 'href'"
                :class="['button', { primary: buttons.sendLogin.primary }]"
                :href="buttons.sendLogin.path"
                @click.prevent="sendLogin"
            >
                  <span
                      v-if="buttons.sendLogin.icon.iconClass"
                      :class="buttons.sendLogin.icon.iconClass"
                      :title="buttons.sendLogin.icon.tooltip"
                  ></span>
                <span v-if="buttons.sendLogin.text">{{ buttons.sendLogin.text }}</span>
            </a>
            <router-link
                v-if="buttons.sendLogin.linkType === 'router'"
                :class="['button', { primary: buttons.sendLogin.primary }]"
                :to="buttons.sendLogin.path"
                @click.prevent="sendLogin"
            >
                  <span
                      v-if="buttons.sendLogin.icon.iconClass"
                      :class="buttons.sendLogin.icon.iconClass"
                      :title="buttons.sendLogin.icon.tooltip"
                  ></span>
                <span v-if="buttons.sendLogin.text">{{ buttons.sendLogin.text }}</span>
            </router-link>
            <button
                v-if="buttons.sendLogin.linkType === 'button'"
                :type="buttons.sendLogin.type === 'submit' ? 'submit' : 'button'"
                :class="['button', { primary: buttons.sendLogin.primary }]"
            >
                  <span
                      v-if="buttons.sendLogin.icon?.iconClass"
                      :class="buttons.sendLogin.icon?.iconClass"
                      :title="buttons.sendLogin.icon?.tooltip"
                  ></span>
                <span v-if="buttons.sendLogin.text">{{ buttons.sendLogin.text }}</span>
            </button>
        </div>
    </fieldset>
</template>

<script>
// import utilities
import {getRoute} from "../utilities.js"

// import components
import CmdFormElement from "./CmdFormElement"

export default {
    name: "CmdLoginForm",
    data() {
        return {
            username: "",
            password: "",
            sendLoginMail: "",
            sendLogin: false
        }
    },
    components: {
        CmdFormElement
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
         * legend for login-fieldset (required for accessibility)
         */
        legendLoginForm: {
            type: Object,
            default() {
                return {
                    show: false,
                    text: "Login form"
                }
            }
        },
        /**
         * legend for send-login-fieldset (required for accessibility)
         */
        legendSendLoginForm: {
            type: Object,
            default() {
                return {
                    show: false,
                    text: "Forgot login form"
                }
            }
        },
        /**
         * headline for login-form
         */
        headlineLoginForm: {
            type: String,
            default: "Login"
        },
        /**
         * headline for send-login-form
         */
        headlineSendLoginForm: {
            type: String,
            default: "Forgot login"
        },
        /**
         * properties for CmdFormElement-component for username-field
         */
        cmdFormElementUsername: {
            type: Object,
            default() {
                return {
                    labelText: "Username:",
                    placeholder: "Type in username",
                    innerIconClass: "icon-user-profile",
                    name: "login-username",
                    id: "login-username"
                }
            }
        },
        /**
         * properties for cmdFormElement-component for password-field
         */
        cmdFormElementPassword: {
            type: Object,
            default() {
                return {
                    labelText: "Password:",
                    placeholder: "Type in password",
                    innerIconClass: "icon-security-settings",
                    name: "login-password",
                    id: "login-password"
                }
            }
        },
        /**
         * properties for cmdFormElement-component for email-address-field (to send login-data)
         */
        cmdFormElementSendLogin: {
            type: Object,
            default() {
                return {
                    labelText: "Email-address:",
                    placeholder: "Type in email-address you are registered with",
                    innerIconClass: "icon-mail",
                    name: "login-send-login",
                    id: "login-send-login"
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
                          iconClass: "icon-help",
                          tooltip: ""
                      },
                      text: "Forgot password?"
                  },
                  createAccount: {
                      linkType: "href",
                      path: "#",
                      icon: {
                          show: true,
                          iconClass: "icon-register",
                          tooltip: ""
                      },
                      text: "Create new account!"
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
    methods: {
        modelChange() {
            this.$emit("update:modelValue", { "username": this.username, "password": this.password })
        },
        onClick(event) {
            this.$emit("click", event)
        },
        getRoute(language) {
            return getRoute(language)
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
    .option-wrapper {
        align-items: center;

        > a:not(.button) {
            display: flex;
            align-items: center;
            text-decoration: none;
            flex: none;

            span[class*="icon"] {
                font-size: 1.3rem;
                text-decoration: none;
            }
        }

        > .button {
            margin-left: auto;
        }
    }
</style>
