<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdTabs from "../../components/CmdTabs"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
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
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode">
                <CmdTabs
                    :stretchTabs="false"
                    :tabs="tabsData"
                />
            </ViewCodeData>
            <ViewCodeData :code="CmdCode">
                <CmdTabs
                    :stretchTabs="true"
                    :tabs="tabsData"
                />
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdTabs.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>