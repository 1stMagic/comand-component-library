// import mixins
import I18n from "./I18n"
import GlobalDefaultMessageProperties from "./GlobalDefaultMessageProperties"

export default {
    data() {
        return {
            validationStatus: "",
            capsLockActivated: false
        }
    },
    mixins: [
        I18n,
        GlobalDefaultMessageProperties
    ],
    props: {
        /**
         * validation message shown on clicking the status-icon of a form-element with state
         */
        validationMessage: {
            type: String,
            required: false
        },
        /**
         * link to faq/help
         */
        helplink: {
            type: Object,
            default() {
                return {
                    show: true,
                    url: "helpurl",
                    target: "help",
                    text: "Open help",
                    // text: this.getMessage("cmdfieldvalidation.open_detailed_help"),
                    icon: {
                        iconClass: "icon-questionmark-circle",
                        tooltip: "Open help in new tab"
                    }
                }
            }
        },
        /**
         * define custom requirement for validation
         *
         * prepared functions are already defined in FieldValidation.js
         */
        customRequirements: {
            type: Array,
            required: false
        },
        /**
         * toggle requirements in tooltip
         */
        showRequirements: {
            type: Boolean,
            default: true
        },
        iconError: {
            type: String,
            default: "icon-error-circle"
        } ,
        iconWarning: {
            type: String,
            default: "icon-exclamation-circle"
        },
        iconSuccess: {
            type: String,
            default: "icon-check-circle"
        },
        iconInfo: {
            type: String,
            default: "icon-info-circle"
        },
        iconCapsLock: {
            type: String,
            default: "icon-home"
        },
        iconHelp: {
            type: String,
            default: "icon-questionmark-circle"
        }
    },
    computed: {
        getValidationMessage() {
            if (this.validationStatus !== "") {
                if (this.validationStatus === "error" && !this.validationMessage) {
                    return this.getMessage("cmdfieldvalidation.information_not_filled_correctly")
                }
                if (this.validationStatus === "warning" && this.capsLockActivated) {
                    return this.getMessage("cmdfieldvalidation.caps_lock_is_activated")
                }
                if (this.validationStatus === "success") {
                    return this.getMessage("cmdfieldvalidation.information_filled_correctly")
                }
            }
            return ""
        },
        getStatusIconClass() {
            if (this.validationStatus !== "") {
                if (!this.capsLockActivated) {
                    if (this.validationStatus === "error") {
                        return this.iconError
                    } else if (this.validationStatus === "warning") {
                        return this.iconWarning
                    } else if (this.validationStatus === "success") {
                        return this.iconSuccess
                    }
                    return this.iconInfo
                } else {
                    return this.iconCapsLock
                }
            }
            return this.iconHelp
        },
        inputRequirements() {
            const standardRequirements = []
            // check if field is required
            if(this.$attrs.required) {
                standardRequirements.push({
                    message: this.getRequirementMessage(),
                    valid(value, attributes) {
                        return !attributes.required || value.length > 0
                    }
                })
            }
            // check if filed has a minimum length
            if(this.$attrs.minlength) {
                standardRequirements.push({
                    message: "Input has minimum length (" + this.modelValue.length + "/" + this.$attrs.minlength + ")",
                    valid(value, attributes) {
                        return value.length >= attributes.minlength
                    }
                })
            }
            // check is field has custom requirements defined
            if(!this.customRequirements || !this.customRequirements.length) {
                return standardRequirements
            }
            // duplicate existing requirements into new (combined) array
            return [...standardRequirements, ...this.customRequirements]
        }
    },
    methods: {
        checkForCapsLock(event) {
            if ((["password", "number", "url", "email"].includes(this.$attrs.type)) && event.getModifierState("CapsLock")) {
                this.capsLockActivated = true
                this.validationStatus = "warning"
            } else {
                this.capsLockActivated = false
                this.validationStatus = ""
            }
        },
        getRequirementMessage() {
            return this.getMessage("cmdfieldvalidation.required_field_is_filled")
        }
    }
}

function validateSpecialCharacters(message = "Field contains Special character") {
  return {
      message,
      valid(value) {
          return !/^[a-z0-9\s]*$/i.test(value)
      }
  }
}

function validateNumbers(message = "Field contains numbers") {
    return {
        message, // short for message: message
        valid(value) {
            return /\d/.test(value)
        }
    }
}

function validateNumbersOnly(message = "Field contains numbers only") {
    return {
        message, // short for message: message
        valid(value) {
            return /^\d*$/.test(value)
        }
    }
}

function validateCharacters(message = "Field contains at least one character") {
    return {
        message,
        valid(value) {
            return /[a-z]/i.test(value)
        }
    }
}

function validateCapitalLetters(message = "Field contains capital letters") {
    return {
        message,
        valid(value) {
            return /[A-Z]/.test(value)
        }
    }
}
/*
function validateMaxlength(message = "Input has maximum length") {
    return {
        message,
        valid(value, attributes) {
            return value.length <= attributes.maxlength
        }
    }
}
*/
export {
    validateSpecialCharacters,
    validateNumbers,
    validateNumbersOnly,
    validateCharacters,
    validateCapitalLetters
}