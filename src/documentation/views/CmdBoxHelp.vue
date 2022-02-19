<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdBox from "../../components/CmdBox"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdBoxHelp"

const propertyDescriptions = {
    boxType: "Description for property",
    cmdCustomHeadline: "Description for property",
    product: "Description for property",
    textBody: "Description for property",
    user: "Description for property",
    useSlot: "Description for property"
}
const propertyStructures = {
    boxType: "-",
    cmdCustomHeadline: "-",
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
    textBody: "-",
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
    },
    useSlot: "-"
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdBox :cmdCustomHeadline="{ headline: {text: 'Headline given by property', level: '3'}}" textBody="Content given by property" />
            <CmdBox :useSlot="true">
                <template v-slot:header>
                    <h3>
                        Headline given by slot
                    </h3>
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
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdBox.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>