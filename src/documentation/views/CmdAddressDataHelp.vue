<script setup>
import {tabProps, tabHandlers} from "../tabs"
import CmdAddressData from "../../components/CmdAddressData"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
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
            <h2>Example #1 (list with labels)</h2>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode" :data="addressData">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdAddressData
                        :addressData="addressData"
                        :linkGoogleMaps="true"
                        :cmdCustomHeadline="{ text: 'Address headline', level: 4}"
                    />
                </teleport>
            </ViewCodeData>
            <hr />
            <h2>Example #2 (list without labels)</h2>
            <ViewCodeData :code="CmdCode" :data="addressData">
                <CmdAddressData
                    :addressData="addressData"
                    :showLabels="false"
                    :linkGoogleMaps="false"
                    :cmdCustomHeadline="{ text: 'Address headline', level: 4}"
                />
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdAddressData.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>