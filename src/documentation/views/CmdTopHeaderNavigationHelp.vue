<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdTopHeaderNavigation from "../../components/CmdTopHeaderNavigation"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdTopHeaderNavigationHelp"
import topHeaderNavigation from "../../assets/data/top-header-navigation"
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

const tabs = [{name: 'View'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdTopHeaderNavigation
                        align="left"
                        :topHeaderNavigationData="topHeaderNavigation"
                    />
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="topHeaderNavigation" language="json"/>
                </div>
            </div>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdTopHeaderNavigation.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>