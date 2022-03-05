<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdLoginForm from "../../components/CmdLoginForm"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdLoginFormHelp"
import propertyDescriptions from "../generated/CmdLoginFormPropertyDescriptions"

const propertyStructures = {
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





const loginData = ""
</script>

<template>
    <CmdTabs v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
           <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdLoginForm v-model="loginData" v-focus/>
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
            <ComponentProperties :properties="CmdLoginForm.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>