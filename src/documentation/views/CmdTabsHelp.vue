<script setup>
// import functions
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdTabs from "../../components/CmdTabs"
import CmdCustomHeadline from "../../components/CmdCustomHeadline"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"

// import example-data
import CmdCode from "../data/CmdTabsHelp"
import tabs from "../../assets/data/tabs"
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
            <h2>Component</h2>
            <CmdCustomHeadline headlineText="Tabs (not stretched)" :headlineLevel="3" preHeadlineText="Example #1" />
            <ViewCodeData :isFirstComponent="true" :code="CmdCode[0]" :data="tabs">
                <CmdTabs
                    :stretchTabs="false"
                    :tabs="tabs"
                />
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline headlineText="Tabs (stretched)" :headlineLevel="3" preHeadlineText="Example #2" />
            <ViewCodeData :code="CmdCode[1]" :data="tabs">
                <CmdTabs
                    :stretchTabs="true"
                    :tabs="tabs"
                />
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdTabs.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>