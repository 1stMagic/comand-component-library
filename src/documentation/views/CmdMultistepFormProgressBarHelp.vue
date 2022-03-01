<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdMultistepFormProgressBar from "../../components/CmdMultistepFormProgressBar"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdMultistepFormProgressBarHelp"
import multistepFormProgressBar from '../../assets/data/multistep-form-progress-bar'
import propertyDescriptions from "../generated/CmdMultistepFormProgressBarPropertyDescriptions"

const propertyStructures = {
    multisteps: [
        {
            "path": "<string>",
            "name": "<string>",
            "iconClass": "<string>"
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
                    <CmdMultistepFormProgressBar
                        :multisteps="multistepFormProgressBar"
                        separatorIconClass="icon-single-arrow-right"
                        @click="showPageMultistep = $event.index + 1"
                    />
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="multistepFormProgressBar" language="json"/>
                </div>
            </div>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdMultistepFormProgressBar.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>