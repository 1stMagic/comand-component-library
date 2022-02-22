<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdForm from "../../components/CmdForm"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdFormHelp"
import propertyDescriptions from "../generated/CmdFormPropertyDescriptions"

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdForm
                :use-fieldset="true"
                id="advanced-form-elements"
                novalidate="novalidate"
                text-legend="Legend">
                <!-- begin slot-content -->
                Content
                <!-- end slot-content -->
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