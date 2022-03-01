<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdImageZoom from "../../components/CmdImageZoom"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdImageZoomHelp"
import propertyDescriptions from "../generated/CmdImageZoomPropertyDescriptions"

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
           <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdImageZoom
                        small-image-url="media/images/content-images/logo-business-edition-landscape.jpg"
                        large-image-url="media/images/content-images/logo-business-edition-landscape-large.jpg"
                    />
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
            <ComponentProperties :properties="CmdImageZoom.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>