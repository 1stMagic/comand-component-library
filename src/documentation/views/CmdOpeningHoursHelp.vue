<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdOpeningHours from "../../components/CmdOpeningHours"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdOpeningHoursHelp"
import openingHours from '../../assets/data/opening-hours'
import propertyDescriptions from "../generated/CmdOpeningHoursPropertyDescriptions"

const propertyStructures = {
    openingHours: [
        {
            "day": "<string>",
            "fromTime": "<string>",
            "tillTime": "<string>"
        }
    ]
}




</script>

<template>
    <CmdTabs v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdOpeningHours
                        :openingHours="openingHours"
                        :closed="true"
                        :cmdCustomHeadline="{headline: {text: 'Opening hours', level: '5'}}"
                        textOpenClosed="Closed right now!"
                        textHolidaysClosed="Closed on holidays"
                        textMiscInfo="Miscellaneous information"
                    />
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="openingHours" language="json"/>
                </div>
            </div>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdOpeningHours.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>