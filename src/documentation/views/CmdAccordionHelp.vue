<script setup>
// import functions
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdAccordion from "../../components/CmdAccordion"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdCustomHeadline from "../../components/CmdCustomHeadline"
import CmdTabs from "../../components/CmdTabs"

// import example-data
import CmdCode from "../data/CmdAccordionHelp"
import accordion from '../../assets/data/accordion'
import propertyDescriptions from "../generated/CmdAccordionPropertyDescriptions"

const propertyStructures = {
    accordionData: [
        {
            "headline": "<string>",
            "icon": {
                "iconClass": "<string>",
                "tooltip": "<string>"
            },
            "content": "<string>",
            "status": "<boolean>"
        }
    ],
    iconClosed: {
        "iconClass": "<string>",
        "tooltip": "<string>"
    },
    iconOpen: {
        "iconClass": "<string>",
        "tooltip": "<string>"
    }
}
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <CmdCustomHeadline preHeadlineText="Example #1" headlineText="Content given by slot" :headlineLevel="3" />
            <ViewCodeData :isFirstComponent="true" :code="CmdCode[0]">
                <teleport to="#frame-component-target" :disabled="!isFrameMode()">
                    <CmdAccordion :accordionData="2" toggleMode="multiple">
                        <template v-slot:accordionHeadline0>
                            <h4>Accordion 1</h4>
                        </template>
                        <template v-slot:accordionContent0>
                            <p>
                                Content for accordion 1
                            </p>
                        </template>
                        <template v-slot:accordionHeadline1>
                            <h4>Accordion 2</h4>
                        </template>
                        <template v-slot:accordionContent1>
                            <p>
                                Content for accordion 2
                            </p>
                        </template>
                    </CmdAccordion>
                </teleport>
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline preHeadlineText="Example #2" headlineText="Content given by json-file" :headlineLevel="3" />
            <ViewCodeData :code="CmdCode[1]" :data="accordion.accordionData1">
                <CmdAccordion :accordionData="accordion.accordionData1" />
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdAccordion.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>