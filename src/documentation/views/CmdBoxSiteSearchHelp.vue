<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdBoxSiteSearch from "../../components/CmdBoxSiteSearch"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdBoxSiteSearchHelp"
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

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
           <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdBoxSiteSearch :breadcrumbLinks="breadcrumbData" breadcrumbLabel="You are here:" />
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode" />
                </div>
                <div>
                    <h3>Data</h3>
                </div>
            </div>
        </template>

        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdBoxSiteSearch.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>