<script setup>
// import functions
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdBreadcrumbs from "../../components/CmdBreadcrumbs"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"

// import example-data
import breadcrumbs from '../../assets/data/breadcrumbs'
import CmdCode from "../data/CmdBreadcrumbsHelp"
import propertyDescriptions from "../generated/CmdBreadcrumbsPropertyDescriptions"

const propertyStructures = {
    breadcrumbLinks: {
        "text": "<string>",
        "type": "<string>",
        "path": "<string>",
        "route": {
            "params": {
                "lang": "<string>"
            }
        }
    }
}
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode[0]" :data="breadcrumbs">
                <teleport to="#frame-component-target" :disabled="!isFrameMode()">
                    <CmdBreadcrumbs
                        :breadcrumbLinks="breadcrumbs"
                        breadcrumbLabel="You are here:"
                    />
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdBreadcrumbs.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>