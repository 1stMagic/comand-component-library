<script setup>
// import functions
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdShareButtons from "../../components/CmdShareButtons"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCustomHeadline from "../../components/CmdCustomHeadline"

// import example-data
import CmdCode from "../data/CmdShareButtonsHelp"
import shareButtonsJson from '../../assets/data/share-buttons-page-by-json'
import shareButtonsPage from '../../assets/data/share-buttons-page-by-property'
import propertyDescriptions from "../generated/CmdShareButtonsPropertyDescriptions"

const propertyStructures = {
    shareButtons: [
        {
            "id": "<string>",
            "path": "<string>",
            "tooltip": "<string>",
            "iconClass": "<string>",
            "linkText": "<string>"
        }
    ]
}
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <CmdCustomHeadline headlineText="Data given by json-file" :headlineLevel="3" preHeadlineText="Example #1" />
            <ViewCodeData :isFirstComponent="true" :code="CmdCode[0]" :data="shareButtonsJson">
                <teleport to="#frame-component-target" :disabled="!isFrameMode()">
                    <CmdShareButtons
                        :append-page="false"
                        :share-buttons="shareButtonsJson"
                    />
                </teleport>
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline headlineText="Page given by property" :headlineLevel="3" preHeadlineText="Example #2" />
            <ViewCodeData :code="CmdCode[1]" :data="shareButtonsPage">
                    <CmdShareButtons
                        page="some url"
                        :share-buttons="shareButtonsPage"
                    />
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline headlineText="Page taken from browser" headlineLevel="3" preHeadlineText="Example #3" />
            <ViewCodeData :code="CmdCode[2]" :data="shareButtonsPage">
                    <CmdShareButtons
                        :share-buttons="shareButtonsPage"
                    />
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdShareButtons.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>