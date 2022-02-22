<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdTable from "../../components/CmdTable"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdTableHelp"
import tableDataSmall from "../../assets/data/table-small"
import propertyDescriptions from "../generated/CmdTablePropertyDescriptions"

const propertyStructures = {
    tableData: {
        "caption": {
            "hide": "<boolean>",
            "text": "<string>"
        },
        "thead": "<array>",
        "tbody": [
            "<array>"
        ],
        "tfoot": "<array>"
    },
    fullWidthOnDefault: {
        show: "<boolean>",
        iconClass: "<string>"
    },
    iconExpand: {
        iconClass: "<string>",
        tooltip: "<string>"
    },
    iconCollapse: {
        iconClass: "<string>",
        tooltip: "<string>"
    },
    iconShrink: {
        iconClass: "<string>",
        tooltip: "<string>"
    },
    iconStretch: {
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
            <CmdTable
                :collapsible="true"
                :fullWidthOnDefault="false"
                :userCanToggleWidth="true"
                :table-data="tableDataSmall"
            />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdTable.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>