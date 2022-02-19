<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdOpeningHours from "../../components/CmdOpeningHours"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdOpeningHoursHelp"
import openingHoursData from '../../assets/data/opening-hours'

const propertyDescriptions = {
    headline: "Description for property",
    pathToDetails: "Description for property",
    closed: "Description for property",
    textOpenClosed: "Description for property",
    openingHours: "Description for property",
    textHolidaysClosed: "Description for property",
    textMiscInfo: "Description for property"
}
const propertyStructures = {
    headline: "-",
    pathToDetails: "-",
    closed: "-",
    textOpenClosed: "-",
    openingHours: {
        "day": "<string>",
        "fromTime": "<string>",
        "tillTime": "<string>"
    },
    textHolidaysClosed: "-",
    textMiscInfo: "-"
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdOpeningHours
                :openingHours="openingHoursData"
                :closed="true"
                headline="Opening hours"
                textOpenClosed="Closed right now!"
                textHolidaysClosed="Closed on holidays"
                textMiscInfo="Miscellaneous information"
            />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdOpeningHours.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>