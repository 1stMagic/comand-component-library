<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdMultistepFormProgressBar from "../../components/CmdMultistepFormProgressBar"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdMultistepFormProgressBarHelp"
import multistepFormProgressBarData from '../../assets/data/multistep-form-progress-bar'
import propertyDescriptions from "../generated/CmdMultistepFormProgressBarPropertyDescriptions"

const propertyStructures = {
    multisteps:  [
        {
            "path": "<string>",
            "name": "<string>",
            "iconClass": "<string>"
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
            <CmdMultistepFormProgressBar
                :multisteps="multistepFormProgressBarData"
                separatorIconClass="icon-single-arrow-right"
                @click="showPageMultistep = $event.index + 1"
            />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdMultistepFormProgressBar.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>