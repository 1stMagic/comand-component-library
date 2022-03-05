<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdBackToTopButton from "../../components/CmdBackToTopButton"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdBackToTopButtonHelp"
import propertyDescriptions from "../generated/CmdBackToTopButtonPropertyDescriptions"

const propertyStructures = {
    iconBackToTop: {
        "iconBackToTop": {
            "iconClass": "<string>",
            "tooltip": "<number>"
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
                    <CmdBackToTopButton id="view-component" />
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode" />
                </div>
                <div>
                    <h3>Data</h3>

                </div>
            </div>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdBackToTopButton.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>

<style lang="scss">
#view-component {
    position: relative;
    bottom: auto;
    left: 0;
    right: auto;
}
</style>