<template>
    <fieldset class="cmd-box-sitesearch flex-container">
        <legend v-if="showLegend">{{ textLegend }}</legend>
        <CmdCustomHeadline :headline="cmdCustomHeadline.headline" :preHeadline="cmdCustomHeadline.preHeadline" :iconClass="cmdCustomHeadline.iconClass" />
        <div class="flex-container">
            <CmdFormElement element="input"
                            type="text"
                            :labelText="getMessage('cmdsitesearch.labeltext.what_to_search')"
                            :placeholder="getMessage('cmdsitesearch.placeholder.what_to_search')"/>
            <CmdFormElement element="input"
                            type="text"
                            :labelText="getMessage('cmdsitesearch.labeltext.where_to_search')"
                            :placeholder="getMessage('cmdsitesearch.placeholder.where_to_search')"/>
            <CmdFormElement element="button"
                            :buttonText="buttonText"
                            :buttonIcon="{iconClass: 'icon-search', iconPosition: 'before'}"
                            @click="$emit('click', $event)"
                            aria-live="assertive"/>
        </div>
        <a href="#" @click.prevent="showFilter = !showFilter">
            <span :class="showFilter ? 'icon-single-arrow-up' : 'icon-single-arrow-down'"></span>
            <span v-if="showFilter">{{ getMessage("cmdsitesearch.hide_filter_options") }}</span>
            <span v-else>{{ getMessage("cmdsitesearch.show_filter_options") }}</span>
        </a>
        <transition name="fade">
            <div class="flex-container no-flex" v-if="showFilter" aria-expanded="true">
                <CmdFormElement v-for="(filter, index) in filters" element="input" type="checkbox"
                                :labelText="filter.labelText" :inputValue="filter.value" :key="index"/>
            </div>
        </transition>
    </fieldset>
</template>

<script>
// import files for translations
import I18n from "../mixins/I18n"
import DefaultMessageProperties from "../mixins/CmdSiteSearch/DefaultMessageProperties"

// import files for components
import CmdCustomHeadline from "./CmdCustomHeadline.vue"
import CmdFormElement from "./CmdFormElement.vue"

export default {
    name: "CmdBoxSiteSearch.vue",
    mixins: [I18n, DefaultMessageProperties],
    components: {
        CmdCustomHeadline,
        CmdFormElement
    },
    data() {
        return {
            showFilter: false,
            filters: [
                {
                    labelText: "Filter 1",
                    value: "1"
                },
                {
                    labelText: "Filter 2",
                    value: "2"
                },
                {
                    labelText: "Filter 3",
                    value: "3"
                }
            ]
        }
    },
    props: {
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
    }
}
</script>

<style lang="scss">
.cmd-box-sitesearch {
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