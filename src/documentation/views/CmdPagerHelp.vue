<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdPager from "../../components/CmdPager"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdPagerHelp"
import pager from '../../assets/data/pager'
import propertyDescriptions from "../generated/CmdPagerPropertyDescriptions"

const propertyStructures = {
    prevButton: {
        iconClass: "<string>",
        buttonText: "<string>"
    },
    nextButton: {
        iconClass: "<string>",
        buttonText: "<string>"
    }
}




</script>

<template>
    <CmdTabs v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdPager
                        :items="pager.length"
                        :itemsPerPage="1"
                        @click="showPagePager = $event"
                    />
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="pager" language="json"/>
                </div>
            </div>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdPager.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>