<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdThumbnailScroller from "../../components/CmdThumbnailScroller"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdThumbnailScrollerHelp"
import thumbnailScrollerData from "../../assets/data/thumbnail-scroller"
import propertyDescriptions from "../generated/CmdThumbnailScrollerPropertyDescriptions"

const propertyStructures = {
    thumbnailScrollerItems: [
        {
            "imgId": "<number>",
            "srcImageSmall": "<string>",
            "srcImageLarge": "<string>",
            "alt": "<string>",
            "figcaption": "<string>"
        }
    ],
    figcaption: {
        show: "<boolean>",
        position: "<string>"
    }
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdThumbnailScroller
                :thumbnail-scroller-items="thumbnailScrollerData"
            />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdThumbnailScroller.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>