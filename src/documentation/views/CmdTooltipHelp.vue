<script setup>

import {tabProps, tabHandlers} from "../tabs"
import {isFrameMode} from "../../utils/common"
import CmdTooltip from "../../components/CmdTooltip"
import ComponentProperties from "../components/ComponentProperties"

import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCustomHeadline from "../../components/CmdCustomHeadline"
import CmdCode from "../data/CmdTooltipHelp"

// import example-data
import propertyDescriptions from "../generated/CmdTooltipPropertyDescriptions"

const propertyStructures = {
    iconClose: {
        show: "<boolean>",
        iconClass: "<string>",
        tooltip: "<string>"
    }
}
</script>

<template>
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <CmdCustomHeadline headlineText="Tooltip opened by hover" :headlineLevel="3" preHeadlineText="Example #1" />
            <ViewCodeData :isFirstComponent="true" :code="CmdCode">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <p>
                        <a href="#" @click.prevent id="hoverme">Hover me!</a><br/>
                    </p>
                    <CmdTooltip
                        related-id="hoverme">
                        Tooltip for hover
                    </CmdTooltip>
                </teleport>
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline headlineText="Tooltip opened (and closed) by click" :headlineLevel="3" preHeadlineText="Example #2" />
            <ViewCodeData :code="CmdCode">
                <p>
                    <a href="#" @click.prevent id="clickme" title="Native tooltip">Click me!</a>
                </p>
            <CmdTooltip
                related-id="clickme"
                :toggle-visibility-by-click="true">
                Tooltip for click
            </CmdTooltip>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdTooltip.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>