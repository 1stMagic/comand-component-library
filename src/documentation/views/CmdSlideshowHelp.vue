<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdSlideshow from "../../components/CmdSlideshow"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdSlideshowHelp"
import slideshow from "../../assets/data/slideshow"
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
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                <CmdSlideshow
                    :slideshow-items="slideshow"
                    :showCounter="true"
                    :autoplay="true"
                />
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdSlideshow.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>