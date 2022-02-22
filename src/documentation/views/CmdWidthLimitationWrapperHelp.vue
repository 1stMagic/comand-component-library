<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdWidthLimitationWrapper from "../../components/CmdWidthLimitationWrapper"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdWidthLimitationWrapperHelp"
import propertyDescriptions from "../generated/CmdWidthLimitationWrapperPropertyDescriptions"

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdWidthLimitationWrapper>
                <!-- begin slot-content -->
                Content
                <!-- end slot-content -->
            </CmdWidthLimitationWrapper>
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdWidthLimitationWrapper.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>

<style lang="scss">
.cmd-width-limitation-wrapper {
    border: var(--default-border);
    border-style: dotted;

    > section {
       border: inherit;
    }
}
</style>