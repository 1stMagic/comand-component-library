<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdBreadcrumbs from "../../components/CmdBreadcrumbs"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import breadcrumbs from '../../assets/data/breadcrumbs'
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

const tabs = [{name: 'View'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
           <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdBreadcrumbs
                        :breadcrumbLinks="breadcrumbs"
                        breadcrumbLabel="You are here:"
                    />
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode" />
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="breadcrumbs" language="json" />
                </div>
            </div>
        </template>

        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdBreadcrumbs.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>