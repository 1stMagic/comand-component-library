<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdSiteHeader from "../../components/CmdSiteHeader"
import CmdCompanyLogo from "../../components/CmdCompanyLogo"
import CmdTopHeaderNavigation from "../../components/CmdTopHeaderNavigation"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdSiteHeaderHelp"
import navigationData from '../../assets/data/main-navigation'
import topHeaderNavigationData from '../../assets/data/top-header-navigation'
import companyLogoData from '../../assets/data/company-logo'

const propertyDescriptions = {
    mainNavigationEntries: "Description for property",
    sticky: "Description for property"
}
const propertyStructures = {
    mainNavigationEntries: {
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
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdSiteHeader :mainNavigationEntries="navigationData" :sticky="true">
                <template v-slot:top-header>
                    <CmdTopHeaderNavigation
                        :topHeaderNavigationData="topHeaderNavigationData"
                    />
                </template>
                <template v-slot:logo>
                    <CmdCompanyLogo
                        :link="companyLogoData.link"
                        altText="CoManD Logo"
                        :pathDefaultLogo="require('@/assets/images/logo.svg')"
                        :pathDarkmodeLogo="require('@/assets/images/logo-darkmode.svg')"
                    />
                </template>
            </CmdSiteHeader>
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdSiteHeader.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>