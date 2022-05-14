<template>
    <ul class="cmd-form-filters">
        <li v-if="options.length > 1">
            <a href="#" @click.prevent="deleteAllFilters">
                <span v-if="linkDeleteAllFilters.icon && linkDeleteAllFilters.icon.show" :class="linkDeleteAllFilters.icon.iconClass" :title="linkDeleteAllFilters.icon.tooltip"></span>
                <span v-if="linkDeleteAllFilters.text">{{ linkDeleteAllFilters.text }}</span>
            </a>
        </li>
        <li v-for="(option, index) in options" :key="index">
            <a href="#" @click.prevent="deleteClickedFilter(index)" :title="deleteFilter.icon.tooltip">
                <span>{{ selectedOptionsName(option) }}</span>
                <span :class="deleteFilter.icon.iconClass"></span>
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    name: "CmdFormFilters",
    data() {
        return {
            options: []
        }
    },
    props: {
        /**
         * list of all selected options
         */
        modelValue: {
            type: Array,
            required: true
        },
        /**
         * delete-all-filters-link
         *
         * @requiredForAccessibility: partial
         */
        linkDeleteAllFilters: {
            type: Object,
            default() {
                return {
                    text: "Delete all filters",
                    icon: {
                        show: true,
                        iconClass: "icon-error-circle",
                        tooltip: ""
                    }
                }
            }
        },
        /**
         * icon for deleting (a single) filter
         *
         * @requiredForAccessibility: partial
         */
        deleteFilter: {
            type: Object,
            default() {
                return {
                    icon: {
                        iconClass: "icon-error-circle",
                        tooltip: "Delete this filter"
                    }
                }
            }
        },
        /**
         * name for selected options
         */
        selectedOptionsName: {
            type: Function,
            required: true
        }
    },
    methods: {
        deleteAllFilters() {
            this.options = []
            this.updateSelectedOptions()
        },
        deleteClickedFilter(index) {
            this.options.splice(index, 1)
            this.updateSelectedOptions()
        },
        updateSelectedOptions() {
            this.$emit("update:modelValue", this.options)
        }
    },
    watch: {
        modelValue: {
            handler() {
                if(this.modelValue) {
                    this.options = JSON.parse(JSON.stringify(this.modelValue))
                } else {
                    this.options = []
                }
            },
            immediate: true,
            deep: true
        }
    }
}
</script>

<style lang="scss">
/* begin cmd-form-filters ------------------------------------------------------------------------------------------ */
.cmd-form-filters {
    display: flex;

    li {
        list-style-type: none;
        margin-left: 0;
        margin-right: var(--default-margin);
        border: var(--default-border);
        background: var(--pure-white);
        font-size: 1.1rem;

        &:hover, &:active, &:focus {
            border-color: var(--primary-color);
        }

        a {
            padding: 0 calc(var(--default-padding) / 2);
            display: flex;
            align-items: center;
            text-decoration: none;
        }

        &:last-of-type {
            margin-right: 0;
        }

        [class*="icon-"] {
            font-size: 1rem;
        }
    }
}

/* end cmd-form-filters ------------------------------------------------------------------------------------------ */
</style>