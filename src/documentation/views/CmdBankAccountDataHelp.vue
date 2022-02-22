<script setup>
import {defineProps} from "vue"
import {useRouter} from "vue-router"
import commonProps from "../commonProps"
import CmdBankAccountData from "../../components/CmdBankAccountData"
import ComponentProperties from "../components/ComponentProperties"
import * as componentPropertiesFunctions from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdBankAccountDataHelp"
import bankData from "../../assets/data/bank-account-data"
import propertyDescriptions from "../generated/CmdBankAccountDataPropertyDescriptions"

const props = defineProps(commonProps)

const propertyStructures = {
    accountData: [
        {
            "text": "<string>",
            "value": "<string>",
            "allowCopy": "<boolean>"
        }
    ],
    cmdCustomHeadline: "Description for cmdCustomHeadline",
    iconCopy: {
        "iconClass": "<string>",
        "tooltip": "<string>"
    }
}

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]

const router = useRouter()

// set url-parameter if tab is clicked
function setActiveTab(index) {
    router.push({
       name: "CmdBankAccountData",
       params: {
           tab: tabs[index].name.toLowerCase()
       }
   })
}
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdBankAccountData
                :account-data="bankData"
                :allow-copy-by-click="true"
                :cmd-custom-headline="{ text: 'Bank Account', level: 4}"
            />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdBankAccountData.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
            <a id="accountData"></a>
            <h4>accountData</h4>
            <dl>
                <dt>Type:</dt>
                <dd>{{ componentPropertiesFunctions.getPropertyTypeName(CmdBankAccountData.props.accountData.type) }}</dd>
                <dt>Default:</dt>
                <dd v-if="componentPropertiesFunctions.getPropertyDefault(CmdBankAccountData.props.accountData.default)">
                    {{ componentPropertiesFunctions.getPropertyDefault(CmdBankAccountData.props.accountData.default) }}
                </dd>
                <dd v-else><em>(none)</em></dd>
                <dt>Required:</dt>
                <dd>
                    <span :class="componentPropertiesFunctions.getIcon(CmdBankAccountData.props.accountData.required)"
                          :title="componentPropertiesFunctions.getTooltip(CmdBankAccountData.props.accountData.required)">
                    </span>
                </dd>
                <dt>Structure:</dt>
                <dd><pre>{{ componentPropertiesFunctions.getPropertyStructure(propertyStructures, "accountData") }}</pre></dd>
                <dt>Description:</dt>
                <dd>{{ componentPropertiesFunctions.getPropertyDescription(propertyDescriptions, "accountData") }}</dd>
            </dl>
            <h5>Description for structure</h5>
            <dl>
                <dt>text:</dt>
                <dd>Description for text</dd>
                <dt>value:</dt>
                <dd>Description for value</dd>
                <dt>allowCopy:</dt>
                <dd>Description for allowCopy</dd>
            </dl>
        </template>
    </CmdTabs>
</template>