<script setup>
// import functions
import {ref} from "vue"
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdMainNavigation from "../../components/CmdMainNavigation"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"

// import example-data
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

// use ref and assign to const to make reactive
const navigationEntries = ref(mainNavigation)
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode[0]" :data="navigationEntries">
                <teleport to="#frame-component-target" :disabled="!isFrameMode()">
                    <CmdMainNavigation
                        :stretchMainItems="false"
                        :persistOnMobile="false"
                        :navigationEntries="navigationEntries"
                    />
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdMainNavigation.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>

<style lang="scss">
@import '../../assets/styles/variables';

main#cmd-main-navigation {
    padding: 0;

    @media only screen and (max-width: $medium-max-width) {
        #toggle-offcanvas {
            margin-top: var(--default-margin);
        }
    }
}
</style>