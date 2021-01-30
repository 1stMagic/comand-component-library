<template>
    <label :for="id">
        <span>{{ labelText }}</span>
        <span class="cmd-progressbar">
            <span>{{ loadingStatus }}%</span><!-- do not place inside progress-tag (will not be displayed then) -->
            <progress v-bind="$attrs" :id="id" :value="loadingStatus"></progress>
        </span>
    </label>
</template>

<script>
export default {
    name: "CmdProgressBar",
    data () {
        return {
            loadingStatus: 50
        }
    },
    props: {
        labelText: {
          type: String,
          required: false
        },
        id: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-progressbar --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-progressbar {
    display: table;

     & > span {
         position: absolute;
         color: var(--medium-gray);
         left: 50%;
         transform: translateX(-50%);
         z-index: 1;
     }
}
/* end cmd-progressbar --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>