<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdCompanyLogo from "../../components/CmdCompanyLogo"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
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
            <ViewCodeData :isFirstComponent="true" :code="CmdCode">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdCompanyLogo
                        :link="companyLogo.link"
                        altText="CoManD Logo"
                        :pathDefaultLogo="require('@/assets/images/logo.svg')"
                        :pathDarkmodeLogo="require('@/assets/images/logo-darkmode.svg')"
                    />
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdCompanyLogo.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>