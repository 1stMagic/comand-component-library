<script setup>
// import functions
import {tabProps, tabHandlers} from "../tabs"
import {openFancyBox} from "@/components/CmdFancyBox"
import {isFrameMode} from "../../utils/common"

// import components
import CmdFancyBox from "../../components/CmdFancyBox"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import ExampleSectionWrapper from "../components/ExampleSectionWrapper"

// import example-data
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
            <h2>Component</h2>
            <ExampleSectionWrapper componentName="CmdFancyBox" headlineText="Fancybox with text">
                <ViewCodeData :isFirstComponent="true" :code="CmdCode[0]">
                    <teleport to="#frame-component-target" :disabled="!isFrameMode()">
                        <div>
                            <a href="#" @click.prevent="showFancyBox('text','Some text')">Open Fancybox with text</a><br/>
                            <CmdFancyBox
                                :allowEscapeKey="false"
                            >
                                Content
                            </CmdFancyBox>
                        </div>
                    </teleport>
                </ViewCodeData>
            </ExampleSectionWrapper>
            <hr/>
            <ExampleSectionWrapper componentName="CmdFancyBox" headlineText="Fancybox with image">
                <ViewCodeData :code="CmdCode[0]">
                    <a href="#"
                       @click.prevent="showFancyBox('image', '/media/images/content-images/logo-business-edition-landscape.jpg', 'Alternative text')"
                       title="Open Fancybox with large image">
                        Open Fancybox with image
                    </a>
                </ViewCodeData>
            </ExampleSectionWrapper>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdFancyBox.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>