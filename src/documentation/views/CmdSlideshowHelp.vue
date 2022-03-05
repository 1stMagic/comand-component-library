<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdSlideshow from "../../components/CmdSlideshow"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
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
    <CmdTabs v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
           <div class="flex-container">
                <div>
                    <h3>View</h3>
            <CmdSlideshow
                :slideshow-items="slideshow"
                :showCounter="true"
                :autoplay="true"
/>
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="slideshow" language="json"/>
                </div>
            </div>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdSlideshow.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>