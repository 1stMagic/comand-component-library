<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdTooltip from "../../components/CmdTooltip"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
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

const tabs = [{name: 'View'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <div class="flex-container">
                <div>
                    <h3>View</h3>
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
            <ComponentProperties :properties="CmdTooltip.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>