<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdFooterNavigation from "../../components/CmdFooterNavigation"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdFooterNavigationHelp"
import footerNavigation from "../../assets/data/footer-navigation"
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

const tabs = [{name: 'View'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdFooterNavigation :footerNavigation="footerNavigation" :cmdCustomHeadline="{text: 'Links', level: '4'}"/>
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="footerNavigation" language="json"/>
                </div>
            </div>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdFooterNavigation.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>