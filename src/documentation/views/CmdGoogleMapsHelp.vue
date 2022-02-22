<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdGoogleMaps from "../../components/CmdGoogleMaps"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdGoogleMapsHelp"
import addressData from '../../assets/data/address-data'

const propertyDescriptions = {
    addressData: "Description for property"

}
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

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdGoogleMaps :addressData="addressData"/>
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdGoogleMaps.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>