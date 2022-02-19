<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdFormElement from "../../components/CmdFormElement"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdFormElementHelp"

const propertyDescriptions = {
    labelText: "Description for property",
    element: "Description for property",
    type: "Description for property",
    status: "Description for property",
    placeholder: "Description for property",
    tooltipText: "Description for property",
    colored: "Description for property",
    datalist: "Description for property",
    displayLabelInline: "Description for property",
    id: "Description for property",
    fieldIconClass: "Description for property",
    hideLabel: "Description for property",
    htmlClass: "Description for property",
    inputValue: "Description for property",
    nativeButton: "Description for property",
    offLabel: "Description for property",
    onLabel: "Description for property",
    showCharactersTextarea: "Description for property",
    toggleSwitch: "Description for property",
    replaceInputType: "Description for property",
    selectOptions: "Description for property",
    value: "Description for property"

}
const propertyStructures = {
    labelText: "-",
    element: "-",
    type: "-",
    status: "-",
    placeholder: "-",
    tooltipText: "-",
    colored: "-",
    datalist: {
        "id": "<string>",
        "options": "<array>"
    },
    displayLabelInline: "-",
    id: "-",
    fieldIconClass: "-",
    hideLabel: "-",
    htmlClass: "-",
    inputValue: "-",
    nativeButton: {
        "text": "<string>",
        "icon": {
            "show": "<boolean>",
            "iconClass": "<string>",
            "position": "<string>",
            "tooltip": "<string>"
        }
    },
    offLabel: "-",
    onLabel: "-",
    showCharactersTextarea: "-",
    toggleSwitch: "-",
    replaceInputType: "-",
    selectOptions: [
        {
            "text": "<string>",
            "value": "<string>"
        }
    ],
    value: "-"
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdFormElement labelText="Input (type text):"
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