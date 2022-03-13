<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdTable from "../../components/CmdTable"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdTableHelp"
import tableSmall from "../../assets/data/table-small"
import tableLarge from "../../assets/data/table-large"
import propertyDescriptions from "../generated/CmdTablePropertyDescriptions"

const propertyStructures = {
    tableData: {
        "caption": {
            "hide": "<boolean>",
            "text": "<string>"
        },
        "thead": "<array>",
        "tbody": [
            "<array>"
        ],
        "tfoot": "<array>"
    },
    fullWidthOnDefault: {
        show: "<boolean>",
        iconClass: "<string>"
    },
    iconExpand: {
        iconClass: "<string>",
        tooltip: "<string>"
    },
    iconCollapse: {
        iconClass: "<string>",
        tooltip: "<string>"
    },
    iconShrink: {
        iconClass: "<string>",
        tooltip: "<string>"
    },
    iconStretch: {
        iconClass: "<string>",
        tooltip: "<string>"
    }
}
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdTable
                        :collapsible="true"
                        :fullWidthOnDefault="false"
                        :userCanToggleWidth="true"
                        :table-data="tableSmall"
                    />
                </teleport>
            </ViewCodeData>
            <ViewCodeData :code="CmdCode">
                <CmdTable
                    :collapsible="false"
                    :fullWidthOnDefault="false"
                    :userCanToggleWidth="false"
                    :table-data="tableLarge"
                />
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdTable.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>