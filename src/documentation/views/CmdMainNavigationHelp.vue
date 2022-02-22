<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdMainNavigation from "../../components/CmdMainNavigation"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdMainNavigationHelp"
import mainNavigationData from '../../assets/data/main-navigation'
import propertyDescriptions from "../generated/CmdMainNavigationPropertyDescriptions"

const propertyStructures = {
    closeOffcanvas: {
        iconClass: "<string>",
        text: "<string>",
        showText: "<boolean>"
    },
    buttonOffcanvas: {
        iconClass: "<string>",
        text: "<string>",
        showText: "<boolean>"
    },
    navigationEntries: {
        "name": "<string>",
        "href": "<string>",
        "target": "<string>",
        "subentries": [
            {
                "name": "<string>",
                "href": "<string>",
                "target": "<string>",
                "subentries": "<array>"
            }
        ]
    },
    subentriesIconClass: {
        labelText: "<string>",
        placeholder: "<string>",
        innerIconClass: "<string>",
        name: "<string>",
        id: "<string>"
    },
    subSubentriesIconClass: {
        labelText: "<string>",
        placeholder: "<string>",
        innerIconClass: "<string>",
        name: "<string>",
        id: "<string>"
    }
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdMainNavigation
                :stretchMainItems="false"
                :persistOnMobile="false"
                :navigationEntries="mainNavigationData"
            />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdMainNavigation.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>