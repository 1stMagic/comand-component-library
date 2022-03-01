<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdGoogleMaps from "../../components/CmdGoogleMaps"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
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

const tabs = [{name: 'View'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
           <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdGoogleMaps :addressData="addressData"/>
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="addressData" language="json"/>
                </div>
            </div>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdGoogleMaps.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>