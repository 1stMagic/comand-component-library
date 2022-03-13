<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdTopHeaderNavigation from "../../components/CmdTopHeaderNavigation"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
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
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode" :data="topHeaderNavigation">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdTopHeaderNavigation
                        align="left"
                        :topHeaderNavigationData="topHeaderNavigation"
                    />
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdTopHeaderNavigation.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>