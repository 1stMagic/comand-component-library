<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdSystemMessage from "../../components/CmdSystemMessage"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdSystemMessageHelp"
import propertyDescriptions from "../generated/CmdSystemMessagePropertyDescriptions"

const propertyStructures = {
    iconMessage: {
        show: "<boolean>",
        iconClass: "<string>"
    },
    iconClose: {
        show: "<boolean>",
        iconClass: "<string>",
        tooltip: "<string>"
    }
}




</script>

<template>
    <CmdTabs v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdSystemMessage
                        validationStatus="error"
                        :fullWidth="true"
                        systemMessage="This is an error message!">
                    </CmdSystemMessage>
                    <CmdSystemMessage
                        validationStatus="warning"
                        :fullWidth="true"
                        systemMessage="This is a warning message!">
                        <!-- begin slot-content -->
                        <p>This is additional text!</p>
                        <!-- end slot-content -->
                    </CmdSystemMessage>
                    <CmdSystemMessage
                        validationStatus="success"
                        :fullWidth="true"
                        systemMessage="This is a success message!">
                        <!-- begin slot-content -->
                        <ul>
                            <li>Additional information #1</li>
                            <li>Additional information #2</li>
                            <li>Additional information #3</li>
                        </ul>
                        <!-- end slot-content -->
                    </CmdSystemMessage>
                    <CmdSystemMessage
                        validationStatus="info"
                        :fullWidth="true"
                        systemMessage="This is an info message!">
                    </CmdSystemMessage>
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
            <ComponentProperties :properties="CmdSystemMessage.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>