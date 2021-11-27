<template>
    <label class="cmd-progressbar" :for="id">
        <span v-if="labelText">{{ labelText }}</span>
        <span class="progressbar">
            <span>{{ loadingStatus }}%</span><!-- do not place inside progress-tag (will not be displayed then) -->
            <progress v-bind="$attrs" :id="id" :value="loadingStatus"></progress>
        </span>
    </label>
</template>

<script>
export default {
    name: "CmdProgressBar",
    data() {
        return {
            loadingStatus: 30
        }
    },
    props: {
        /**
         * label-text for progress-bar
         */
        labelText: {
            type: String,
            required: false
        },
        /**
         * id for progress-bar
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