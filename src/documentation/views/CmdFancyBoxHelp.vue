<script setup>

import {tabProps, tabHandlers} from "../tabs"
import {openFancyBox} from "@/components/CmdFancyBox"
import CmdFancyBox from "../../components/CmdFancyBox"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
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
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <div>
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
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdFancyBox.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>