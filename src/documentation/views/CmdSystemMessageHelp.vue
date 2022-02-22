<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdSystemMessage from "../../components/CmdSystemMessage"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdSystemMessageHelp"
import propertyDescriptions from "../generated/CmdSystemMessagePropertyDescriptions"

const propertyStructures = {
    iconMessage: {
        show: "<boolean>",
        iconClass: "<string>"
    },
    iconClose: {
        show: "<boolean>",
        iconClass: "<string>",
        tooltip: "<string>"
    }
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdSystemMessage
                status="warning"
                :fullWidth="true"
                message="This is a warning message!">
                <!-- begin slot-content -->
                <p>This is additional text!</p>
                <!-- end slot-content -->
            </CmdSystemMessage>
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdSystemMessage.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>