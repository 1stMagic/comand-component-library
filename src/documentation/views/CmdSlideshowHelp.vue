<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdSlideshow from "../../components/CmdSlideshow"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdSlideshowHelp"
import slideshowData from "../../assets/data/slideshow"
import propertyDescriptions from "../generated/CmdSlideshowPropertyDescriptions"

const propertyStructures = {
    slideshowItems: [{
            "images": [
                {
                    "maxWidth": "<number>",
                    "imgPath": "<string>"
                },
                {
                    "imgPath": "<string>",
                    "maxWidth": "<number>"
                },
                {
                    "imgPath": "<string>"
                }
            ],
            "alt": "<string>",
            "href": "<string>",
            "title": "<string>",
            "target": "<string>",
            "figcaption": "<string>"
        }
    ]
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdSlideshow
                :slideshow-items="slideshowData"
                :showCounter="true"
                :autoplay="true"
            />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdSlideshow.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>