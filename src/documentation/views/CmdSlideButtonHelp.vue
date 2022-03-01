<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdSlideButton from "../../components/CmdSlideButton"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdSlideButtonHelp"
import propertyDescriptions from "../generated/CmdSlideButtonPropertyDescriptions"

const propertyStructures = {
    slideButtons: {
        prev: {
            iconClass: "<string>",
            tooltip: "<string>"
        },
        next: {
            iconClass: "<string>",
            tooltip: "<string>"
        }
    }
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
                    <CmdSlideButton slideButtonType="prev"/>
                    <CmdSlideButton slideButtonType="next"/>
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                </div>
            </div>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdSlideButton.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>