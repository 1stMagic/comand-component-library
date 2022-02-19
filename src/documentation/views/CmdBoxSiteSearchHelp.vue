<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdBoxSiteSearch from "../../components/CmdBoxSiteSearch"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdBoxSiteSearchHelp"

const propertyDescriptions = {
    cmdCustomHeadline: "Description for property",
    results: "Description for property",
    showLegend: "Description for property",
    textLegend: "Description for property"
}
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

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdBoxSiteSearch :breadcrumbLinks="breadcrumbData" breadcrumbLabel="You are here:" />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdBoxSiteSearch.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>