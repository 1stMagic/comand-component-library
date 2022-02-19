<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdSlideButton from "../../components/CmdSlideButton"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdSlideButtonHelp"

const propertyDescriptions = {
    slideButtonType: "Description for property"
}
const propertyStructures = {
    slideButtons: {
        prev: {
            iconClass: "<string>",
            tooltip: "<string>"
        },
        next: {
            iconClass: "<string>",
            tooltip: "<string>"
        }
    }
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdSlideButton slideButtonType="prev" />
            <CmdSlideButton slideButtonType="next" />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdSlideButton.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>