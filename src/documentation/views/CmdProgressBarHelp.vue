<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdProgressBar from "../../components/CmdProgressBar"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCustomHeadline from "../../components/CmdCustomHeadline"
import CmdCode from "../data/CmdProgressBarHelp"
import propertyDescriptions from "../generated/CmdProgressBarPropertyDescriptions"
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <CmdCustomHeadline headlineText="Progress Bar with output" :headlineLevel="3" preHeadlineText="Example #1" />
            <ViewCodeData :isFirstComponent="true" :code="CmdCode">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                <CmdProgressBar
                    labelText="Progress Bar with output:"
                    id="progress-bar"
                    max="100"
                />
                </teleport>
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline headlineText="Progress Bar without output" :headlineLevel="3" preHeadlineText="Example #2" />
            <ViewCodeData :code="CmdCode">
                <CmdProgressBar
                    labelText="Progress Bar without output:"
                    :showLoadingStatus="false"
                    id="progress-bar"
                    max="100"
                />
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdProgressBar.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>