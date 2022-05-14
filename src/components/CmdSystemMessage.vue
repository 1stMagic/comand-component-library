<template>
    <transition name="fade">
        <div
            v-if="showSystemMessage"
            :class="['cmd-system-message', 'system-message', 'flex-container', 'vertical', { 'full-width': fullWidth }, validationStatus]"
            :role="validationStatus === 'error' ? 'alert' : 'dialog'"
        >
            <a
                v-if="iconClose.show && iconClose.iconClass"
                :class="iconClose.iconClass"
                href="#"
                @click.prevent="showSystemMessage = false"
                :title="iconClose.tooltip"
            ></a>
            <h6>
                <span v-if="iconMessage && iconMessage.iconClass" :class="iconMessage.iconClass"></span>
                <strong v-if="systemMessage">{{ systemMessage }}</strong>
            </h6>
            <!-- begin slot-content -->
            <slot></slot>
            <!-- end slot-content -->
        </div>
    </transition>
</template>

<script>
export default {
    name: "CmdSystemMessage",
    data() {
        return {
            showSystemMessage: true
        }
    },
    props: {
        /**
         * validation-status for the message-box
         *
         * @allowedValues: error, warning, success, info
         * @affectsStyling: true
         */
        validationStatus: {
            type: String,
            required: true
        },
        /**
         * activate to stretch message-box as wide as parent container (else message-box is as wide as message (+padding))
         */
        fullWidth: {
            type: Boolean,
            default: true
        },
        /**
         * set icon-class for message (will be displayed left from message)
         */
        iconMessage: {
            type: Object,
            default: function() {
                return {
                    show: true,
                    iconClass: "icon-warning"
                }
            }
        },
        /**
         * the system-message-text
         */
        systemMessage: {
            type: String,
            required: false
        },
        /**
         * icon to close system-message
         *
         * @requiredForAccessibility: partial
         */
        iconClose: {
            type: Object,
            default: function () {
                return {
                    show: true,
                    iconClass: "icon-cancel",
                    tooltip: "Close this message"
                }
            }
        }
    },
    watch: {
        message() {
            this.showSystemMessage = true
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-system-message ---------------------------------------------------------------------------------------- */
.cmd-system-message {
    margin: var(--default-margin) 0;
    align-items: center;

    h6 {
        strong {
            margin-left: calc(var(--default-margin) / 2);
        }
    }

    > :last-child {
        margin-bottom: 0;
    }

    ul {
        display: flex;
        flex-direction: column;

        li {
            margin-left: 0;
        }
    }

    > a[class*="icon-"]:not(.button) {
        font-size: 1rem;
        color: var(--pure-white) !important;
        padding: 0;
        position: absolute;
        right: 0.5rem;
        text-decoration: none;
        top: 0.5rem;
    }
}

/* end cmd-system-message ------------------------------------------------------------------------------------------ */
</style>
