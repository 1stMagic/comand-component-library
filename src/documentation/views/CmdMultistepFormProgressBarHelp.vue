<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdMultistepFormProgressBar from "../../components/CmdMultistepFormProgressBar"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdMultistepFormProgressBarHelp"
import multistepFormProgressBar from '../../assets/data/multistep-form-progress-bar'
import propertyDescriptions from "../generated/CmdMultistepFormProgressBarPropertyDescriptions"

const propertyStructures = {
    multisteps: [
        {
            "path": "<string>",
            "name": "<string>",
            "iconClass": "<string>"
        }
    ]
}
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode" :data="multistepFormProgressBar">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                <CmdMultistepFormProgressBar
                    :multisteps="multistepFormProgressBar"
                    separatorIconClass="icon-single-arrow-right"
                    @click="showPageMultistep = $event.index + 1"
                />
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdMultistepFormProgressBar.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>