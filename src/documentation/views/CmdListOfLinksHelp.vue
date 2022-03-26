<script setup>
// import functions
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdListOfLinks from "../../components/CmdListOfLinks"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCustomHeadline from "../../components/CmdCustomHeadline"

// import example-data
import CmdCode from "../data/CmdListOfLinksHelp"
import listOfLinks from "../../assets/data/list-of-links"
import listOfLinksSectionAnchors from "../../assets/data/list-of-links-section-anchors"
import propertyDescriptions from "../generated/CmdListOfLinksPropertyDescriptions"

const propertyStructures = {
    listOfLinks: [
        {
            "iconClass": "<string>",
            "type": "<string>",
            "text": "<string>",
            "path": "<string>",
            "target": "<string>",
            "tooltip": "<string>",
            "fancybox": "<boolean>"
        }
    ]
}
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <CmdCustomHeadline headlineText="Vertical" :headlineLevel="3" preHeadlineText="Example #1" />
            <ViewCodeData :isFirstComponent="true" :code="CmdCode[0]" :data="listOfLinks">
                <teleport to="#frame-component-target" :disabled="!isFrameMode()">
                    <CmdListOfLinks :links="listOfLinks" :cmdCustomHeadline="{headlineText: 'Links', headlineLevel: 5}" />
                </teleport>
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline headlineText="Horizontal" :headlineLevel="3" preHeadlineText="Example #2" />
            <ViewCodeData :code="CmdCode[1]" :data="listOfLinks">
                <CmdListOfLinks :links="listOfLinks" orientation="horizontal" :cmdCustomHeadline="{headlineText: 'Links', headlineLevel: 5}" />
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline headlineText="Styled as box" :headlineLevel="3" preHeadlineText="Example #3" />
            <ViewCodeData :code="CmdCode[2]" :data="listOfLinks">
                <CmdListOfLinks :links="listOfLinks" :styleAsBox="true" :cmdCustomHeadline="{headlineText: 'Links', headlineLevel: 5}" />
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline headlineText="Use as section anchors" :headlineLevel="3" preHeadlineText="Example #4" />
            <ViewCodeData :code="CmdCode[2]" :data="listOfLinksSectionAnchors">
                <CmdListOfLinks :links="listOfLinksSectionAnchors" :sectionAnchors="true" />
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdListOfLinks.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>