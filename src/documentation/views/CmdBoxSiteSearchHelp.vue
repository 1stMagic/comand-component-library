<script setup>
// import function
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdBoxSiteSearch from "../../components/CmdBoxSiteSearch"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"

// import example-data
import CmdCode from "../data/CmdBoxSiteSearchHelp"
import listOfFilters from '../../assets/data/fake-select-filter-options'
import propertyDescriptions from "../generated/CmdBoxSiteSearchPropertyDescriptions"

const propertyStructures = {
    cmdCustomHeadline: {
        "address": {
            "streetNo": "<string>",
            "zip": "<number>",
            "city": "<string>"
        },
        "telephone": "<string>",
        "mobilephone": "<string>",
        "fax": "<string>",
        "email": "<string>"
    },
    results: "-",
    showLegend: "-",
    textLegend: "-"
}
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode[0]">
                <teleport to="#frame-component-target" :disabled="!isFrameMode()">
                    <CmdBoxSiteSearch
                        text-legend="Legend"
                        :results="420"
                        :listOfFilters="listOfFilters"
                        :cmdCustomHeadline="{
                            headlineText: 'Search site',
                            headlineLevel: 5
                        }"
                    />
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdBoxSiteSearch.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>