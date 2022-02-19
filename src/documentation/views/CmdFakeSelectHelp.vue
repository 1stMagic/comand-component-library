<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdFakeSelect from "../../components/CmdFakeSelect"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdFakeSelectHelp"
import fakeSelectOptionsData from "../../assets/data/fake-select-options"

const propertyDescriptions = {
    labelText: "Description for property",
    status: "Description for property",
    selectData: "Description for property",
    defaultOptionName: "Description for property",
    dropdownIcon: "Description for property",
    pathFlags: "Description for property",
    showSelectAllOptions: "Description for property",
    type: "Description for property",
    value: "Description for property"
}
const propertyStructures = {
    dropdownIcon: {
        "iconClass": "<string>",
        "tooltip": "<string>"
    },
    selectData: [
        {
            "text": "<string>",
            "value": "<number>"
        }
    ]
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]

const fakeSelectDefault = ""
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdFakeSelect labelText="Labeltext for selectbox:"
                           :status="formElementStatus"
                           :selectData="fakeSelectOptionsData"
                           v-model:value="fakeSelectDefault"
                           required
                           defaultOptionName="Select an option:" />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdFakeSelect.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>