<script setup>
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdThumbnailScroller from "../../components/CmdThumbnailScroller"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdThumbnailScrollerHelp"

// import data
import thumbnailScroller from "../../assets/data/thumbnail-scroller"
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
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode" :data="thumbnailScroller">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdThumbnailScroller
                        :thumbnail-scroller-items="thumbnailScroller"
                    />
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdThumbnailScroller.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>