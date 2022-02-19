<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdProgressBar from "../../components/CmdProgressBar"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdProgressBarHelp"

const propertyDescriptions = {
    labelText: "Description for property",
    id: "Description for property"
}
const propertyStructures = {
    labelText: "-",
    id: "-"
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdProgressBar
                labelText="Progress Bar (with optional output):"
                id="progress-bar"
                max="100"
            />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdProgressBar.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>