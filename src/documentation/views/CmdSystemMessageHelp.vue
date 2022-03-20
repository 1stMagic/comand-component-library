<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdSystemMessage from "../../components/CmdSystemMessage"
import ComponentProperties from "../components/ComponentProperties"
import {isFrameMode} from "../../utils/common"
import ViewCodeData from "../components/ViewCodeData"
import CmdTabs from "../../components/CmdTabs"
import CmdCustomHeadline from "../../components/CmdCustomHeadline"
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
    <CmdTabs v-show="!isFrameMode()" v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <h2>Component</h2>
            <CmdCustomHeadline headlineText="Error message (message given by property)" :headlineLevel="3" preHeadlineText="Example #1" />
            <ViewCodeData :isFirstComponent="true" :code="CmdCode">
                <teleport to="#frameComponentTarget" :disabled="!isFrameMode()">
                    <CmdSystemMessage
                        validationStatus="error"
                        :fullWidth="true"
                        systemMessage="This is an error message!">
                    </CmdSystemMessage>
                </teleport>
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline headlineText="Warning message (message given by property and slot)" :headlineLevel="3" preHeadlineText="Example #2" />
            <ViewCodeData :code="CmdCode">
                <CmdSystemMessage
                    validationStatus="warning"
                    :fullWidth="true"
                    systemMessage="This is a warning message!">
                    <!-- begin slot-content -->
                    <p>This is additional text!</p>
                    <!-- end slot-content -->
                </CmdSystemMessage>
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline headlineText="Success message (message given by property and slot)" :headlineLevel="3" preHeadlineText="Example #3" />
            <ViewCodeData :code="CmdCode">
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
            </ViewCodeData>
            <hr />
            <CmdCustomHeadline headlineText="Info message (message given by property)" :headlineLevel="3" preHeadlineText="Example #3" />
            <ViewCodeData :code="CmdCode">
                <CmdSystemMessage
                    validationStatus="info"
                    :fullWidth="true"
                    systemMessage="This is an info message!">
                </CmdSystemMessage>
            </ViewCodeData>
        </template>
        <template v-slot:tab-content-1>
            <ComponentProperties :properties="CmdSystemMessage.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>