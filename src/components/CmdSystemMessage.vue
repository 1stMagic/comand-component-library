<template>
    <transition name="fade">
        <div
            class="cmd-system-message system-message"
            :class="[{ 'full-width': fullWidth }, status]"
            role="alert"
            v-if="showSystemMessage"
        >
            <a
                :class="closeIcon.iconClass"
                href="#"
                @click.prevent="showSystemMessage = false"
                :title="closeIcon.tooltip"
                v-if="closeIcon.iconClass"
            ></a>
            <h6>
                <span :class="iconClass" v-if="iconClass"></span>
                <strong v-if="message">{{ message }}</strong>
            </h6>
            <slot></slot>
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
        status: {
            type: String,
            required: true
        },
        fullWidth: {
            type: Boolean,
            default: true
        },
        iconClass: {
            type: String,
            default: "icon-warning"
        },
        message: {
            type: String,
            required: false
        },
        closeIcon: {
            type: Object,
            default: function () {
                return {
                    iconClass: "icon-cancel",
                    tooltip: "Close"
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

    h6 {
        display: table;
        margin: 0 auto var(--default-margin) auto;

        strong {
            margin-left: calc(var(--default-margin) / 2);
        }
    }

    > :last-child {
        margin-bottom: 0;
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
