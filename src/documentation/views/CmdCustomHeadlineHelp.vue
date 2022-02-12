<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdCustomHeadline from "../../components/CmdCustomHeadline"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdCustomHeadlineHelp"

const props = defineProps(commonProps)
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="[{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]" :useSlot="true" :activeTab="props.activeTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdCustomHeadline :headline="{text: 'Headline given by property', level: '3'}" preheadline="Pre-headline" iconClass="icon-user-profile" />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdCustomHeadline.props" />
        </template>
    </CmdTabs>
</template>