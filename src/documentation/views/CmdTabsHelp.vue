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

const tabs = [{name: 'View'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
           <div class="flex-container">
                <div>
                    <h3>View</h3>
            <CmdTabs
                :stretchTabs="false"
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