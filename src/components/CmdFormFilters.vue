<template>
    <ul class="cmd-form-filters">
        <li v-if="selectedOptions.length > 1">
            <a href="#" @click.prevent="selectedOptions.splice(0,selectedOptions.length)">
                <span :class="iconClassDeleteAllFilters"></span><span>{{ labelDeleteAllFilters }}</span>
            </a>
        </li>
        <li v-for="(option, index) in selectedOptions" :key="index">
            <a href="#" @click.prevent="selectedOptions.splice(index, 1)">
                <span :class="iconClassDeleteFilter"></span>
                <span>{{ selectedOptionsName(option) }}</span>
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    name: "CmdFormFilters",
    props: {
        selectedOptions: {
            type: Array,
            required: true
        },
        labelDeleteAllFilters: {
            type: String,
            required: true
        },
        iconClassDeleteAllFilters: {
            type: String,
            required: true
        },
        iconClassDeleteFilter: {
            type: String,
            required: true
        },
        selectedOptionsName: {
            type: Function,
            required: true
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-form-filters --------------------------------------------------------------------------------------------------------------------------------------------------- */
.cmd-form-filters {
    display: -webkit-flex; /* Safari 6-8 */
    display: flex;

    li {
        list-style-type: none;
        padding: 0 .5rem;
        margin-left: 0;
        margin-right: var(--default-margin);

        &:last-of-type {
            margin-right: 0;
        }
    }
}
/* end cmd-form-filters --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>