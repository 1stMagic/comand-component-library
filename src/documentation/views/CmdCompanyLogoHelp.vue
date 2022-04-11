<script setup>
// import functions
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdCompanyLogo from "../../components/CmdCompanyLogo"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import ViewCodeData from "../components/ViewCodeData"
import ExampleSectionWrapper from "../components/ExampleSectionWrapper"

// import example-data
import companyLogo from '../../assets/data/company-logo'
import CmdCode from "../data/CmdCompanyLogoHelp"
import propertyDescriptions from "../generated/CmdCompanyLogoPropertyDescriptions"

const propertyStructures = {
    link: {
        "type": "<string>",
        "path": "<string>",
        "tooltip": "<string>"
    }
}
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <ExampleSectionWrapper componentName="CmdCompanyLogo" headlineText="Company Logo">
                <ViewCodeData :isFirstComponent="true" :code="CmdCode[0]" :data="companyLogo">
                    <teleport to="#frame-component-target" :disabled="!isFrameMode()">
                        <CmdCompanyLogo
                            :link="companyLogo.link"
                            altText="CoManD Logo"
                            :pathDefaultLogo="require('@/assets/images/logo.svg')"
                            :pathDarkmodeLogo="require('@/assets/images/logo-darkmode.svg')"
                        />
                    </teleport>
                </ViewCodeData>
            </ExampleSectionWrapper>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdCompanyLogo.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>