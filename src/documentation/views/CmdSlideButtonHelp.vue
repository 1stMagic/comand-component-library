<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdSlideButton from "../../components/CmdSlideButton"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdSlideButtonHelp"
import propertyDescriptions from "../generated/CmdSlideButtonPropertyDescriptions"

const propertyStructures = {
    slideButtons: {
        prev: {
            iconClass: "<string>",
            tooltip: "<string>"
        },
        next: {
            iconClass: "<string>",
            tooltip: "<string>"
        }
    }
}




</script>

<template>
    <CmdTabs v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdSlideButton slideButtonType="prev"/>
                    <CmdSlideButton slideButtonType="next"/>
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                </div>
            </div>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdSlideButton.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>