<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdCustomHeadline from "../../components/CmdCustomHeadline"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdCustomHeadlineHelp"
import propertyDescriptions from "../generated/CmdCustomHeadlinePropertyDescriptions"

const propertyStructures = {
    headline: {
        "text": "<string>",
        "level": "<number>",
    }
}




</script>

<template>
    <CmdTabs v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
           <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdCustomHeadline :headline="{text: 'Headline level 1', level: '1'}" preHeadline="Pre-headline" iconClass="icon-user-profile" />
                    <CmdCustomHeadline :headline="{text: 'Headline level 1', level: '1'}" iconClass="icon-user-profile" />
                    <CmdCustomHeadline :headline="{text: 'Headline level 1', level: '1'}" />
                    <CmdCustomHeadline :headline="{text: 'Headline level 2', level: '2'}" />
                    <CmdCustomHeadline :headline="{text: 'Headline level 3', level: '3'}" />
                    <CmdCustomHeadline :headline="{text: 'Headline level 4', level: '4'}" />
                    <CmdCustomHeadline :headline="{text: 'Headline level 5', level: '5'}" />
                    <CmdCustomHeadline :headline="{text: 'Headline level 6', level: '6'}" />
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                </div>
            </div>
        </template>

        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdCustomHeadline.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>