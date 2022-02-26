<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdAccordion from "../../components/CmdAccordion"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdAccordionHelp"
import propertyDescriptions from "../generated/CmdAccordionPropertyDescriptions"

const props = defineProps(commonProps)

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
    iconClosed: {
        "iconClass": "<string>",
        "tooltip": "<string>"
    },
    iconOpen: {
        "iconClass": "<string>",
        "tooltip": "<string>"
    }
}

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
// const url = new URL(location)
// const showiframe = !url.searchParams.has("iframe")
// url.searchParams.set("iframe", "true")
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <!--
            <iframe v-if="showiframe" :src="url.href" style="border: 1px solid red; width: 1023px;"></iframe>
            -->
            <div class="flex-container">
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
                <div>
                    <ComponentCode :code="CmdCode" />
                </div>
            </div>

        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <ComponentCode :code="CmdCode" />
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdAccordion.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
        <template v-slot:tab-content-3>
            <ComponentProperties :properties="CmdAccordion.props" />
        </template>
    </CmdTabs>
</template>