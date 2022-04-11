<script setup>
// import functions
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdForm from "../../components/CmdForm"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import ExampleSectionWrapper from "../components/ExampleSectionWrapper"

// import example-data
import CmdCode from "../data/CmdFormHelp"
import propertyDescriptions from "../generated/CmdFormPropertyDescriptions"
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <ExampleSectionWrapper componentName="CmdForm" headlineText="Form">
                <ViewCodeData :isFirstComponent="true" :code="CmdCode[0]">
                    <teleport to="#frame-component-target" :disabled="!isFrameMode()">
                        <CmdForm
                            :use-fieldset="true"
                            novalidate="novalidate"
                            text-legend="Legend">
                            <!-- begin slot-content -->
                            Form content (put form elements here)
                            <!-- end slot-content -->
                        </CmdForm>
                    </teleport>
                </ViewCodeData>
            </ExampleSectionWrapper>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdForm.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>