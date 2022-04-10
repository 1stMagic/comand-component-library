<script setup>
// import functions
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdAddressData from "../../components/CmdAddressData"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import ExampleSectionWrapper from "../components/ExampleSectionWrapper"

// import example-data
import CmdCode from "../data/CmdAddressDataHelp"
import addressData from '../../assets/data/address-data'
import propertyDescriptions from "../generated/CmdAddressDataPropertyDescriptions"

const propertyStructures = {
    addressData: {
        "company": "<string>",
        "address": {
            "streetNo": "<string>",
            "zip": "<number>",
            "city": "<string>"
        },
        "telephone": "<string>",
        "mobilephone": "<string>",
        "fax": "<string>",
        "email": "<string>"
    }
}
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <ExampleSectionWrapper componentName="CmdAddressData" headlineText="List with labels">
                <ViewCodeData :isFirstComponent="true" :code="CmdCode[0]" :data="addressData">
                    <teleport to="#frame-component-target" :disabled="!isFrameMode()">
                        <CmdAddressData
                            :addressData="addressData"
                            :linkGoogleMaps="true"
                            :cmdCustomHeadline="{ headlineText: 'Address', headlineLevel: 5}"
                        />
                    </teleport>
                </ViewCodeData>
            </ExampleSectionWrapper>
            <hr />
            <ExampleSectionWrapper componentName="CmdAddressData" headlineText="List without labels">
                <ViewCodeData :code="CmdCode[1]" :data="addressData">
                    <CmdAddressData
                        :addressData="addressData"
                        :showLabels="false"
                        :linkGoogleMaps="false"
                        :cmdCustomHeadline="{ headlineText: 'Address', headlineLevel: 5}"
                    />
                </ViewCodeData>
            </ExampleSectionWrapper>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdAddressData.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>