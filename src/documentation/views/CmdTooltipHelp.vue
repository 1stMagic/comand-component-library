<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdTooltip from "../../components/CmdTooltip"
import ComponentProperties from "../components/ComponentProperties"
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

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <p>
                <a href="#" @click.prevent id="hoverme">Hover me!</a><br />
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
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdTooltip.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>