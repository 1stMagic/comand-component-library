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
            <CmdCustomHeadline :headline="{text: 'Vertical', level: 2}" pre-headline="Example #1" />
            <ViewCodeData :isFirstComponent="true" :code="CmdCode" :data="listOfLinks">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdListOfLinks :links="listOfLinks" :cmdCustomHeadline="{text: 'Links', level: 4}" />
                </teleport>
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline :headline="{text: 'Horizontal', level: 2}" pre-headline="Example #2" />
            <ViewCodeData :code="CmdCode" :data="listOfLinks">
                <CmdListOfLinks :links="listOfLinks" orientation="horizontal" :cmdCustomHeadline="{text: 'Links', level: 4}" />
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline :headline="{text: 'Styled as box', level: 2}" pre-headline="Example #3" />
            <ViewCodeData :code="CmdCode" :data="listOfLinks">
                <CmdListOfLinks :links="listOfLinks" :styleAsBox="true" :cmdCustomHeadline="{text: 'Links', level: 4}" />
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdListOfLinks.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>