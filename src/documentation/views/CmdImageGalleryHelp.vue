<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdImageGallery from "../../components/CmdImageGallery"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdImageGalleryHelp"
import imageGallery from '../../assets/data/image-gallery'
import propertyDescriptions from "../generated/CmdImageGalleryPropertyDescriptions"

const propertyStructures = {
    images: [
        {
            "imgId": "<number>",
            "srcImageSmall": "<string>",
            "srcImageLarge": "<string>",
            "alt": "<string>",
            "figcaption": "<string>"
        }
    ]
}
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode" :data="imageGallery">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdImageGallery
                        :images="imageGallery"
                    />
                </teleport>
            </ViewCodeData>>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdImageGallery.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>