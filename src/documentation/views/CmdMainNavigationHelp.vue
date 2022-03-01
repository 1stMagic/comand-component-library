<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdMainNavigation from "../../components/CmdMainNavigation"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdMainNavigationHelp"
import mainNavigation from '../../assets/data/main-navigation'
import propertyDescriptions from "../generated/CmdMainNavigationPropertyDescriptions"

const propertyStructures = {
    closeOffcanvas: {
        iconClass: "<string>",
        text: "<string>",
        showText: "<boolean>"
    },
    buttonOffcanvas: {
        iconClass: "<string>",
        text: "<string>",
        showText: "<boolean>"
    },
    navigationEntries: {
        "name": "<string>",
        "href": "<string>",
        "target": "<string>",
        "subentries": [
            {
                "name": "<string>",
                "href": "<string>",
                "target": "<string>",
                "subentries": "<array>"
            }
        ]
    },
    subentriesIconClass: {
        labelText: "<string>",
        placeholder: "<string>",
        innerIconClass: "<string>",
        name: "<string>",
        id: "<string>"
    },
    subSubentriesIconClass: {
        labelText: "<string>",
        placeholder: "<string>",
        innerIconClass: "<string>",
        name: "<string>",
        id: "<string>"
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
                    <CmdMainNavigation
                        :stretchMainItems="false"
                        :persistOnMobile="false"
                        :navigationEntries="mainNavigation"
                    />
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="mainNavigation" language="json"/>
                </div>
            </div>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdMainNavigation.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>