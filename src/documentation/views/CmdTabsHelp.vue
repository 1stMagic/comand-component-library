<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdTabs from "../../components/CmdTabs"
import ComponentProperties from "../components/ComponentProperties"
import CmdCode from "../data/CmdTabsHelp"
import tabsData from "../../assets/data/tabs"
import propertyDescriptions from "../generated/CmdTabsPropertyDescriptions"

const propertyStructures = {
    tabs: [
        {
            "name": "<string>",
            "headline": "<string>",
            "htmlContent": "<string>"
        }
    ]
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdTabs
                :stretchTabs="false"
                :tabs="tabsData"
            />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdTabs.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>