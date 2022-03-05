<script setup>
import {tabProps, tabHandlers} from "../tabs"
import CmdBankAccountData from "../../components/CmdBankAccountData"
import ComponentProperties from "../components/ComponentProperties"
import * as componentPropertiesFunctions from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdBankAccountDataHelp"
import bankAccountData from "../../assets/data/bank-account-data"
import propertyDescriptions from "../generated/CmdBankAccountDataPropertyDescriptions"

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
</script>

<template>
    <CmdTabs v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdBankAccountData
                        :account-data="bankAccountData"
                        :allow-copy-by-click="true"
                        :cmd-custom-headline="{ text: 'Bank Account', level: 4}"
                    />
                </div>
                <div>
                    <h3>Code</h3>
                    <ComponentCode :code="CmdCode"/>
                </div>
                <div>
                    <h3>Data</h3>
                    <ComponentCode :code="bankAccountData" language="json"/>
                </div>
            </div>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdBankAccountData.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
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
                <dd>
                    <pre>{{ componentPropertiesFunctions.getPropertyStructure(propertyStructures, "accountData") }}</pre>
                </dd>
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