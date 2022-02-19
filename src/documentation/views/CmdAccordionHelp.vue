<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdAccordion from "../../components/CmdAccordion"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdAccordionHelp"

const props = defineProps(commonProps)

const propertyDescriptions = {
    accordionData: "Description for property",
    accordionHeadlineLevel: "Description for property",
    gapBetween: "Description for property",
    iconClosed: "Description for property",
    iconOpen: "Description for property",
    toggleMode: "Description for property",
    useCustomHeader: "Description for property",
    useTransition: "Description for property"
}
const propertyStructures = {
    accordionData: [
        {
            "headline": "<string>",
            "icon": {
                "iconClass": "<string>",
                "tooltip": "<string>"
            },
            "content": "<string>",
            "status": "<boolean>"
        }
    ],
    accordionHeadlineLevel: "-",
    gapBetween: "-",
    iconClosed: {
        "iconClass": "<string>",
        "tooltip": "<string>"
    },
    iconOpen: {
        "iconClass": "<string>",
        "tooltip": "<string>"
    },
    toggleMode: "-",
    useCustomHeader: "-",
    useTransition: "-"
}

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdAccordion headline="Accordion headline" :accordionData="2">
                <template v-slot:accordionHeadline0>
                    <h3><span class="icon-user-group"></span><span>User groups1</span></h3>
                </template>
                <template v-slot:accordionContent0>
                    <p>
                        Content1
                    </p>
                </template>
                <template v-slot:accordionHeadline1>
                    <h3><span class="icon-user-group"></span><span>User groups2</span></h3>
                </template>
                <template v-slot:accordionContent1>
                    <p>
                        Content2
                    </p>
                </template>
            </CmdAccordion>
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre><code>{{ CmdCode }}</code></pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdAccordion.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
        <template v-slot:tab-content-3>
            <ComponentProperties :properties="CmdAccordion.props" />
        </template>
    </CmdTabs>
</template>