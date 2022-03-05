<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdCompanyLogo from "../../components/CmdCompanyLogo"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
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
    <CmdTabs v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
           <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdCompanyLogo
                        :link="companyLogo.link"
                        altText="CoManD Logo"
                        :pathDefaultLogo="require('@/assets/images/logo.svg')"
                        :pathDarkmodeLogo="require('@/assets/images/logo-darkmode.svg')"
                    />
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="companyLogo" language="json"/>
                </div>
            </div>
        </template>

        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdCompanyLogo.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>