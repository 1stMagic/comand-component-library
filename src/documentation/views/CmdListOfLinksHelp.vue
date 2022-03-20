<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdListOfLinks from "../../components/CmdListOfLinks"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCustomHeadline from "../../components/CmdCustomHeadline"
import CmdCode from "../data/CmdListOfLinksHelp"
import listOfLinks from "../../assets/data/list-of-links"
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
            <ViewCodeData :isFirstComponent="true" :code="CmdCode" :data="listOfLinks">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdListOfLinks :links="listOfLinks" :cmdCustomHeadline="{headlineText: 'Links', headlineLevel: 4}" />
                </teleport>
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline headlineText="Horizontal" :headlineLevel="3" preHeadlineText="Example #2" />
            <ViewCodeData :code="CmdCode" :data="listOfLinks">
                <CmdListOfLinks :links="listOfLinks" orientation="horizontal" :cmdCustomHeadline="{headlineText: 'Links', headlineLevel: 4}" />
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline headlineText="Styled as box" :headlineLevel="3" preHeadlineText="Example #3" />
            <ViewCodeData :code="CmdCode" :data="listOfLinks">
                <CmdListOfLinks :links="listOfLinks" :styleAsBox="true" :cmdCustomHeadline="{headlineText: 'Links', headlineLevel: 4}" />
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdListOfLinks.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>