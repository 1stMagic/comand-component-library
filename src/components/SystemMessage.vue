<template>
    <transition name="fade-system-message">
        <div class="system-message" :class="[{'full-width' : fullWidth}, messageStatus]" v-if="showSystemMessage">
            <a class="icon-cancel" href="#" @click.prevent="showSystemMessage = false" title="Close"></a>
            <header>
                <span class="icon-cancel" v-if="messageStatus === 'error'"></span>
                <span class="icon-warning" v-if="messageStatus === 'warning'"></span>
                <span class="icon-check" v-if="messageStatus === 'success'"></span>
                <span class="icon-info" v-if="messageStatus === 'information'"></span>
                <strong v-if="systemMessage">{{ systemMessage }}</strong>
            </header>
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    name: "SystemMessage",
    data() {
        return {
            showSystemMessage: true
        }
    },
    props: {
        messageStatus: String,
        fullWidth: Boolean,
        systemMessage: String
    }
}
</script>

<style lang="scss">
/* begin system-message --------------------------------------------------------------------------------------------------------------------------------------------------- */
.system-message {
    margin: var(--default-margin) 0;

    header {
        display: table;
        margin: 0 auto var(--default-margin) auto;

        strong {
            margin-left: calc(var(--default-margin) / 2);
        }
    }

    > :last-child {
        margin: 0;
    }

    > a[class*="icon-"]:not(.button) {
        font-size: 1rem;
        padding: 0;
        position: absolute;
        right: .5rem;
        text-decoration: none;
        top: .5rem;
        color: var(--pure-white) !important;
        text-shadow: var(--text-shadow);
    }
}

.fade-system-message-enter-active, .fade-system-message-leave-active {
    transition: opacity 1s;
}

.fade-system-message-enter, .fade-system-message-leave-to {
    opacity: 0;
}
/* end system-message --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>