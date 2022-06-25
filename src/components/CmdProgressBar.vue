<template>
    <label class="cmd-progressbar" :for="id">
        <span :class="['label-text', {hidden: !showLabel}]">{{ labelText }}</span>
        <span class="progressbar">
            <span v-if="showLoadingStatus">{{ loadingStatus }} %</span><!-- do not place inside progress-tag (will not be displayed then) -->
            <progress v-bind="$attrs" :id="id" :value="loadingStatus"></progress>
        </span>
    </label>
</template>

<script>
export default {
    name: "CmdProgressBar",
    inheritAttrs: false,
    data() {
        return {
            loadingStatus: 30
        }
    },
    props: {
        /**
         * label-text for progress-bar
         *
         * @requiredForAccessibility: true
         */
        labelText: {
            type: String,
            required: false
        },
        /**
         * toggle visibility for label-text
         */
        showLabel: {
            type: Boolean,
            default: true
        },
        /**
         * toggle visibility for loading-status
         */
        showLoadingStatus: {
            type: Boolean,
            default: true
        },
        /**
         * id for progress-bar
         *
         * @requiredForAccessibility: true
         */
        id: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-progressbar ---------------------------------------------------------------------------------------- */
.cmd-progressbar {
    .progressbar {
        display: table;

        & > span {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
        }
    }
}
/* end cmd-progressbar ------------------------------------------------------------------------------------------ */
</style>