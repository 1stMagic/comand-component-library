<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdShareButtons from "../../components/CmdShareButtons"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdShareButtonsHelp"
import shareButtons from '../../assets/data/share-buttons'
import propertyDescriptions from "../generated/CmdShareButtonsPropertyDescriptions"

const propertyStructures = {
    shareButtons: [
        {
            "id": "<string>",
            "path": "<string>",
            "tooltip": "<string>",
            "iconClass": "<string>",
            "linkText": "<string>"
        }
    ]
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdShareButtons
                        :share-buttons="shareButtons"
                    />
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="shareButtons" language="json"/>
                </div>
            </div>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdShareButtons.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>