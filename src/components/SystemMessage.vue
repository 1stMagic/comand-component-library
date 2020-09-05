<template>
    <transition name="fade">
        <div class="system_message" :class="[{'full_width' : fullWidth}, messageStatus]" v-if="show">
            <a class="icon-cancel" href="#" @click.prevent="show = false" title="Close"></a>
            <header>
                <span class="icon-cancel" v-if="messageStatus == 'error'"></span>
                <span class="icon-warning" v-if="messageStatus == 'warning'"></span>
                <span class="icon-check" v-if="messageStatus == 'success'"></span>
                <span class="icon-info" v-if="messageStatus == 'information'"></span>
                <strong v-if="systemMessage">{{ systemMessage }}</strong>
            </header>
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            show: true
        }
    },
    props: {
        messageStatus: String,
        fullWidth: Boolean,
        systemMessage: String
    }
}
</script>

<style scoped lang="scss">
/* begin system_messages --------------------------------------------------------------------------------------------------------------------------------------------------- */
.system_message {
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
        color: var(--blank-color) !important;
        text-shadow: var(--text-shadow);
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
/* end system_messages --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>