<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdAddressData from "../../components/CmdAddressData"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdAddressDataHelp"
import addressData from '../../assets/data/address.json'

const props = defineProps(commonProps)
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="[{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]" :useSlot="true" :activeTab="props.activeTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdAddressData :addressData="addressData" :linkGoogleMaps="true" headline="Contact" i18n="" />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre><code>{{ CmdCode }}</code></pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdAddressData.props" />
        </template>
    </CmdTabs>
</template>