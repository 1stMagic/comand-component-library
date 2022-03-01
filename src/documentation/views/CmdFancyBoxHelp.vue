<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import {openFancyBox} from "@/components/CmdFancyBox"
import CmdFancyBox from "../../components/CmdFancyBox"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdFancyBoxHelp"
import propertyDescriptions from "../generated/CmdFancyBoxPropertyDescriptions"

const propertyStructures = {
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
    }
}

function showFancyBox(type, content, altText) {
    if (type === 'text') {
        openFancyBox({content: content})
    } else if (type === 'image') {
        openFancyBox({url: content, altText: altText})
    }
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
           <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <a href="#" @click.prevent="showFancyBox('text','Some text')">Open FancyBox with text</a><br/>
                    <a href="#"
                       @click.prevent="showFancyBox('image', '/media/images/content-images/logo-business-edition-landscape.jpg', 'Alternative text')"
                       title="Open FancyBox with large image">
                        Open FancyBox with image
                    </a>
                    <CmdFancyBox :allowEscapeKey="false">
                        Content
                    </CmdFancyBox>
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                </div>
            </div>
        </template>

        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdFancyBox.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>