<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdAccordion from "../../components/CmdAccordion"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdAccordionHelp"
import accordion from '../../assets/data/accordion'
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

const tabs = [{name: 'View'}, {name: 'Properties'}]
// const url = new URL(location)
// const showiframe = !url.searchParams.has("iframe")
// url.searchParams.set("iframe", "true")
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <!--
                    <iframe v-if="showiframe" :src="url.href" style="border: 1px solid red; width: 1023px;"></iframe>
                    -->
                    <div class="flex-container">
                        <CmdAccordion headline="Accordion headline" :accordionData="2">
                            <template v-slot:accordionHeadline0>
                                <h3>Accordion 1</h3>
                            </template>
                            <template v-slot:accordionContent0>
                                <p>
                                    Content1
                                </p>
                            </template>
                            <template v-slot:accordionHeadline1>
                                <h3>Accordion 2</h3>
                            </template>
                            <template v-slot:accordionContent1>
                                <p>
                                    Content2
                                </p>
                            </template>
                        </CmdAccordion>

                        <CmdAccordion headline="Accordion headline" :accordionData="accordion" />
                    </div>
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="accordion" language="json"/>
                </div>
            </div>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdAccordion.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>