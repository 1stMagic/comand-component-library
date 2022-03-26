<script setup>
// import functions
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdTable from "../../components/CmdTable"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCustomHeadline from "../../components/CmdCustomHeadline"

// import example-data
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
            <h2>Component</h2>
            <CmdCustomHeadline headlineText="Table (with few data)" :headlineLevel="3" preHeadlineText="Example #1" />
            <ViewCodeData :isFirstComponent="true" :code="CmdCode[0]">
                <teleport to="#frame-component-target" :disabled="!isFrameMode()">
                    <CmdTable
                        :collapsible="true"
                        :fullWidthOnDefault="false"
                        :userCanToggleWidth="true"
                        :table-data="tableSmall"
                    />
                </teleport>
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline headlineText="Table (with lots of data and highlighted row and column)" :headlineLevel="3" preHeadlineText="Example 2" />
            <ViewCodeData :code="CmdCode[1]">
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