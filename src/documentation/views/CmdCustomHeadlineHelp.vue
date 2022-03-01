<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
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

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
           <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdCustomHeadline :headline="{text: 'Headline given by property', level: '3'}" preHeadline="Pre-headline" iconClass="icon-user-profile" />
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