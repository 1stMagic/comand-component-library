<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdBreadcrumbs from "../../components/CmdBreadcrumbs"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import breadcrumbData from '../../assets/data/breadcrumbs'
import CmdCode from "../data/CmdBreadcrumbsHelp"
import propertyDescriptions from "../generated/CmdBreadcrumbsPropertyDescriptions"

const propertyStructures = {
    breadcrumbLinks: {
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
            <CmdBreadcrumbs
                :breadcrumbLinks="breadcrumbData"
                breadcrumbLabel="You are here:"
            />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdBreadcrumbs.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>