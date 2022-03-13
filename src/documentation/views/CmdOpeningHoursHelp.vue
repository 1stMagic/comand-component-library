<script setup>
import {tabProps, tabHandlers} from "../tabs"
import CmdOpeningHours from "../../components/CmdOpeningHours"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
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
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode" :data="openingHours">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdOpeningHours
                        :openingHours="openingHours"
                        :closed="true"
                        :cmdCustomHeadline="{text: 'Opening hours', level: 4}"
                        textOpenClosed="Closed right now!"
                        textHolidaysClosed="Closed on holidays"
                        textMiscInfo="Miscellaneous information"
                    />
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdOpeningHours.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>