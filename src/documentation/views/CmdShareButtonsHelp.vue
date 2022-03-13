<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdShareButtons from "../../components/CmdShareButtons"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdShareButtonsHelp"
import shareButtons from '../../assets/data/share-buttons'
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
            <ViewCodeData :isFirstComponent="true" :code="CmdCode" :data="shareButtons">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdShareButtons
                        :share-buttons="shareButtons"
                    />
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdShareButtons.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>