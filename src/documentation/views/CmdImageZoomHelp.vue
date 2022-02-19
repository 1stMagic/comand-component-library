<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdImageZoom from "../../components/CmdImageZoom"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdImageZoomHelp"

const propertyDescriptions = {
    smallImageUrl: "Description for property",
    largeImageUrl: "Description for property",
}
const propertyStructures = {
    smallImageUrl: "-",
    largeImageUrl: "-"
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdImageZoom
                small-image-url="media/images/content-images/logo-business-edition-landscape.jpg"
                large-image-url="media/images/content-images/logo-business-edition-landscape-large.jpg"
            />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdImageZoom.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>