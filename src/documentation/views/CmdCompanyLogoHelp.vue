<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdCompanyLogo from "../../components/CmdCompanyLogo"
import ComponentProperties from "../components/ComponentProperties"
import companyLogoData from '../../assets/data/company-logo'
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdCompanyLogoHelp"
import propertyDescriptions from "../generated/CmdCompanyLogoPropertyDescriptions"

const propertyStructures = {
    link: {
        "type": "<string>",
        "path": "<string>",
        "tooltip": "<string>"
    }
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdCompanyLogo
                :link="companyLogoData.link"
                altText="CoManD Logo"
                :pathDefaultLogo="require('@/assets/images/logo.svg')"
                :pathDarkmodeLogo="require('@/assets/images/logo-darkmode.svg')"
            />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdCompanyLogo.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>