<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdMainNavigation from "../../components/CmdMainNavigation"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdMainNavigationHelp"
import mainNavigation from '../../assets/data/main-navigation'
import propertyDescriptions from "../generated/CmdMainNavigationPropertyDescriptions"

const propertyStructures = {
    closeOffcanvas: {
        iconClass: "<string>",
        text: "<string>",
        showText: "<boolean>"
    },
    buttonOffcanvas: {
        iconClass: "<string>",
        text: "<string>",
        showText: "<boolean>"
    },
    navigationEntries: {
        "name": "<string>",
        "href": "<string>",
        "target": "<string>",
        "subentries": [
            {
                "name": "<string>",
                "href": "<string>",
                "target": "<string>",
                "subentries": "<array>"
            }
        ]
    },
    subentriesIconClass: {
        labelText: "<string>",
        placeholder: "<string>",
        innerIconClass: "<string>",
        name: "<string>",
        id: "<string>"
    },
    subSubentriesIconClass: {
        labelText: "<string>",
        placeholder: "<string>",
        innerIconClass: "<string>",
        name: "<string>",
        id: "<string>"
    }
}
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdMainNavigation
                        :stretchMainItems="false"
                        :persistOnMobile="false"
                        :navigationEntries="mainNavigation"
                    />
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdMainNavigation.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>