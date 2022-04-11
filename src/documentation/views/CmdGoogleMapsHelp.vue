<script setup>
// import functions
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdGoogleMaps from "../../components/CmdGoogleMaps"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import ExampleSectionWrapper from "../components/ExampleSectionWrapper"

// import example-data
import CmdCode from "../data/CmdGoogleMapsHelp"
import propertyDescriptions from "../generated/CmdFormFiltersPropertyDescriptions"
import addressData from '../../assets/data/address-data'

const propertyStructures = {
    "address": {
        "streetNo": "<string>",
        "zip": "<number>",
        "city": "<string>",
        "longitude": "<string>",
        "latitude": "<string>",
        "location": "<string>"
    }
}

function coordinates(address) {
    return {
        longitude: address.longitude,
        latitude: address.latitude
    }
}
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <ExampleSectionWrapper componentName="CmdGoogleMaps" headlineText="Google Maps&trade;">
                <ViewCodeData :isFirstComponent="true" :code="CmdCode[0]">
                    <teleport to="#frame-component-target" :disabled="!isFrameMode()">
                        <CmdGoogleMaps
                            :address="coordinates(addressData.address)"
                        />
                    </teleport>
                </ViewCodeData>
            </ExampleSectionWrapper>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdGoogleMaps.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>