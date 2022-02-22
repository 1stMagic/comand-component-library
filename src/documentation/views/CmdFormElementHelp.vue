<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdFormElement from "../../components/CmdFormElement"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdFormElementHelp"
import propertyDescriptions from "../generated/CmdFormElementPropertyDescriptions"

const propertyStructures = {
    datalist: {
        "id": "<string>",
        "options": "<array>"
    },
    nativeButton: {
        "text": "<string>",
        "icon": {
            "show": "<boolean>",
            "iconClass": "<string>",
            "position": "<string>",
            "tooltip": "<string>"
        }
    },
    selectOptions: [
        {
            "text": "<string>",
            "value": "<string>"
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
            <CmdFormElement
                labelText="Input (type text):"
                element="input"
                type="text"
                :status="formElementStatus"
                placeholder="Type in text"
                tooltipText="This is a tooltip"
                v-bind="{useCustomTooltip: false}"
            />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdFormElement.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>