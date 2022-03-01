<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdFakeSelect from "../../components/CmdFakeSelect"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdFakeSelectHelp"
import fakeSelectOptions from "../../assets/data/fake-select-options"
import propertyDescriptions from "../generated/CmdFakeSelectPropertyDescriptions"

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

const tabs = [{name: 'View'}, {name: 'Properties'}]

const fakeSelectDefault = ""
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
           <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdFakeSelect
                        labelText="Labeltext for selectbox:"
                        :status="formElementStatus"
                        :selectData="fakeSelectOptions"
                        v-model:value="fakeSelectDefault"
                        required
                        defaultOptionName="Select an option:"
                    />
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="fakeSelectOptions" language="json"/>
                </div>
            </div>
        </template>

        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdFakeSelect.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>