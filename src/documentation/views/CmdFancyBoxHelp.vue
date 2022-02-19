<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import {openFancyBox} from "@/components/CmdFancyBox"
import CmdFancyBox from "../../components/CmdFancyBox"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdFancyBoxHelp"

const propertyDescriptions = {
    allowEscapeKey: "Description for property",
    altText: "Description for property",
    content: "Description for property",
    defaultGalleryIndex: "Description for property",
    elements: "Description for property",
    fancyBoxGallery: "Description for property",
    fancyboxOptions: "Description for property",
    show: "Description for property",
    showOverlay: "Description for property",
    url: "Description for property"
}
const propertyStructures = {
    allowEscapeKey: "-",
    altText: "-",
    content: "-",
    defaultGalleryIndex: "-",
    elements: "-",
    fancyBoxGallery: "-",
    fancyboxOptions: {
        closeIcon: {
            "iconClass": "<string>",
            "tooltip": "<string>"
        },
        printButtons: {
            "color": {
                "iconClass": "<string>",
                "tooltip": "<string>"
            },
            "grayscale": {
                "iconClass": "<string>",
                "tooltip": "<string>"
            }
        }
    },
    show: "-",
    url: "-"
}

function showFancyBox(type, content, altText) {
    if (type === 'text') {
        openFancyBox({content: content})
    } else if (type === 'image') {
        openFancyBox({url: content, altText: altText})
    }
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <a href="#" @click.prevent="showFancyBox('text','Some text')">Open FancyBox with text</a>
            <a href="#"
               @click.prevent="showFancyBox('image', '/media/images/content-images/logo-business-edition-landscape.jpg', 'Alternative text')"
               title="Open FancyBox with large image">
                Open FancyBox with image
            </a>
            <CmdFancyBox :allowEscapeKey="false">
                Content
            </CmdFancyBox>
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdFancyBox.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>