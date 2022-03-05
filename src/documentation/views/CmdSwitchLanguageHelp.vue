<script setup>
import {ref} from "vue"
import {tabProps, tabHandlers} from "../tabs"
import CmdSwitchLanguage from "../../components/CmdSwitchLanguage"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdSwitchLanguageHelp"
import switchLanguage from '../../assets/data/switch-language'
import propertyDescriptions from "../generated/CmdSwitchLanguagePropertyDescriptions"

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





function selectLanguage(event) {
    // event contains the original event and the language as an object
    event.originalEvent.preventDefault() // prevent original event
    currentLanguage.value = event.language
}
</script>

<template>
    <CmdTabs v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdSwitchLanguage
                        :languages="switchLanguage"
                        @click="selectLanguage"
                    />
                    <dl v-if="currentLanguage">
                        <dt>Current language:</dt>
                        <dd>{{ currentLanguage.name }}</dd>
                    </dl>
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="switchLanguage" language="json"/>
                </div>
            </div>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdSwitchLanguage.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>