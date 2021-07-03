<template>
    <ul class="cmd-form-filters">
        <li v-if="options.length > 1">
            <a href="#" @click.prevent="deleteAllFilters">
                <span :class="iconClassDeleteAllFilters"></span><span>{{ labelDeleteAllFilters }}</span>
            </a>
        </li>
        <li v-for="(option, index) in options" :key="index">
            <a href="#" @click.prevent="deleteClickedFilter(index)">
                <span :class="iconClassDeleteFilter"></span>
                <span>{{ selectedOptionsName(option) }}</span>
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
        this.$emit("update:selectedOptions", this.options)
      }
    },
    watch: {
        selectedOptions: {
            handler() {
                this.options = JSON.parse(JSON.stringify(this.selectedOptions))
            },
            immediate: true,
            deep: true
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