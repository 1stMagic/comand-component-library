<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdTabs from "../../components/CmdTabs"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
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
    <CmdTabs v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
           <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdTabs
                        :stretchTabs="false"
                        :tabs="tabsData"
                    />
                    <CmdTabs
                        :stretchTabs="true"
                        :tabs="tabsData"
                    />
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="tabsData" language="json"/>
                </div>
            </div>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdTabs.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>