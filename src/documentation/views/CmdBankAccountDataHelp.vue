<script setup>
import CmdBankAccountData from "../../components/CmdBankAccountData"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdBoxHelp"
import bankData from "../../assets/data/bank-account-data"

const bankAccountData = bankData

</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="[{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]" :useSlot="true">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdBankAccountData :account-data="bankAccountData" :cmd-custom-headline="{ text: 'Bank Account', level: 3}" :allow-copy-by-click="true" />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre><code>{{ CmdCode }}</code></pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdBankAccountData.props" />
        </template>
    </CmdTabs>
</template>