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
                href="#"
                @click.prevent="showSystemMessage = false"
                :title="iconClose.tooltip"
            >
                <!-- begin CmdIcon -->
                <CmdIcon :iconClass="iconClose.iconClass" :type="iconClose.iconType" />
                <!-- end CmdIcon -->
            </a>
            <!-- end close-icon -->

            <!-- begin CmdHeadline -->
            <CmdHeadline
                class="message-headline"
                :headlineIcon="headlineIcon"
                :headlineText="systemMessage"
                :headlineLevel="messageHeadlineLevel"
                :id="htmlId"
            />
            <!-- end CmdHeadline -->

            <!-- begin slot-content -->
            <slot></slot>
            <!-- end slot-content -->
        </div>
    </transition>
</template>

<script>
// import mixins
import Identifier from "../mixins/Identifier"

export default {
    name: "CmdSystemMessage",
    mixins: [Identifier],
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
                    iconClass: "icon-warning",
                    type: "auto"
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
    computed: {
        headlineIcon() {
            if(this.iconMessage.show) {
                return {
                    iconClass: this.iconMessage.iconClass,
                    type: this.iconMessage.type
                }
            }
            return null
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

    > a:not(.button) {
        display: flex;
        position: absolute;
        width: auto; /* avoids stretching by flex-containers */
        top: .5rem;
        right: .5rem;
        text-decoration: none;
        border: var(--default-border);
        border-color: var(--pure-white);
        border-radius: var(--full-circle);
        padding: calc(var(--default-padding) / 2);
        z-index: 100;
        line-height: 1;

        [class*="icon-"] {
            font-size: 0.8rem;
            color: var(--pure-white);
        }

        &:hover, &:active, &:focus {
            border-color: var(--hyperlink-color);
            background: var(--pure-white);

            [class*="icon-"] {
                font-size: 0.8rem;
                color: var(--hyperlink-color);
            }
        }
    }

    &.warning {
        > a:not(.button) {
            border-color: var(--text-color);

            [class*="icon-"] {
                color: var(--text-color);
            }

            &:hover, &:active, &:focus {
                border-color: var(--hyperlink-color);

                [class*="icon-"] {
                    color: var(--hyperlink-color);
                }
            }
        }
    }
}

/* end cmd-system-message ------------------------------------------------------------------------------------------ */
</style>
