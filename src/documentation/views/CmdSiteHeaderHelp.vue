<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdSiteHeader from "../../components/CmdSiteHeader"
import CmdCompanyLogo from "../../components/CmdCompanyLogo"
import CmdTopHeaderNavigation from "../../components/CmdTopHeaderNavigation"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdSiteHeaderHelp"
import mainNavigation from '../../assets/data/main-navigation'
import topHeaderNavigation from '../../assets/data/top-header-navigation'
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




</script>

<template>
    <CmdTabs v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdSiteHeader :mainNavigationEntries="mainNavigation" :sticky="true">
                        <template v-slot:top-header>
                            <CmdTopHeaderNavigation
                                :topHeaderNavigationData="topHeaderNavigation"
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
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode" />
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="mainNavigation" language="json" />
                </div>
            </div>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdSiteHeader.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>