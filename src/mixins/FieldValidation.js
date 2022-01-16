export default {
    data() {
        return {
            validationStatus: "",
            capsLockActivated: false
        }
    },
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
                    text: "Open detailed help",
                    icon: {
                        iconClass: "icon-questionmark-circle",
                        tooltip: "Open help in new tab"
                    }
                }
            }
        },
        /**
         * toggle requirements in tooltip
         */
        showRequirements: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        getValidationMessage() {
            if (this.validationStatus !== "") {
                if (this.validationStatus === "error" && !this.validationMessage) {
                    return "This information is not filled correctly!"
                }
                if (this.validationStatus === "warning" && this.capsLockActivated) {
                    return "Attention: Caps lock is activated!"
                }
                if (this.validationStatus === "success") {
                    return "Field is filled correctly!"
                }
            }
            return ""
        },
        getStatusIconClass() {
            if (this.validationStatus !== "") {
                if (!this.capsLockActivated) {
                    if (this.validationStatus === "success") {
                        return "icon-check-circle"
                    } else if (this.validationStatus === "warning") {
                        return "icon-exclamation-circle"
                    }
                    return "icon-" + this.validationStatus + "-circle"
                } else {
                    return "icon-home"
                }
            }
            return "icon-questionmark-circle"
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
        }
    }
}