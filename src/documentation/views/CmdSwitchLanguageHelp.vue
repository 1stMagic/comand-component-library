<script setup>
import {ref} from "vue"
import {tabProps, tabHandlers} from "../tabs"
import CmdSwitchLanguage from "../../components/CmdSwitchLanguage"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
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
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <ViewCodeData :isFirstComponent="true" :code="CmdCode" :data="switchLanguage">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdSwitchLanguage
                        :languages="switchLanguage"
                        @click="selectLanguage"
                    />
                </teleport>
                <dl class="v-model" v-if="currentLanguage">
                    <dt>Current language:</dt>
                    <dd>
                        <output>{{ currentLanguage.name }}</output>
                    </dd>
                </dl>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdSwitchLanguage.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>