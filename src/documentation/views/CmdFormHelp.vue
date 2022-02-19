<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdForm from "../../components/CmdForm"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdFormHelp"

const propertyDescriptions = {
    showLegend: "Description for property",
    textLegend: "Description for property",
    useFieldset: "Description for property",
    useValidation: "Description for property"
}
const propertyStructures = {
    showLegend: "-",
    textLegend: "-",
    useFieldset: "-",
    useValidation: "-"
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdForm :use-fieldset="true" id="advanced-form-elements" novalidate="novalidate" text-legend="Legend">
                Content
            </CmdForm>
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdForm.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>