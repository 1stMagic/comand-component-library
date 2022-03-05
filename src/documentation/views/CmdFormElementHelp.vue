<script setup>

import {tabProps, tabHandlers} from "../tabs"
import CmdFormElement from "../../components/CmdFormElement"
import ComponentProperties from "../components/ComponentProperties"
import ComponentCode from "../components/ComponentCode"
import CmdTabs from "../../components/CmdTabs"
import CmdCode from "../data/CmdFormElementHelp"
import selectOptions from '../../assets/data/select-options'
import propertyDescriptions from "../generated/CmdFormElementPropertyDescriptions"

const propertyStructures = {
    datalist: {
        "id": "<string>",
        "options": "<array>"
    },
    nativeButton: {
        "text": "<string>",
        "icon": {
            "show": "<boolean>",
            "iconClass": "<string>",
            "position": "<string>",
            "tooltip": "<string>"
        }
    },
    selectOptions: [
        {
            "text": "<string>",
            "value": "<string>"
        }
    ]
}


const selectedOption = []
const datalist = {
    id: "datalist-id",
        options: [
        "Option 1",
        "Option 2",
        "Option 3"
    ]
}


</script>

<template>
    <CmdTabs v-bind="tabProps" :active-tab="tabProps.activeTab" v-on="tabHandlers">
        <template v-slot:tab-content-0>
            <div class="flex-container">
                <div>
                    <h3>View</h3>
                    <CmdFormElement
                        labelText="Input (type text):"
                        element="input"
                        type="text"
                        :status="formElementStatus"
                        placeholder="Type in text"
                        tooltipText="This is a tooltip"
                        v-bind="{useCustomTooltip: false}"
                    />
                    <CmdFormElement
                        labelText="Input for selectbox:"
                        element="select"
                        required="required"
                        :status="formElementStatus"
                        v-model:value="selectedOption"
                        :selectOptions="selectOptions"
                    />
                    <CmdFormElement
                        labelText="Input for datalist:"
                        element="input"
                        type="text"
                        :status="formElementStatus"
                        placeholder="Type in option"
                        :datalist="datalist"
                        tooltipText="This is a tooltip"
                    />
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
            <ComponentProperties :properties="CmdFormElement.props" :propertyDescriptions="propertyDescriptions" :propertyStructures="propertyStructures"/>
        </template>
    </CmdTabs>
</template>