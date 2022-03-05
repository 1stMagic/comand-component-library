<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdBox from "../../components/CmdBox"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
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




</script>

<template>
    <CmdTabs v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
           <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <h4>Box (default)</h4>
                    <CmdBox :cmdCustomHeadline="{ headline: {text: 'Headline given by property', level: '3'}}" textBody="Content given by property" />
                    <h4>Box with slot</h4>
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
                    <h4>Box product</h4>
                    <CmdBox boxType="product" :product="boxesProduct[0]"/>
                    <h4>Box user</h4>
                    <CmdBox boxType="user" :user="boxesUser[0]"/>
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode" />
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="boxesUser[0]" language="json" />
                </div>
            </div>
        </template>

        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdBox.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>