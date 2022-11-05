<template>
    <transition name="fade">
        <div
            v-if="showSystemMessage"
            :class="['cmd-system-message', 'system-message', 'flex-container', 'vertical', { 'full-width': fullWidth }, validationStatus]"
            :role="validationStatus === 'error' ? 'alert' : 'dialog'"
            :aria-labelledby="htmlId"
        >
            <!-- begin close-icon -->
            <a
                v-if="iconClose.show && iconClose.iconClass"
                :class="iconClose.iconClass"
                href="#"
                @click.prevent="showSystemMessage = false"
                :title="iconClose.tooltip"
            ></a>
            <!-- end close-icon -->

            <!-- begin cmd-headline -->
            <CmdHeadline
                class="message-headline"
                :iconClass="iconMessage.iconClass"
                :headlineText="systemMessage"
                :headlineLevel="messageHeadlineLevel"
                :id="htmlId"
            />
            <!-- end cmd-headline -->

            <!-- begin slot-content -->
            <slot></slot>
            <!-- end slot-content -->
        </div>
    </transition>
</template>

<script>
// import mixins
import Identifier from "../mixins/Identifier"

// import components
import CmdHeadline from "./CmdHeadline"

export default {
    name: "CmdSystemMessage",
    mixins: [Identifier],
    components: {
        CmdHeadline
    },
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
         * set headline-level for system-message (given to CmdHeadline-component)
         */
        messageHeadlineLevel: {
            type: [Number, String],
            default() {
                return 6
            }
        },
        /**
         * icon to close system-message
         *
         * @requiredForAccessibility: partial
         */
        iconClose: {
            type: Object,
            default() {
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
        font-size: 0.8rem;
        font-weight: bold;
        color: var(--pure-white);
        position: absolute;
        right: 0.5rem;
        text-decoration: none;
        top: 0.5rem;
        border: var(--default-border);
        border-color: var(--pure-white);
        border-radius: var(--full-circle);
        padding: calc(var(--default-padding) / 2);

        &:hover, &:active, &:focus {
            color: var(--hyperlink-color);
            border-color: var(--hyperlink-color);
            background: var(--pure-white);
        }
    }

    &.warning {
        > a[class*="icon-"]:not(.button) {
            color: var(--text-color);
            border-color: var(--text-color);

            &:hover, &:active, &:focus {
                color: var(--hyperlink-color);
                border-color: var(--hyperlink-color);
            }
        }
    }
}

/* end cmd-system-message ------------------------------------------------------------------------------------------ */
</style>
