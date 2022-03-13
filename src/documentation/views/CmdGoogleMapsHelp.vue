<script setup>
import {tabProps, tabHandlers} from "../tabs"
import CmdGoogleMaps from "../../components/CmdGoogleMaps"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdGoogleMapsHelp"
import propertyDescriptions from "../generated/CmdFormFiltersPropertyDescriptions"

import addressData from '../../assets/data/address-data'

const propertyStructures = {
    "address": {
        "streetNo": "<string>",
        "zip": "<number>",
        "city": "<string>",
        "longitude": "<string>",
        "latitude": "<string>"
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
            <ViewCodeData :isFirstComponent="true" :code="CmdCode">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdGoogleMaps :address="coordinates(addressData.address)"/>
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdGoogleMaps.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>