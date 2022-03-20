<script setup>
import {ref} from "vue"
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"


import CmdSiteHeader from "../../components/CmdSiteHeader"
import CmdCompanyLogo from "../../components/CmdCompanyLogo"
import CmdListOfLinks from "../../components/CmdListOfLinks"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdSiteHeaderHelp"

import mainNavigation from '../../assets/data/main-navigation'
import listOfLinks from '../../assets/data/list-of-links-top-header-navigation'
import companyLogo from '../../assets/data/company-logo'
import propertyDescriptions from "../generated/CmdSiteHeaderPropertyDescriptions"

const propertyStructures = {
    mainNavigationEntries: [
        {
            "name": "<string>",
            "href": "<string>",
            "target": "<string>",
            "subentries": [
                {
                    "name": "<string>",
                    "href": "<string>",
                    "target": "<string>"
                }
            ]
        }
    ]
}

const navigationEntries = ref(mainNavigation)
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdSiteHeader :cmdMainNavigation="{navigationEntries}" :sticky="true">
                        <template v-slot:top-header>
                            <CmdListOfLinks
                                :links="listOfLinks"
                                orientation="horizontal"
                                align="right"
                            />
                        </template>
                        <template v-slot:logo>
                            <CmdCompanyLogo
                                :link="companyLogo.link"
                                altText="CoManD Logo"
                                :pathDefaultLogo="require('@/assets/images/logo.svg')"
                                :pathDarkmodeLogo="require('@/assets/images/logo-darkmode.svg')"
                            />
                        </template>
                    </CmdSiteHeader>
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdSiteHeader.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>