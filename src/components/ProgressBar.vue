<template>
    <label :for="id">
        <span>{{ labelText }}</span>
        <span class="progress-wrapper">
            <span>{{ loadingStatus }}%</span>
            <progress v-bind="$attrs" :id="id" :value="loadingStatus"></progress>
        </span>
    </label>
</template>

<script>
export default {
    name: "ProgressBar",
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
/* begin progress bar (with output) --------------------------------------------------------------------------------------------------------------------------------------------------- */
.progress-wrapper {
    display: table;

     & > span {
         position: absolute;
         color: var(--medium-gray);
         left: 50%;
         transform: translateX(-50%);
         z-index: 1;
     }
}
/* end progress (with output) --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>