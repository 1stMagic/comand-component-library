<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdTooltip from "../../components/CmdTooltip"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdTooltipHelp"
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
            <ViewCodeData :isFirstComponent="true" :code="CmdCode">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <p>
                        <a href="#" @click.prevent id="hoverme">Hover me!</a><br/>
                        <a href="#" @click.prevent id="clickme" title="Native tooltip">Click me!</a>
                    </p>
                    <CmdTooltip
                        related-id="hoverme">
                        Tooltip for hover
                    </CmdTooltip>
                    <CmdTooltip
                        related-id="clickme"
                        :toggle-visibility-by-click="true">
                        Tooltip for click
                    </CmdTooltip>
                </teleport>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdTooltip.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>