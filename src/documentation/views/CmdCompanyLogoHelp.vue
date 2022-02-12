<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdCompanyLogo from "../../components/CmdCompanyLogo"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdCompanyLogoHelp"

const props = defineProps(commonProps)
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="[{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]" :useSlot="true" :activeTab="props.activeTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdCompanyLogo :link="companyLogoData.link" altText="CoManD Logo" :pathDefaultLogo="require('@/assets/images/logo.svg')" :pathDarkmodeLogo="require('@/assets/images/logo-darkmode.svg')"/>
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre><code>{{ CmdCode }}</code></pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdCompanyLogo.props" />
        </template>
    </CmdTabs>
</template>