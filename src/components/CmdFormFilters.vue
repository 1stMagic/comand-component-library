<template>
    <ul v-if="options.length" class="cmd-form-filters">
        <li v-if="options.length > 1">
            <a href="#" @click.prevent="deleteAllFilters">
                <!-- begin CmdIcon -->
                <CmdIcon v-if="linkDeleteAllFilters.icon && linkDeleteAllFilters.icon.show" :iconClass="linkDeleteAllFilters.icon.iconClass" :title="linkDeleteAllFilters.icon.tooltip" />
                <!-- end CmdIcon -->
                <span v-if="linkDeleteAllFilters.text">{{ linkDeleteAllFilters.text }}</span>
            </a>
        </li>
        <li v-for="(option, index) in options" :key="index">
            <a href="#" @click.prevent="deleteClickedFilter(index)" :title="deleteFilterIcon.tooltip">
                <span>{{ selectedOptionsName(option) }}</span>
                <!-- begin CmdIcon -->
                <CmdIcon :iconClass="deleteFilterIcon.iconClass" :type="deleteFilterIcon.iconType" />
                <!-- end CmdIcon -->
            </a>
        </li>
    </ul>
</template>

<script>
// import components
import CmdIcon from "./CmdIcon"

export default {
    name: "CmdFormFilters",
    data() {
        return {
            options: []
        }
    },
    components: {
        CmdIcon
    },
    props: {
        /**
         * model-value to support v-model
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
        deleteFilterIcon: {
            type: Object,
            default() {
                return {
                    iconClass: "icon-error-circle",
                    tooltip: "Delete this filter",
                    type: "auto"
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
        font-size: var(--font-size-small);

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
            font-size: var(--icon-size-small);
        }
    }
}

/* end cmd-form-filters ------------------------------------------------------------------------------------------ */
</style>