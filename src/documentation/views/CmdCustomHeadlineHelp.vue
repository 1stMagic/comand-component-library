<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdCustomHeadline from "../../components/CmdCustomHeadline"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdCustomHeadlineHelp"
import propertyDescriptions from "../generated/CmdCustomHeadlinePropertyDescriptions"

const propertyStructures = {
    headline: {
        "text": "<string>",
        "level": "<number>",
    }
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdCustomHeadline :headline="{text: 'Headline given by property', level: '3'}" preHeadline="Pre-headline" iconClass="icon-user-profile" />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdCustomHeadline.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>