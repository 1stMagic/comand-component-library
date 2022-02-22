<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdTopHeaderNavigation from "../../components/CmdTopHeaderNavigation"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdTopHeaderNavigationHelp"
import topHeaderNavigationData from "../../assets/data/top-header-navigation"
import propertyDescriptions from "../generated/CmdTopHeaderNavigationPropertyDescriptions"

const propertyStructures = {
    topHeaderNavigationData: [
        {
            "linkType": "<string>",
            "path": "<string>",
            "target": "<string>",
            "icon": {
                "iconClass": "<string>",
                "tooltip": "<string>"
            }
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
            <CmdTopHeaderNavigation
                align="left"
                :topHeaderNavigationData="topHeaderNavigationData"
            />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdTopHeaderNavigation.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>