<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdBreadcrumbs from "../../components/CmdBreadcrumbs"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import breadcrumbs from '../../assets/data/breadcrumbs'
import CmdCode from "../data/CmdBreadcrumbsHelp"
import propertyDescriptions from "../generated/CmdBreadcrumbsPropertyDescriptions"

const propertyStructures = {
    breadcrumbLinks: {
        "address": {
            "streetNo": "<string>",
            "zip": "<number>",
            "city": "<string>"
        },
        "telephone": "<string>",
        "mobilephone": "<string>",
        "fax": "<string>",
        "email": "<string>"
    }
}
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode" :data="breadcrumbs">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
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