<script setup>
// import functions
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdCustomHeadline from "../../components/CmdCustomHeadline"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"

// import data
import CmdCode from "../data/CmdCustomHeadlineHelp"
import propertyDescriptions from "../generated/CmdCustomHeadlinePropertyDescriptions"
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdCustomHeadline headlineText="Headline level 1"  :headlineLevel="1" preHeadlineText="Pre-headline text" iconClass="icon-user-profile" />
                    <CmdCustomHeadline headlineText="Headline level 1"  :headlineLevel="1" iconClass="icon-user-profile" />
                    <CmdCustomHeadline headlineText="Headline level 1"  :headlineLevel="1" />
                    <CmdCustomHeadline headlineText="Headline level 2"  :headlineLevel="2" />
                    <CmdCustomHeadline headlineText="Headline level 3"  :headlineLevel="3" />
                    <CmdCustomHeadline headlineText="Headline level 4"  :headlineLevel="4" />
                    <CmdCustomHeadline headlineText="Headline level 5"  :headlineLevel="5" />
                    <CmdCustomHeadline headlineText="Headline level 6"  :headlineLevel="6" />
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdCustomHeadline.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>