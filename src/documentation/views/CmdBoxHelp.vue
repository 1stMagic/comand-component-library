<script setup>
// import functions
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdBox from "../../components/CmdBox"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCustomHeadline from "../../components/CmdCustomHeadline"

// import example-data
import CmdCode from "../data/CmdBoxHelp"
import boxesProduct from "../../assets/data/box-product"
import boxesUser from "../../assets/data/box-user"
import propertyDescriptions from "../generated/CmdBoxPropertyDescriptions"

const propertyStructures = {
    product:   {
        "name": "<string>",
        "img": {
            "src": "<string>",
            "alt": "<string>"
        },
        "articleNumber": "<string>",
        "price": "<number>",
        "description": "<string>",
        "new": "<boolean>",
        "discount": "<number>"
    },
    user: {
        "name": "<string>",
        "img": {
            "src": "<string>",
            "alt": "<string>"
        },
        "profession": "<string>",
        "position": "<string>",
        "description": "<string>",
        "links": [
            {
                "href": "<string>",
                "target": "<string>",
                "iconClass": "<string>",
                "title": "<string>"
            }
        ]
    }
}

function clickedOnProduct(event) {
    console.log("event", event)
}
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <CmdCustomHeadline preHeadlineText="Example #1" headlineText="Box 'content' (content given by property)" :headlineLevel="3" />
            <ViewCodeData :isFirstComponent="true" :code="CmdCode[0]">
                <teleport to="#frame-component-target" :disabled="!isFrameMode()">
                    <CmdBox
                        :cmdCustomHeadline="{
                            headlineText: 'Headline given by property',
                            headlineLevel: 5
                        }"
                        textBody="Content given by property"
                    />
                </teleport>
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline preHeadlineText="Example #2" headlineText="Box 'content' (content given by slot)" :headlineLevel="3" />
            <ViewCodeData :code="CmdCode[1]">
                    <CmdBox :useSlot="true">
                        <template v-slot:header>
                            <h5>
                                Headline given by slot
                            </h5>
                        </template>
                        <template v-slot:body>
                            <p class="padding">
                                Content given by slot
                            </p>
                        </template>
                        <template v-slot:footer>
                            <p>
                                Footer given by slot
                            </p>
                        </template>
                    </CmdBox>
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline preHeadlineText="Example #3" headlineText="Box 'product'" :headlineLevel="3" />
            <ViewCodeData :code="CmdCode[2]" :data="boxesProduct[0]">
                <CmdBox
                    boxType="product"
                    :product="boxesProduct[0]"
                    :cmdCustomHeadline="{ headlineLevel: 5}"
                    @click="clickedOnProduct"
                />
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline preHeadlineText="Example #4" headlineText="Box 'user'" :headlineLevel="3" />
            <ViewCodeData :code="CmdCode[3]" :data="boxesUser[2]">
                <CmdBox
                    boxType="user"
                    :user="boxesUser[2]"
                    :cmdCustomHeadline="{ headlineLevel: 5}"
                />
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdBox.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>