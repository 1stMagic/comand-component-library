<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdShareButtons from "../../components/CmdShareButtons"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdShareButtonsHelp"
import shareButtonsData from '../../assets/data/share-buttons'
import propertyDescriptions from "../generated/CmdShareButtonsPropertyDescriptions"

const propertyStructures = {
    shareButtons: [
        {
            "id": "<string>",
            "path": "<string>",
            "tooltip": "<string>",
            "iconClass": "<string>",
            "linkText": "<string>"
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
            <CmdShareButtons
                :share-buttons="shareButtonsData"
            />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdShareButtons.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>