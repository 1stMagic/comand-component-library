<script setup>
import {tabProps, tabHandlers} from "../tabs"
import CmdForm from "../../components/CmdForm"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdFormHelp"
import propertyDescriptions from "../generated/CmdFormPropertyDescriptions"
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdForm
                        :use-fieldset="true"
                        id="advanced-form-elements"
                        novalidate="novalidate"
                        text-legend="Legend">
                        <!-- begin slot-content -->
                        Form content (put form elements here)
                        <!-- end slot-content -->
                    </CmdForm>
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdForm.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>