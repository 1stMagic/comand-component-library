<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdAddressData from "../../components/CmdAddressData"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
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

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
           <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdAddressData
                        :addressData="addressData"
                        :linkGoogleMaps="true"
                        :cmdCustomHeadline="{ text: 'Address (with labels)', level: 4}"
                    />

                    <CmdAddressData
                        :addressData="addressData"
                        :showLabels="false"
                        :linkGoogleMaps="false"
                        :cmdCustomHeadline="{ text: 'Address (without labels)', level: 4}"
                    />
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode" />
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="addressData" language="json" />
                </div>
            </div>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdAddressData.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>