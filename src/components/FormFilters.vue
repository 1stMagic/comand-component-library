<template>
    <ul class="form-filters">
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
    name: "FormFilters",
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
/* begin form-filters --------------------------------------------------------------------------------------------------------------------------------------------------- */
.form-filters {
    display: -webkit-flex; /* Safari 6-8 */
    display: flex;

    li {
        list-style-type: none;
        border: .1rem dotted var(--text-color);
        padding: 0 .5rem;
        margin-left: 0;
        margin-right: var(--default-margin);
        background: var(--pure-white);
        font-size: 1rem;

        &:last-of-type {
            margin-right: 0;
        }

    }

    [class*="icon-"] {
        font-size: 1rem;
    }
}
/* end form-filters --------------------------------------------------------------------------------------------------------------------------------------------------- */
</style>