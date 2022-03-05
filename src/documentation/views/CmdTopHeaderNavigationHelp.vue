<script setup>

import {tabProps, tabHandlers} from "../tabs"
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




</script>

<template>
    <CmdTabs v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
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