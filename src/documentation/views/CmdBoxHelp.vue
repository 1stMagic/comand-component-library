<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdBox from "../../components/CmdBox"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdBoxHelp"
import boxUser from "../../assets/data/box-user"
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

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
           <div class="flex-container">
                <div>
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
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode" />
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="boxUser" language="json" />
                </div>
            </div>
        </template>

        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdBox.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>