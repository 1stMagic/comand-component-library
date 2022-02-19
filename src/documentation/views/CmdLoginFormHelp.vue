<script setup>
import {defineProps} from "vue"
import commonProps from "../commonProps"
import CmdLoginForm from "../../components/CmdLoginForm"
import ComponentProperties from "../components/ComponentProperties"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdLoginFormHelp"

const propertyDescriptions = {
    modelValue: "Description for property",
    textLegend: "Description for property",
    showLegend: "Description for property",
    cmdCustomHeadlineLoginForm: "Description for property",
    cmdCustomHeadlineSendLoginForm: "Description for property",
    cmdFormElementUsername: "Description for property",
    cmdFormElementPassword: "Description for property",
    cmdFormElementSendLogin: "Description for property",
    options: "Description for property",
    buttons: "Description for property"
}
const propertyStructures = {
    modelValue: "-",
    textLegend: "-",
    showLegend: "-",
    cmdCustomHeadlineLoginForm: {
        show: "<boolean>",
        text: "<string>",
        level: "<number>"
    },
    cmdCustomHeadlineSendLoginForm: {
        show: "<boolean>",
        text: "<string>",
        level: "<number>"
    },
    cmdFormElementUsername: {
        labelText: "<string>",
        placeholder: "<string>",
        innerIconClass: "<string>",
        name: "<string>",
        id: "<string>"
    },
    cmdFormElementPassword: {
        labelText: "<string>",
        placeholder: "<string>",
        innerIconClass: "<string>",
        name: "<string>",
        id: "<string>"
    },
    cmdFormElementSendLogin: "-",
    options: {
        forgotPassword: {
            icon: {
                show: "<boolean>",
                iconClass: "<string>",
                tooltip: "<string>",
            },
            text: "<string>",
        },
        createAccount: {
            linkType: "href | router | button",
            path: "<string>",
            icon: {
                show: "<boolean>",
                iconClass: "<string>",
                tooltip: "<string>",
            },
            text: "<string>",
        },
        backToLoginForm: {
            icon: {
                show: "<boolean>",
                iconClass: "<string>",
                tooltip: "<string>",
            },
            text: "<string>",
        }
    },
    buttons: {
        login: {
            linkType: "<string>",
            type: "<string>",
            path: "<string>",
            text: "<string>",
            primary: "<boolean>",
            icon: {
                show: "<boolean>",
                iconClass: "<string>",
                tooltip: "<string>",
            }
        },
        sendLogin: {
            linkType: "<string>",
            type: "<string>",
            path: "<string>",
            text: "<string>",
            primary: "<boolean>",
            icon: {
                show: "<boolean>",
                iconClass: "<string>",
                tooltip: "<string>",
            }
        }
    }
}

const props = defineProps(commonProps)

const tabs = [{name: 'View'}, {name: 'Usage'}, {name: 'Properties'}]

const loginData = ""
</script>

<template>
    <CmdTabs :stretchTabs="true" :tabs="tabs" :useSlot="true" :activeTab="props.activeTab" @active-tab="setActiveTab">
        <template v-slot:tab-content-0>
            <h3>View</h3>
            <CmdLoginForm v-model="loginData" v-focus />
        </template>
        <template v-slot:tab-content-1>
            <h3>Usage</h3>
            <pre>{{ CmdCode }}</pre>
        </template>
        <template v-slot:tab-content-2>
            <ComponentProperties :properties="CmdLoginForm.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures" />
        </template>
    </CmdTabs>
</template>