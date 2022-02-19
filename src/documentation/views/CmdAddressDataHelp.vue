<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdAddressData from "../../components/CmdAddressData"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdAddressDataHelp"
import addressData from '../../assets/data/address.json'

const propertyDescriptions = {
    addressData: "Description for property",
    headline: "Description for property",
    linkGoogleMaps: "Description for property",
    showLabels: "Description for property"
}
const propertyStructures = {
    addressData: {
        "address": {
            "streetNo": "<string>",
            "zip": "<number>",
            "city": "<string>"
        },
        "telephone": "<string>",
        "mobilephone": "<string>",
        "fax": "<string>",
        "email": "<string>"
    },
    headline: "-",
    linkGoogleMaps: "-",
    showLabels: "-"
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdAddressData :addressData="addressData" :linkGoogleMaps="true" headline="Contact" i18n="" />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdAddressData.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>