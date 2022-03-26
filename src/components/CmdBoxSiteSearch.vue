<template>
    <fieldset class="cmd-box-site-search flex-container">
        <!-- begin legend -->
        <legend v-if="showLegend">{{ textLegend }}</legend>
        <!-- begin legend -->

        <!-- begin CmdCustomHeadline -->
        <CmdCustomHeadline
            v-if="cmdCustomHeadline"
            v-bind="cmdCustomHeadline"
        />
        <!-- end CmdCustomHeadline -->

        <!-- begin form-elements -->
        <div class="flex-container">
            <!-- begin CmdFormElement -->
            <CmdFormElement
                element="input"
                type="text"
                :labelText="getMessage('cmdsitesearch.labeltext.what_to_search')"
                :placeholder="getMessage('cmdsitesearch.placeholder.what_to_search')"
            />
            <!-- end CmdFormElement -->

            <!-- begin CmdFormElement -->
            <CmdFormElement
                element="input"
                type="text"
                :labelText="getMessage('cmdsitesearch.labeltext.where_to_search')"
                :placeholder="getMessage('cmdsitesearch.placeholder.where_to_search')"
            />
            <!-- end CmdFormElement -->

            <!-- begin CmdFormElement -->
            <CmdFormElement
                element="button"
                :buttonText="buttonText"
                :buttonIcon="{iconClass: 'icon-search', iconPosition: 'before'}"
                @click="$emit('click', $event)"
                aria-live="assertive"
            />
            <!-- end CmdFormElement -->
        </div>
        <!-- end form-elements -->

        <!-- begin filters -->
        <template v-if="useFilters">
            <a href="#" @click.prevent="showFilters = !showFilters">
                <span :class="showFilters ? 'icon-single-arrow-up' : 'icon-single-arrow-down'"></span>
                <span v-if="showFilters">{{ getMessage("cmdsitesearch.hide_filter_options") }}</span>
                <span v-else>{{ getMessage("cmdsitesearch.show_filter_options") }}</span>
            </a>
            <transition name="fade">
                <div v-if="showFilters && listOfFilters.length" class="flex-container no-flex" aria-expanded="true">
                    <!-- begin CmdFakeSelect -->
                    <CmdFakeSelect
                        :selectData="listOfFilters"
                        v-model="fakeSelectFilters"
                        defaultOptionName="Select filters:"
                        type="checkboxOptions"
                        labelText="Filters:"
                    />
                    <!-- end CmdFakeSelect -->
                </div>
            </transition>
        </template>
        <!-- end filters -->
    </fieldset>
    <CmdFormFilters v-if="useFilters" v-model="fakeSelectFilters" :selectedOptionsName="getOptionName"/>
</template>

<script>
// import mixins
import I18n from "../mixins/I18n"
import DefaultMessageProperties from "../mixins/CmdSiteSearch/DefaultMessageProperties"

// import files for components
import CmdCustomHeadline from "./CmdCustomHeadline"
import CmdFakeSelect from "./CmdFakeSelect"
import CmdFormElement from "./CmdFormElement"
import CmdFormFilters from "./CmdFormFilters"

export default {
    name: "CmdBoxSiteSearch",
    mixins: [I18n, DefaultMessageProperties],
    components: {
        CmdCustomHeadline,
        CmdFakeSelect,
        CmdFormElement,
        CmdFormFilters
    },
    data() {
        return {
            showFilters: false,
            fakeSelectFilters: []
        }
    },
    props: {
        modelValue: {
            type: Array,
            required: false
        },
        /**
         * toggle use of filters (must configured)
         */
        useFilters: {
            type: Boolean,
            default: true
        },
        /**
         * set list of filters
         *
         * useFilters-property must be activated
         */
        listOfFilters: {
            type: Array,
            required: false
        },
        /**
         * text for legend
         *
         * @requiredForAccessibility: true
         */
        textLegend: {
            type: String,
            required: true
        },
        /**
         * toggle legend visibility
         *
         * textLegend must be set
         */
        showLegend: {
            type: Boolean,
            default: true
        },
        /**
         * send search result from outside to display inside this component
         */
        results: {
            type: [Function, Number],
            required: false
        },
        /**
         * properties for CmdCustomHeadline-component
         */
        cmdCustomHeadline: {
            type: Object,
            required: false
        }
    },
    computed: {
        buttonText() {
            if (this.results) {
                return this.results + " Results"
            }
            return "Search"
        }
    },
    methods: {
        getOptionName(option) {
            for (let i = 0; i < this.listOfFilters.length; i++) {
                if (option === this.listOfFilters[i].value) {
                    return this.listOfFilters[i].text
                }
            }
            return null
        }
    }
}
</script>

<style lang="scss">
.cmd-box-site-search {
    > a {
        [class*='icon'] {
            font-size: 1rem;
        }
    }

    button {
        align-self: flex-end;
    }
}
</style>