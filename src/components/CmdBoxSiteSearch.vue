<template>
    <fieldset class="cmd-box-sitesearch flex-container">
        <h3>Headline</h3>
        <div class="flex-container">
            <CmdFormElement element="input" type="text" labelText="What do you like to search for?"
                            placeholder="Search"/>
            <CmdFormElement element="input" type="text" labelText="Where do you want to search?"
                            placeholder="Zip, City"/>
            <CmdFormElement element="button" :buttonText="buttonText"
                            :buttonIcon="{iconClass: 'icon-search', iconPosition: 'before'}"
                            @click="$emit('click', $event)" aria-live="assertive"/>
        </div>
        <a href="#" @click.prevent="showFilter = !showFilter">
            <span :class="showFilter ? 'icon-single-arrow-up' : 'icon-single-arrow-down'"></span>
            <span v-if="showFilter">Hide filter options</span>
            <span v-else>Show filter options</span>
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
import CmdFormElement from "./CmdFormElement.vue"

export default {
    name: "CmdBoxSiteSearch.vue",
    components: {
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
        results: {
            type: [Function, Number],
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