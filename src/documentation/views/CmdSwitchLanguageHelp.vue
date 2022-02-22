<script setup>
import {defineProps, ref} from "vue"
import commonProps from "../commonProps"
import CmdSwitchLanguage from "../../components/CmdSwitchLanguage"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdSwitchLanguageHelp"
import switchLanguagesData from '../../assets/data/switch-language'

const currentLanguage = ref("")

const propertyStructures = {
    languages: [
            {
            "iso2": "<string>",
            "name": "<string>",
            "tooltip": "<string>",
            "link": {
                "type": "<string>",
                "path": "<string>"
            }
        }
    ]
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]

function switchLanguage(event) {
    // event contains the original event and the language as an object
    event.originalEvent.preventDefault() // prevent original event
    currentLanguage.value = event.language
}
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdSwitchLanguage
                :languages="switchLanguagesData"
                @click="switchLanguage"
            />
            <dl v-if="currentLanguage">
                <dt>Current language:</dt>
                <dd>{{ currentLanguage.name }}</dd>
            </dl>
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdSwitchLanguage.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>