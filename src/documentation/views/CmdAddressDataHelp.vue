<script setup>
// import functions
import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"

// import components
import CmdAddressData from "../../components/CmdAddressData"
import ComponentProperties from "../components/ComponentProperties"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"

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
            <CmdCustomHeadline preHeadlineText="Example #1" headlineText="List with labels" :headlineLevel="3" />
            <ViewCodeData :isFirstComponent="true" :code="CmdCode" :data="addressData">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdAddressData
                        :addressData="addressData"
                        :linkGoogleMaps="true"
                        :cmdCustomHeadline="{ headlineText: 'Address headline', headlineLevel: 4}"
                    />
                </teleport>
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline preHeadlineText="Example #2" headlineText="List without labels" :headlineLevel="3" />
            <ViewCodeData :code="CmdCode" :data="addressData">
                <CmdAddressData
                    :addressData="addressData"
                    :showLabels="false"
                    :linkGoogleMaps="false"
                    :cmdCustomHeadline="{ headlineText: 'Address headline', headlineLevel: 4}"
                />
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdAddressData.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>