<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdFooterNavigation from "../../components/CmdFooterNavigation"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdFooterNavigationHelp"
import footerNavigationData from "../../assets/data/footer-navigation"
import propertyDescriptions from "../generated/CmdFooterNavigationPropertyDescriptions"

const propertyStructures = {
    footerNavigation: [
        {
            "iconClass": "<string>",
            "type": "<string>",
            "linkName": "<string>",
            "path": "<string>",
            "target": "<string>",
            "tooltip": "<string>",
            "fancybox": "<boolean>"
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
            <CmdFooterNavigation :footerNavigation="footerNavigationData" :cmdCustomHeadline="{text: 'Links', level: '4'}" />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdFooterNavigation.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>